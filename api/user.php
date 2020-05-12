<?php

require_once(__DIR__ . '/init.php');

$httpMethod = $_SERVER['REQUEST_METHOD']; //POST, GET, DELETE,...

if ($httpMethod == 'GET') {
    if (!Auth::is_authenticated()) {
        ApiResponse::error(401, 'Please log in');
    }
}


if ($httpMethod == 'POST') {
    $api = [
        'first_name' => 'First name',
        'last_name' => 'Last name',
        'email' => 'Email',
        'password' => 'Password',
        'phone' => 'Phone'
    ];
    foreach ($api as $key => $desc) {
        if (!@val_exists($_POST[$key])) {
            ApiResponse::error(500, "{$desc} value is missing");
        }
        $api[$key] = sanitize($_POST[$key]); //sanitize values and store them inside the API
    }
    ApiResponse::success();
}


if ($httpMethod == 'PATCH') {
    if (!Auth::is_authenticated()) {
        ApiResponse::error(401, 'Please log in');
    }
};

if ($httpMethod == 'DELETE') {
    if (!Auth::is_authenticated()) {
        ApiResponse::error(401, 'Please log in');
    }
};

ApiResponse::error(403, "$httpMethod is not allowed");
