<?php
declare(strict_types=1);

require_once __DIR__ . '/../cms/lib.php';

const CONTACT_EMAIL_RE = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
const CONTACT_MAX_NAME = 200;
const CONTACT_MAX_EMAIL = 254;
const CONTACT_MAX_PHONE = 40;
const CONTACT_MAX_MESSAGE = 5000;
const CONTACT_DEFAULT_TO = 'info@ravezeto.hu';
const CONTACT_SUBJECT = 'New contact form message – Rávezető';
const CONTACT_DEFAULT_FROM_NAME = 'Rávezető weboldal';

function contact_config_value(array $config, string $key, string $envName): string {
    $fromConfig = trim((string) ($config[$key] ?? ''));
    if ($fromConfig !== '') {
        return $fromConfig;
    }
    $fromEnv = getenv($envName);
    return is_string($fromEnv) ? trim($fromEnv) : '';
}

function contact_is_same_origin(): bool {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return true;
    }
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if ($host === '') {
        return false;
    }
    $originHost = parse_url($origin, PHP_URL_HOST);
    if (!is_string($originHost) || $originHost === '') {
        return false;
    }
    $requestHost = strtolower(explode(':', $host, 2)[0]);
    return hash_equals($requestHost, strtolower($originHost));
}

/** @return array{ok: true, data: array{name: string, email: string, phone?: string, message: string}}|array{ok: false, error: string} */
function contact_validate_payload(mixed $body): array {
    if (!is_array($body)) {
        return ['ok' => false, 'error' => 'Érvénytelen kérés.'];
    }

    if (!empty($body['website'])) {
        return ['ok' => false, 'error' => 'Érvénytelen kérés.'];
    }

    $name = trim((string) ($body['name'] ?? ''));
    $email = trim((string) ($body['email'] ?? ''));
    $phone = trim((string) ($body['phone'] ?? ''));
    $message = trim((string) ($body['message'] ?? ''));

    if ($name === '') {
        return ['ok' => false, 'error' => 'Ez a mező kötelező.'];
    }
    if (strlen($name) > CONTACT_MAX_NAME) {
        return ['ok' => false, 'error' => 'A név túl hosszú.'];
    }

    if ($email === '') {
        return ['ok' => false, 'error' => 'Ez a mező kötelező.'];
    }
    if (strlen($email) > CONTACT_MAX_EMAIL || !preg_match(CONTACT_EMAIL_RE, $email)) {
        return ['ok' => false, 'error' => 'Érvénytelen e-mail cím.'];
    }

    if (strlen($phone) > CONTACT_MAX_PHONE) {
        return ['ok' => false, 'error' => 'A telefonszám túl hosszú.'];
    }

    if ($message === '') {
        return ['ok' => false, 'error' => 'Ez a mező kötelező.'];
    }
    if (strlen($message) > CONTACT_MAX_MESSAGE) {
        return ['ok' => false, 'error' => 'Az üzenet túl hosszú.'];
    }

    $data = [
        'name' => contact_sanitize_header_line($name),
        'email' => $email,
        'message' => $message,
    ];
    if ($phone !== '') {
        $data['phone'] = contact_sanitize_header_line($phone);
    }

    return ['ok' => true, 'data' => $data];
}

function contact_sanitize_header_line(string $value): string {
    return str_replace(["\r", "\n", "\0"], ' ', $value);
}

function contact_build_email_text(array $payload): string {
    $lines = [
        'Új kapcsolatfelvételi üzenet érkezett a Rávezető weboldalról.',
        '',
        'Név: ' . $payload['name'],
        'E-mail: ' . $payload['email'],
    ];
    if (!empty($payload['phone'])) {
        $lines[] = 'Telefonszám: ' . $payload['phone'];
    }
    $lines[] = '';
    $lines[] = 'Üzenet:';
    $lines[] = $payload['message'];
    return implode("\n", $lines);
}

function contact_format_address(string $name, string $email): string {
    $email = contact_sanitize_header_line($email);
    $name = contact_sanitize_header_line($name);
    if ($name === '') {
        return $email;
    }
    if (function_exists('mb_encode_mimeheader')) {
        $encoded = mb_encode_mimeheader($name, 'UTF-8', 'B', "\r\n");
        return $encoded . ' <' . $email . '>';
    }
    return $name . ' <' . $email . '>';
}

function contact_encode_subject(string $subject): string {
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n");
    }
    return $subject;
}

/** @return 'mail'|'smtp' */
function contact_resolve_transport(array $config): string {
    $explicit = strtolower(contact_config_value($config, 'contact_transport', 'CONTACT_TRANSPORT'));
    if ($explicit === 'smtp') {
        return 'smtp';
    }
    if ($explicit === 'mail') {
        return 'mail';
    }
    $host = contact_config_value($config, 'contact_smtp_host', 'CONTACT_SMTP_HOST');
    $user = contact_config_value($config, 'contact_smtp_user', 'CONTACT_SMTP_USER');
    if ($host !== '' && $user !== '') {
        return 'smtp';
    }
    return 'mail';
}

/** @return array{ok: true}|array{ok: false, status: int, error: string} */
function contact_send_email(array $config, array $payload): array {
    $fromEmail = contact_config_value($config, 'contact_from_email', 'CONTACT_FROM_EMAIL');
    $fromName = contact_config_value($config, 'contact_from_name', 'CONTACT_FROM_NAME');
    if ($fromName === '') {
        $fromName = CONTACT_DEFAULT_FROM_NAME;
    }
    $to = contact_config_value($config, 'contact_to_email', 'CONTACT_TO_EMAIL');
    if ($to === '') {
        $to = CONTACT_DEFAULT_TO;
    }

    if ($fromEmail === '' || !preg_match(CONTACT_EMAIL_RE, $fromEmail)) {
        return [
            'ok' => false,
            'status' => 503,
            'error' =>
                'Az űrlap küldés nincs konfigurálva. Állítsa be a contact_from_email értéket a szerver config.php fájlban (a @ravezeto.hu domain egy érvényes feladó cím).',
        ];
    }

    $transport = contact_resolve_transport($config);
    $subject = contact_encode_subject(CONTACT_SUBJECT);
    $body = contact_build_email_text($payload);
    $replyTo = contact_format_address($payload['name'], $payload['email']);
    $from = contact_format_address($fromName, $fromEmail);

    if ($transport === 'smtp') {
        $smtpError = contact_smtp_send($config, $to, $subject, $body, $from, $replyTo);
        if (!$smtpError['ok']) {
            return [
                'ok' => false,
                'status' => $smtpError['status'],
                'error' => $smtpError['error'],
            ];
        }
        return ['ok' => true];
    }

    if (!function_exists('mail')) {
        return [
            'ok' => false,
            'status' => 503,
            'error' =>
                'Az űrlap küldés nincs konfigurálva. A PHP mail() funkció nem érhető el — állítsa be az SMTP beállításokat a config.php fájlban.',
        ];
    }

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'From: ' . $from,
        'Reply-To: ' . $replyTo,
    ];

    $additionalParams = '';
    if (stripos(PHP_OS, 'WIN') === false) {
        $additionalParams = '-f' . escapeshellarg($fromEmail);
    }

    $sent = @mail($to, $subject, $body, implode("\r\n", $headers), $additionalParams);
    if (!$sent) {
        return [
            'ok' => false,
            'status' => 502,
            'error' => 'Hiba történt. Kérjük próbálja újra később.',
        ];
    }

    return ['ok' => true];
}

/**
 * Minimal SMTP client (AUTH LOGIN + optional TLS/SSL) — no external dependencies.
 *
 * @return array{ok: true}|array{ok: false, status: int, error: string}
 */
function contact_smtp_send(
    array $config,
    string $to,
    string $subject,
    string $body,
    string $fromHeader,
    string $replyToHeader,
): array {
    $host = contact_config_value($config, 'contact_smtp_host', 'CONTACT_SMTP_HOST');
    $user = contact_config_value($config, 'contact_smtp_user', 'CONTACT_SMTP_USER');
    $pass = contact_config_value($config, 'contact_smtp_password', 'CONTACT_SMTP_PASSWORD');
    $portRaw = contact_config_value($config, 'contact_smtp_port', 'CONTACT_SMTP_PORT');
    $port = $portRaw !== '' ? (int) $portRaw : 587;
    $encryption = strtolower(contact_config_value($config, 'contact_smtp_encryption', 'CONTACT_SMTP_ENCRYPTION'));

    if ($host === '' || $user === '' || $pass === '') {
        return [
            'ok' => false,
            'status' => 503,
            'error' =>
                'Az űrlap SMTP küldése nincs konfigurálva. Állítsa be a contact_smtp_host, contact_smtp_user és contact_smtp_password értékeket a config.php fájlban.',
        ];
    }

    if (!preg_match(CONTACT_EMAIL_RE, $to)) {
        return ['ok' => false, 'status' => 503, 'error' => 'Az űrlap küldés nincs konfigurálva.'];
    }

    $fromEmail = contact_extract_email($fromHeader);
    if ($fromEmail === null) {
        return ['ok' => false, 'status' => 503, 'error' => 'Az űrlap küldés nincs konfigurálva.'];
    }

    $remote = $encryption === 'ssl' ? 'ssl://' . $host : $host;
    $errno = 0;
    $errstr = '';
    $socket = @fsockopen($remote, $port, $errno, $errstr, 30);
    if (!is_resource($socket)) {
        return [
            'ok' => false,
            'status' => 502,
            'error' => 'Hiba történt. Kérjük próbálja újra később.',
        ];
    }

    stream_set_timeout($socket, 30);

    try {
        contact_smtp_expect($socket, [220]);

        $ehloHost = $_SERVER['SERVER_NAME'] ?? 'localhost';
        contact_smtp_cmd($socket, 'EHLO ' . $ehloHost, [250]);

        if ($encryption === 'tls') {
            contact_smtp_cmd($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('TLS failed');
            }
            contact_smtp_cmd($socket, 'EHLO ' . $ehloHost, [250]);
        }

        contact_smtp_cmd($socket, 'AUTH LOGIN', [334]);
        contact_smtp_cmd($socket, base64_encode($user), [334]);
        contact_smtp_cmd($socket, base64_encode($pass), [235]);

        contact_smtp_cmd($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        contact_smtp_cmd($socket, 'RCPT TO:<' . $to . '>', [250, 251]);
        contact_smtp_cmd($socket, 'DATA', [354]);

        $normalizedBody = str_replace(["\r\n", "\r"], "\n", $body);
        $dotStuffedBody = preg_replace('/^\./m', '..', $normalizedBody);
        $message = implode("\r\n", [
            'From: ' . $fromHeader,
            'To: ' . $to,
            'Reply-To: ' . $replyToHeader,
            'Subject: ' . $subject,
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            '',
            str_replace("\n", "\r\n", $dotStuffedBody),
            '',
        ]);
        fwrite($socket, $message . "\r\n.\r\n");
        contact_smtp_expect($socket, [250]);
        contact_smtp_cmd($socket, 'QUIT', [221]);
    } catch (Throwable) {
        fclose($socket);
        return [
            'ok' => false,
            'status' => 502,
            'error' => 'Hiba történt. Kérjük próbálja újra később.',
        ];
    }

    fclose($socket);
    return ['ok' => true];
}

function contact_extract_email(string $addressHeader): ?string {
    if (preg_match('/<([^>]+)>/', $addressHeader, $m)) {
        $email = trim($m[1]);
        return preg_match(CONTACT_EMAIL_RE, $email) ? $email : null;
    }
    $email = trim($addressHeader);
    return preg_match(CONTACT_EMAIL_RE, $email) ? $email : null;
}

/** @param resource $socket */
function contact_smtp_cmd($socket, string $command, array $okCodes): void {
    fwrite($socket, $command . "\r\n");
    contact_smtp_expect($socket, $okCodes);
}

/** @param resource $socket */
function contact_smtp_expect($socket, array $okCodes): void {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }
    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $okCodes, true)) {
        throw new RuntimeException('SMTP error ' . $code);
    }
}
