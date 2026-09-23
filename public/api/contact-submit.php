<?php
declare(strict_types=1);

/**
 * Apache entry for POST /api/contact — routed here by root .htaccess
 * so the request never hits the api/contact/ directory (POST-to-dir → 405).
 */
require __DIR__ . '/contact/index.php';
