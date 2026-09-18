<?php
/**
 * Copy to config.php on the server (outside version control).
 * CMS data is stored in JSON files — no MySQL required for the default setup.
 */
return [
    // Absolute path to project root (folder that contains public/ or dist/ and data/)
    'root_path' => dirname(__DIR__, 3),

    // Must match ADMIN_JWT_SECRET on the server / Worker
    'jwt_secret' => getenv('ADMIN_JWT_SECRET') ?: '',

    // Optional: restrict uploads (bytes)
    'max_upload_bytes' => 2 * 1024 * 1024,
];
