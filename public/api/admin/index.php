<?php
declare(strict_types=1);

require __DIR__ . '/lib.php';

$config = cms_config();
$secret = admin_config_value($config, 'jwt_secret', 'ADMIN_JWT_SECRET');

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

$action = $_GET['action'] ?? '';
if ($action === '') {
    if (str_ends_with($uri, '/login')) {
        $action = 'login';
    } elseif (str_ends_with($uri, '/session')) {
        $action = 'session';
    } elseif (str_ends_with($uri, '/logout')) {
        $action = 'logout';
    }
}

if ($action === 'login' && $method === 'POST') {
    if ($secret === '') {
        cms_json(503, [
            'error' =>
                'Az admin bejelentkezés nincs konfigurálva. Állítsa be az ADMIN_EMAIL, ADMIN_PASSWORD és ADMIN_JWT_SECRET változókat.',
        ]);
    }

    $body = cms_read_body();
    $email = trim((string) ($body['email'] ?? ''));
    $password = (string) ($body['password'] ?? '');

    if ($email === '' || $password === '') {
        cms_json(400, ['error' => 'Email és jelszó megadása kötelező.']);
    }

    $user = admin_authenticate_user($email, $password, $config);
    if ($user === null) {
        cms_json(401, ['error' => 'Hibás email vagy jelszó.']);
    }

    $ttlMs = (int) ($config['admin_session_ttl_ms'] ?? ADMIN_SESSION_TTL_MS);
    $signed = admin_sign_token($user['id'], $user['email'], $secret, $ttlMs);
    admin_set_session_cookie($signed['accessToken'], $signed['expiresAt']);

    cms_json(200, [
        'accessToken' => $signed['accessToken'],
        'expiresAt' => $signed['expiresAt'],
        'user' => ['id' => $user['id'], 'email' => $user['email']],
    ]);
}

if ($action === 'session' && $method === 'GET') {
    if ($secret === '') {
        cms_json(503, ['error' => 'Auth not configured']);
    }

    $token = admin_bearer_token();
    if ($token === null || $token === '') {
        cms_json(401, ['error' => 'Unauthorized']);
    }

    $payload = cms_verify_jwt($token, $secret);
    if ($payload === null) {
        cms_json(401, ['error' => 'Invalid or expired session']);
    }

    cms_json(200, [
        'user' => [
            'id' => (string) ($payload['sub'] ?? ''),
            'email' => (string) ($payload['email'] ?? ''),
        ],
        'expiresAt' => (int) ($payload['exp'] ?? 0),
    ]);
}

if ($action === 'logout' && $method === 'POST') {
    admin_clear_session_cookie();
    cms_json(200, ['ok' => true]);
}

cms_json(404, ['error' => 'Not found']);
