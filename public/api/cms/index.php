<?php
declare(strict_types=1);

require __DIR__ . '/lib.php';

$config = cms_config();
$paths = cms_paths($config);

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Normalize when hosted under /api/cms/index.php/...
$action = $_GET['action'] ?? '';
if ($action === '') {
    if (str_ends_with($uri, '/published')) $action = 'published';
    elseif (str_ends_with($uri, '/state')) $action = 'state';
    elseif (str_ends_with($uri, '/publish')) $action = 'publish';
    elseif (str_ends_with($uri, '/upload')) $action = 'upload';
}

if ($action === 'published' && $method === 'GET') {
    if (is_file($paths['published'])) {
        header('Content-Type: application/json; charset=utf-8');
        readfile($paths['published']);
        exit;
    }
    $state = cms_read_state($paths);
    if ($state && isset($state['published'])) {
        cms_json(200, [
            'schemaVersion' => $state['published']['schemaVersion'] ?? 2,
            'generatedAt' => gmdate('c'),
            'buildRef' => $state['meta']['publishedBuildRef'] ?? 'live',
            'defaultsRevision' => $state['meta']['defaultsRevision'] ?? 0,
            'published' => $state['published'],
        ]);
    }
    cms_json(404, ['error' => 'Published CMS snapshot not found']);
}

if ($action === 'state' && $method === 'GET') {
    cms_require_auth($config);
    $state = cms_read_state($paths);
    if (!$state) cms_json(404, ['error' => 'CMS state not initialized on server']);
    cms_json(200, ['state' => $state]);
}

if ($action === 'state' && ($method === 'PUT' || $method === 'POST')) {
    cms_require_auth($config);
    $body = cms_read_body();
    if (!isset($body['state']) || !is_array($body['state'])) {
        cms_json(400, ['error' => 'Missing state object']);
    }
    cms_write_state($paths, $body['state']);
    cms_json(200, ['ok' => true]);
}

if ($action === 'publish' && $method === 'POST') {
    cms_require_auth($config);
    $body = cms_read_body();
    if (!isset($body['state']) || !is_array($body['state'])) {
        cms_json(400, ['error' => 'Missing state object']);
    }
    $published = cms_write_state($paths, $body['state']);
    cms_json(200, ['ok' => true, 'published' => $published]);
}

if ($action === 'upload' && $method === 'POST') {
    cms_require_auth($config);
    if (!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
        cms_json(400, ['error' => 'Missing file upload']);
    }
    $file = $_FILES['file'];
    $max = (int)($config['max_upload_bytes'] ?? 2097152);
    if ($file['size'] > $max) {
        cms_json(400, ['error' => 'File too large']);
    }
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']) ?: '';
    $allowed = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
        'image/svg+xml' => 'svg',
    ];
    if (!isset($allowed[$mime])) {
        cms_json(400, ['error' => 'Unsupported image type']);
    }
    if (!is_dir($paths['uploads']) && !mkdir($paths['uploads'], 0755, true)) {
        cms_json(500, ['error' => 'Cannot create uploads directory']);
    }
    $name = 'cms-' . gmdate('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . $allowed[$mime];
    $dest = $paths['uploads'] . '/' . $name;
    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        cms_json(500, ['error' => 'Upload failed']);
    }
    cms_json(200, ['url' => '/assets/uploads/cms/' . $name]);
}

cms_json(404, ['error' => 'Unknown CMS API route']);
