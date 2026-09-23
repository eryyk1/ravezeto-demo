<?php
declare(strict_types=1);

require_once __DIR__ . '/../cms/lib.php';

/** Must match api/lib/sessionConfig.js and vite.adminAuthPlugin.ts */
const ADMIN_SESSION_TTL_MS = 3600000;

function admin_b64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function admin_sign_token(string $sub, string $email, string $secret, int $ttlMs = ADMIN_SESSION_TTL_MS): array {
    $header = admin_b64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $expiresAt = (int) (microtime(true) * 1000) + $ttlMs;
    $bodyPayload = [
        'sub' => $sub,
        'email' => $email,
        'exp' => $expiresAt,
    ];
    $body = admin_b64url_encode(json_encode($bodyPayload, JSON_UNESCAPED_UNICODE));
    $signature = admin_b64url_encode(hash_hmac('sha256', "$header.$body", $secret, true));
    return [
        'accessToken' => "$header.$body.$signature",
        'expiresAt' => $expiresAt,
    ];
}

function admin_config_value(array $config, string $key, string $envName): string {
    $fromConfig = trim((string) ($config[$key] ?? ''));
    if ($fromConfig !== '') {
        return $fromConfig;
    }
    $fromEnv = getenv($envName);
    return is_string($fromEnv) ? trim($fromEnv) : '';
}

function admin_authenticate_user(string $email, string $password, array $config): ?array {
    $normalizedEmail = trim($email);
    $normalizedPassword = $password;

    $primaryEmail = admin_config_value($config, 'admin_email', 'ADMIN_EMAIL');
    $primaryPassword = admin_config_value($config, 'admin_password', 'ADMIN_PASSWORD');
    if (
        $primaryEmail !== '' &&
        $primaryPassword !== '' &&
        hash_equals($primaryEmail, $normalizedEmail) &&
        hash_equals($primaryPassword, $normalizedPassword)
    ) {
        return ['id' => 'admin', 'email' => $primaryEmail];
    }

    $clientEmail = admin_config_value($config, 'client_admin_email', 'CLIENT_ADMIN_EMAIL');
    $clientPassword = admin_config_value($config, 'client_admin_password', 'CLIENT_ADMIN_PASSWORD');
    if (
        $clientEmail !== '' &&
        $clientPassword !== '' &&
        hash_equals($clientEmail, $normalizedEmail) &&
        hash_equals($clientPassword, $normalizedPassword)
    ) {
        return ['id' => 'client-admin', 'email' => $clientEmail];
    }

    return null;
}

function admin_is_configured(array $config): bool {
    $secret = admin_config_value($config, 'jwt_secret', 'ADMIN_JWT_SECRET');
    if ($secret === '') {
        return false;
    }
    $email = admin_config_value($config, 'admin_email', 'ADMIN_EMAIL');
    $password = admin_config_value($config, 'admin_password', 'ADMIN_PASSWORD');
    return $email !== '' && $password !== '';
}

function admin_bearer_token(): ?string {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (str_starts_with($header, 'Bearer ')) {
        return substr($header, 7);
    }
    return null;
}

function admin_set_session_cookie(string $token, int $expiresAtMs): void {
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
    setcookie('ravezeto_admin_jwt', $token, [
        'expires' => (int) floor($expiresAtMs / 1000),
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function admin_clear_session_cookie(): void {
    setcookie('ravezeto_admin_jwt', '', [
        'expires' => time() - 3600,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}
