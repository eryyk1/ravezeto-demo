<?php
/**
 * Copy to config.php on the server (outside version control).
 * CMS data is stored in JSON files — no MySQL required for the default setup.
 */
return [
    // Absolute path to project root (folder that contains public/ or dist/ and data/)
    'root_path' => dirname(__DIR__, 3),

    // Must match ADMIN_JWT_SECRET on the server / Worker (shared by CMS + admin auth)
    'jwt_secret' => getenv('ADMIN_JWT_SECRET') ?: '',

    // Admin login (server-side only — set in config.php or host env vars)
    'admin_email' => getenv('ADMIN_EMAIL') ?: '',
    'admin_password' => getenv('ADMIN_PASSWORD') ?: '',
    'client_admin_email' => getenv('CLIENT_ADMIN_EMAIL') ?: '',
    'client_admin_password' => getenv('CLIENT_ADMIN_PASSWORD') ?: '',
    'admin_session_ttl_ms' => 3600000,

    // Optional: restrict uploads (bytes)
    'max_upload_bytes' => 2 * 1024 * 1024,

    // Contact form (POST /api/contact) — PHP mail() or SMTP (server-side only)
    // Required: a valid @ravezeto.hu sender the host accepts (often noreply@ or webform@)
    'contact_from_email' => getenv('CONTACT_FROM_EMAIL') ?: '',
    'contact_from_name' => getenv('CONTACT_FROM_NAME') ?: 'Rávezető weboldal',
    // Inbound mailbox (not controlled by the frontend); defaults to info@ravezeto.hu if empty
    'contact_to_email' => getenv('CONTACT_TO_EMAIL') ?: '',
    // Transport: '' (auto: SMTP if host+user set, else mail()), 'mail', or 'smtp'
    'contact_transport' => getenv('CONTACT_TRANSPORT') ?: '',
    // SMTP (optional — use when mail() is disabled or unreliable on the host)
    'contact_smtp_host' => getenv('CONTACT_SMTP_HOST') ?: '',
    'contact_smtp_port' => getenv('CONTACT_SMTP_PORT') ?: '587',
    'contact_smtp_encryption' => getenv('CONTACT_SMTP_ENCRYPTION') ?: 'tls',
    'contact_smtp_user' => getenv('CONTACT_SMTP_USER') ?: '',
    'contact_smtp_password' => getenv('CONTACT_SMTP_PASSWORD') ?: '',
];
