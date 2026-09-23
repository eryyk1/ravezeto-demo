<?php
declare(strict_types=1);

/**
 * TEMPORARY diagnostic — remove after contact 405 investigation.
 * GET or POST → JSON with method, URI, and whether PHP ran.
 */
header('Content-Type: application/json; charset=utf-8');
header('X-Ravezeto-Contact-Test: 1');

$method = $_SERVER['REQUEST_METHOD'] ?? '(unset)';
$uri = $_SERVER['REQUEST_URI'] ?? '(unset)';
$script = $_SERVER['SCRIPT_NAME'] ?? '(unset)';

http_response_code(200);
echo json_encode([
    'phpExecuting' => true,
    'endpoint' => 'contact-test.php',
    'requestMethod' => $method,
    'requestUri' => $uri,
    'scriptName' => $script,
    'https' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https'),
    'contentType' => $_SERVER['CONTENT_TYPE'] ?? null,
    'origin' => $_SERVER['HTTP_ORIGIN'] ?? null,
], JSON_UNESCAPED_UNICODE);
