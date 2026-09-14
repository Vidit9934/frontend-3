<?php
/**
 * Birthday + 7-day post-purchase follow-up email cron script — NOT part of
 * the Vite build.
 *
 * Deployment: upload this single file to your cPanel hosting (e.g.
 * public_html/api/send-birthday-emails.php), fill in the CONFIG section
 * below with your real values, then point a free https://cron-job.org job
 * at:
 *
 *   https://yourdomain.com/api/send-birthday-emails.php?key=YOUR_SECRET
 *
 * once a day (e.g. every morning). Each run does two independent checks
 * against the same Firestore `bookOrders` collection (public read, same as
 * the rest of this app), fetched once and reused for both:
 *   1. Birthday emails — today's month/day matches an order's `dob`.
 *   2. Purchase follow-up emails — an order's `createdAt` is exactly 7
 *      calendar days before today (fires once per order, never again).
 * Both send via EmailJS's REST API. It is deliberately plain PHP + cURL —
 * no Composer, no dependencies, so it runs on stock shared hosting.
 *
 * IMPORTANT: do not commit your real secret/keys below to a public repo.
 * Fill them in only on the copy you upload to your server.
 *
 * IMPORTANT: sent-birthdays.json and sent-followups.json (written next to
 * this script) must not be publicly downloadable — they exist only so the
 * script itself never sends a duplicate email for the same
 * person/condition. Add a .htaccess file in the same folder containing:
 *   <Files "sent-birthdays.json">
 *     Require all denied
 *   </Files>
 *   <Files "sent-followups.json">
 *     Require all denied
 *   </Files>
 * (or, on older Apache: "Deny from all") before you upload.
 */

// ---- CONFIG (fill these in on the server, not in git) ----------------
const SHARED_SECRET = 'REPLACE_ME_BEFORE_UPLOAD';           // matches the ?key= query param
const FIREBASE_PROJECT_ID = 'sharan-24586';
const EMAILJS_SERVICE_ID = 'REPLACE_ME_SERVICE_ID';
const EMAILJS_BIRTHDAY_TEMPLATE_ID = 'REPLACE_ME_BIRTHDAY_TEMPLATE_ID';
const EMAILJS_FOLLOWUP_TEMPLATE_ID = 'REPLACE_ME_FOLLOWUP_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'REPLACE_ME_PUBLIC_KEY';
const EMAILJS_PRIVATE_KEY = 'REPLACE_ME_PRIVATE_KEY';        // EmailJS dashboard → Account → Security
const TIMEZONE = 'Asia/Singapore';
const BOOKING_URL = 'https://www.my-lifechoices.com/';        // keep in sync with src/constants/emailjs.js's BOOKING_URL

// Short "year ahead" numerology reading per birth month, keyed 'mm'. Sent as
// the year_ahead_reading template param — fill these in with Sharan's actual
// copy before relying on this in production; they're TODO placeholders.
const BIRTH_MONTH_READINGS = [
    '01' => 'TODO: paste the January birth-month reading here.',
    '02' => 'TODO: paste the February birth-month reading here.',
    '03' => 'TODO: paste the March birth-month reading here.',
    '04' => 'TODO: paste the April birth-month reading here.',
    '05' => 'TODO: paste the May birth-month reading here.',
    '06' => 'TODO: paste the June birth-month reading here.',
    '07' => 'TODO: paste the July birth-month reading here.',
    '08' => 'TODO: paste the August birth-month reading here.',
    '09' => 'TODO: paste the September birth-month reading here.',
    '10' => 'TODO: paste the October birth-month reading here.',
    '11' => 'TODO: paste the November birth-month reading here.',
    '12' => 'TODO: paste the December birth-month reading here.',
];
// ------------------------------------------------------------------------

date_default_timezone_set(TIMEZONE);
header('Content-Type: application/json');

$providedKey = $_GET['key'] ?? '';
if (!hash_equals(SHARED_SECRET, $providedKey)) {
    http_response_code(403);
    echo json_encode(['error' => 'forbidden']);
    exit;
}

$sentLogPath = __DIR__ . '/sent-birthdays.json';
$sentFollowupsLogPath = __DIR__ . '/sent-followups.json';

function loadSentLog(string $path): array
{
    if (!file_exists($path)) {
        return [];
    }
    $contents = file_get_contents($path);
    $data = json_decode($contents, true);
    return is_array($data) ? $data : [];
}

function saveSentLog(string $path, array $log): void
{
    $fp = fopen($path, 'c+');
    if ($fp === false) {
        error_log('send-birthday-emails: could not open sent log for writing: ' . $path);
        return;
    }
    if (flock($fp, LOCK_EX)) {
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($log));
        fflush($fp);
        flock($fp, LOCK_UN);
    }
    fclose($fp);
}

function fetchBookOrders(string $projectId): array
{
    $url = "https://firestore.googleapis.com/v1/projects/{$projectId}/databases/(default)/documents/bookOrders?pageSize=300";
    $docs = [];
    $nextPageToken = null;

    do {
        $requestUrl = $nextPageToken ? $url . '&pageToken=' . urlencode($nextPageToken) : $url;
        $ch = curl_init($requestUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($response === false || $httpCode >= 400) {
            error_log("send-birthday-emails: Firestore fetch failed (HTTP {$httpCode})");
            break;
        }

        $body = json_decode($response, true);
        foreach ($body['documents'] ?? [] as $doc) {
            $fields = $doc['fields'] ?? [];
            $docs[] = [
                'email' => $fields['email']['stringValue'] ?? null,
                'name' => $fields['name']['stringValue'] ?? null,
                'dob' => $fields['dob']['stringValue'] ?? null,
                'createdAt' => $fields['createdAt']['stringValue'] ?? null,
                'paymentId' => $fields['paymentId']['stringValue'] ?? null,
                'bookTitle' => $fields['bookTitle']['stringValue'] ?? null,
            ];
        }
        $nextPageToken = $body['nextPageToken'] ?? null;
    } while ($nextPageToken);

    return $docs;
}

function sendBirthdayEmail(string $toEmail, string $toName, string $yearAheadReading): bool
{
    $payload = json_encode([
        'service_id' => EMAILJS_SERVICE_ID,
        'template_id' => EMAILJS_BIRTHDAY_TEMPLATE_ID,
        'user_id' => EMAILJS_PUBLIC_KEY,
        'accessToken' => EMAILJS_PRIVATE_KEY,
        'template_params' => [
            'to_email' => $toEmail,
            'to_name' => $toName,
            'year_ahead_reading' => $yearAheadReading,
            'booking_link' => BOOKING_URL,
        ],
    ]);

    $ch = curl_init('https://api.emailjs.com/api/v1.0/email/send');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $httpCode >= 300) {
        error_log("send-birthday-emails: EmailJS send failed for {$toEmail} (HTTP {$httpCode}): {$response}");
        return false;
    }
    return true;
}

function sendFollowupEmail(string $toEmail, string $toName, string $bookTitle): bool
{
    $payload = json_encode([
        'service_id' => EMAILJS_SERVICE_ID,
        'template_id' => EMAILJS_FOLLOWUP_TEMPLATE_ID,
        'user_id' => EMAILJS_PUBLIC_KEY,
        'accessToken' => EMAILJS_PRIVATE_KEY,
        'template_params' => [
            'to_email' => $toEmail,
            'to_name' => $toName,
            'book_title' => $bookTitle,
            'booking_link' => BOOKING_URL,
        ],
    ]);

    $ch = curl_init('https://api.emailjs.com/api/v1.0/email/send');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $httpCode >= 300) {
        error_log("send-followup-email: EmailJS send failed for {$toEmail} (HTTP {$httpCode}): {$response}");
        return false;
    }
    return true;
}

$today = date('m-d');
$currentYear = date('Y');
$sevenDaysAgo = date('Y-m-d', strtotime('-7 days'));
$sentBirthdaysLog = loadSentLog($sentLogPath);
$sentFollowupsLog = loadSentLog($sentFollowupsLogPath);
$orders = fetchBookOrders(FIREBASE_PROJECT_ID);

$seenBirthdays = [];
$birthdaysSent = 0;
$seenFollowups = [];
$followupsSent = 0;
$errors = 0;

// Birthday template is skipped until a real template ID is configured
// (EmailJS's free tier caps templates at 2, currently used by purchase +
// follow-up) — avoids daily error_log noise from a guaranteed-invalid send.
$birthdayEnabled = EMAILJS_BIRTHDAY_TEMPLATE_ID !== 'REPLACE_ME_BIRTHDAY_TEMPLATE_ID';

foreach ($birthdayEnabled ? $orders : [] as $order) {
    if (empty($order['email']) || empty($order['dob'])) {
        continue;
    }
    $dobTimestamp = strtotime($order['dob']);
    if ($dobTimestamp === false || date('m-d', $dobTimestamp) !== $today) {
        continue;
    }

    $email = strtolower(trim($order['email']));
    $dedupeKey = hash('sha256', "{$email}_{$currentYear}");
    if (isset($seenBirthdays[$dedupeKey]) || isset($sentBirthdaysLog[$dedupeKey])) {
        continue;
    }
    $seenBirthdays[$dedupeKey] = true;

    $birthMonth = date('m', $dobTimestamp);
    $yearAheadReading = BIRTH_MONTH_READINGS[$birthMonth] ?? '';
    $sent = sendBirthdayEmail($order['email'], $order['name'] ?? 'there', $yearAheadReading);
    if ($sent) {
        $sentBirthdaysLog[$dedupeKey] = true;
        $birthdaysSent++;
    } else {
        $errors++;
    }
}

foreach ($orders as $order) {
    if (empty($order['email']) || empty($order['createdAt']) || empty($order['paymentId'])) {
        continue;
    }
    $createdTimestamp = strtotime($order['createdAt']);
    if ($createdTimestamp === false || date('Y-m-d', $createdTimestamp) !== $sevenDaysAgo) {
        continue;
    }

    $dedupeKey = hash('sha256', $order['paymentId']);
    if (isset($seenFollowups[$dedupeKey]) || isset($sentFollowupsLog[$dedupeKey])) {
        continue;
    }
    $seenFollowups[$dedupeKey] = true;

    $sent = sendFollowupEmail($order['email'], $order['name'] ?? 'there', $order['bookTitle'] ?? 'your book');
    if ($sent) {
        $sentFollowupsLog[$dedupeKey] = true;
        $followupsSent++;
    } else {
        $errors++;
    }
}

saveSentLog($sentLogPath, $sentBirthdaysLog);
saveSentLog($sentFollowupsLogPath, $sentFollowupsLog);

echo json_encode([
    'checked' => count($orders),
    'birthdaysSent' => $birthdaysSent,
    'followupsSent' => $followupsSent,
    'errors' => $errors,
]);
