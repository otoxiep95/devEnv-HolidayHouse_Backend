<?php

// Initial headers
header('Content-type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');

// REQUIRED! -> Send initial ok HTTP header for options.
if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    return http_response_code(200);
}

// Require utils
require_once(__DIR__ . '/utils/functions.php');
require_once(__DIR__ . '/utils/Database.php');
require_once(__DIR__ . '/utils/ApiResponse.php');
require_once(__DIR__ . '/utils/Auth.php');
