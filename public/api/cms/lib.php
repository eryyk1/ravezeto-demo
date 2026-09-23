<?php

function cms_config(): array {
    static $config = null;
    if ($config !== null) return $config;
    $path = __DIR__ . '/config.php';
    if (!is_file($path)) {
        http_response_code(503);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'CMS API not configured. Copy config.example.php to config.php on the server.']);
        exit;
    }
    $config = require $path;
    return $config;
}

function cms_paths(array $config): array {
    $root = rtrim($config['root_path'], '/\\');
    return [
        'state' => $root . '/data/cms/state.json',
        'published' => $root . '/public/cms/published.json',
        'uploads' => $root . '/public/assets/uploads/cms',
    ];
}

function cms_json(int $status, array $payload): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function cms_read_body(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') return [];
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function cms_b64url_decode(string $value): string {
    $padded = $value . str_repeat('=', (4 - strlen($value) % 4) % 4);
    $padded = strtr($padded, '-_', '+/');
    return base64_decode($padded, true) ?: '';
}

function cms_verify_jwt(string $token, string $secret): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$header, $body, $sig] = $parts;
    $expected = rtrim(strtr(base64_encode(hash_hmac('sha256', "$header.$body", $secret, true)), '+/', '-_'), '=');
    if (!hash_equals($expected, $sig)) return null;
    $payload = json_decode(cms_b64url_decode($body), true);
    if (!is_array($payload)) return null;
    if (empty($payload['exp']) || (int)$payload['exp'] < (int)(microtime(true) * 1000)) return null;
    return $payload;
}

function cms_require_auth(array $config): array {
    $secret = trim((string)($config['jwt_secret'] ?? ''));
    if ($secret === '') {
        cms_json(503, ['error' => 'ADMIN_JWT_SECRET is not configured for PHP CMS API.']);
    }
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!str_starts_with($header, 'Bearer ')) {
        cms_json(401, ['error' => 'Unauthorized']);
    }
    $token = substr($header, 7);
    $payload = cms_verify_jwt($token, $secret);
    if (!$payload) {
        cms_json(401, ['error' => 'Invalid or expired session']);
    }
    return $payload;
}

function cms_read_state(array $paths): ?array {
    if (!is_file($paths['state'])) return null;
    $raw = file_get_contents($paths['state']);
    if ($raw === false) return null;
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : null;
}

function cms_write_state(array $paths, array $state): array {
    $dir = dirname($paths['state']);
    if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
        cms_json(500, ['error' => 'Cannot create CMS data directory. Check folder permissions.']);
    }
    $encoded = json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($encoded === false || file_put_contents($paths['state'], $encoded . "\n") === false) {
        cms_json(500, ['error' => 'Failed to write CMS state file.']);
    }

    $publishedDir = dirname($paths['published']);
    if (!is_dir($publishedDir) && !mkdir($publishedDir, 0755, true)) {
        cms_json(500, ['error' => 'Cannot create public/cms directory.']);
    }

    $payload = [
        'schemaVersion' => $state['published']['schemaVersion'] ?? 2,
        'generatedAt' => gmdate('c'),
        'buildRef' => $state['meta']['publishedBuildRef'] ?? 'live',
        'defaultsRevision' => $state['meta']['defaultsRevision'] ?? 0,
        'published' => $state['published'],
    ];
    $pub = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($pub === false || file_put_contents($paths['published'], $pub . "\n") === false) {
        cms_json(500, ['error' => 'Failed to write published.json.']);
    }
    return $payload;
}
