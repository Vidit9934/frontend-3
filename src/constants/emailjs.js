// EmailJS (https://emailjs.com) — free-tier client-side email sending.
// These are the public-safe values only; the private key used by the
// birthday cron script lives server-side in server/send-birthday-emails.php.
export const EMAILJS_SERVICE_ID = 'REPLACE_ME_SERVICE_ID'
export const EMAILJS_PUBLIC_KEY = 'REPLACE_ME_PUBLIC_KEY'
export const EMAILJS_PURCHASE_TEMPLATE_ID = 'REPLACE_ME_PURCHASE_TEMPLATE_ID'

// Booking has no dedicated route — BookSession.jsx renders a floating FAB on
// every page — so the CTA in emails just links to the site itself.
export const BOOKING_URL = 'https://www.my-lifechoices.com/'
