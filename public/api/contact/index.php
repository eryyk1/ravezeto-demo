<?php
declare(strict_types=1);

require __DIR__ . '/lib.php';

$config = cms_config();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method !== 'POST') {
    cms_json(405, ['error' => 'Method not allowed']);
}

if (!contact_is_same_origin()) {
    cms_json(403, ['error' => 'Forbidden']);
}

$body = cms_read_body();
$validation = contact_validate_payload($body);
if (!$validation['ok']) {
    cms_json(400, ['error' => $validation['error']]);
}

$result = contact_send_email($config, $validation['data']);
if (!$result['ok']) {
    cms_json($result['status'], ['error' => $result['error']]);
}

cms_json(200, ['ok' => true]);