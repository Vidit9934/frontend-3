<?php
/**
 * WhatsApp purchase thank-you sender — NOT part of the Vite build.
 *
 * Deployment: upload this single file to your cPanel hosting (e.g.
 * public_html/api/send-whatsapp-thankyou.php), fill in the CONFIG section
 * below with your real values, then point BuyNowButton.jsx's fetch call
 * (see src/constants/whatsappCloud.js) at:
 *
 *   https://yourdomain.com/api/send-whatsapp-thankyou.php
 *
 * It calls Meta's official WhatsApp Cloud API to send a pre-approved
 * "purchase_thank_you" template message from Sharan's verified business
 * number to the customer. Free for the first 1,000 business-initiated
 * conversations/month. Requires one-time setup in Meta's WhatsApp Business
 * Platform: a verified sending number (Phone Number ID), a permanent
 * access token, and an approved message template with either three body
 * variables (customer name, book title, download link as plain text) or
 * two body variables plus a dynamic URL button (download link as the
 * button's variable) — whichever shape gets approved in Meta Business
 * Manager. This script currently sends it as a third body parameter, in
 * $payload below; switch that block to a 'button' component instead if
 * the approved template uses a URL button. It is deliberately plain PHP +
 * cURL — no Composer, no dependencies, so it runs on stock shared hosting.
 *
 * IMPORTANT: do not commit your real secret/keys below to a public repo.
 * Fill them in only on the copy you upload to your server.
 *
 * NOTE ON SHARED_SECRET: unlike the birthday script's secret (only ever
 * known to a private cron-job config), this endpoint is called directly
 * from the browser, so whatever value BuyNowButton.jsx sends as
 * X-Shared-Secret (src/constants/whatsappCloud.js's
 * WHATSAPP_THANKYOU_CLIENT_TOKEN) is visible to anyone inspecting the
 * site's JS bundle or network requests. It only blocks casual/accidental
 * hits on this URL, not a determined attacker — keep the two values in
 * sync, but don't treat this as real access control.
 *
 * IMPORTANT: sent-whatsapp.json (written next to this script) must not be
 * publicly downloadable — it exists only so a duplicate request for the
 * same payment never sends a second message. Add a .htaccess file in the
 * same folder containing:
 *   <Files "sent-whatsapp.json">
 *     Require all denied
 *   </Files>
 * (or, on older Apache: "Deny from all") before you upload.
 */

// ---- CONFIG (fill these in on the server, not in git) ----------------
const SHARED_SECRET = 'REPLACE_ME_BEFORE_UPLOAD';         // matches the X-Shared-Secret header
const PHONE_NUMBER_ID = 'REPLACE_ME_PHONE_NUMBER_ID';     // Meta WhatsApp Business Platform sender
const WHATSAPP_TOKEN = 'REPLACE_ME_PERMANENT_TOKEN';      // permanent System User access token
const TEMPLATE_NAME = 'purchase_thank_you';               // must match the Meta-approved template
const TEMPLATE_LANGUAGE = 'en';
// ------------------------------------------------------------------------

header('Content-Type: application/json');

$providedSecret = $_SERVER['HTTP_X_SHARED_SECRET'] ?? '';
if (!hash_equals(SHARED_SECRET, $providedSecret)) {
    http_response_code(403);
    echo json_encode(['error' => 'forbidden']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid_body']);
    exit;
}

$phone = trim($body['phone'] ?? '');
$name = trim($body['name'] ?? '');
$bookTitle = trim($body['bookTitle'] ?? '');
$paymentId = trim($body['paymentId'] ?? '');
$pdfLink = trim($body['pdfLink'] ?? '');

if (
    !preg_match('/^\+[1-9]\d{7,14}$/', $phone)
    || $name === '' || $bookTitle === '' || $paymentId === ''
    || !filter_var($pdfLink, FILTER_VALIDATE_URL)
    || !preg_match('#^https://#i', $pdfLink)
) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid_fields']);
    exit;
}

$sentLogPath = __DIR__ . '/sent-whatsapp.json';

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
        error_log('send-whatsapp-thankyou: could not open sent log for writing: ' . $path);
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

$dedupeKey = hash('sha256', $paymentId);
$sentLog = loadSentLog($sentLogPath);
if (isset($sentLog[$dedupeKey])) {
    echo json_encode(['sent' => false, 'reason' => 'already_sent']);
    exit;
}

$payload = json_encode([
    'messaging_product' => 'whatsapp',
    'to' => ltrim($phone, '+'),
    'type' => 'template',
    'template' => [
        'name' => TEMPLATE_NAME,
        'language' => ['code' => TEMPLATE_LANGUAGE],
        'components' => [
            [
                'type' => 'body',
                'parameters' => [
                    ['type' => 'text', 'text' => $name],
                    ['type' => 'text', 'text' => $bookTitle],
                    ['type' => 'text', 'text' => $pdfLink],
                ],
            ],
        ],
    ],
]);

$ch = curl_init('https://graph.facebook.com/v20.0/' . PHONE_NUMBER_ID . '/messages');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . WHATSAPP_TOKEN,
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 20);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $httpCode >= 300) {
    error_log("send-whatsapp-thankyou: Cloud API send failed for {$phone} (HTTP {$httpCode}): {$response}");
    http_response_code(502);
    echo json_encode(['sent' => false, 'error' => 'send_failed']);
    exit;
}

$sentLog[$dedupeKey] = true;
saveSentLog($sentLogPath, $sentLog);

echo json_encode(['sent' => true]);
