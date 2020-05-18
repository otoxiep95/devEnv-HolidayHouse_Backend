<?php

require_once(__DIR__ . '/../../init.php');

$httpMethod = $_SERVER['REQUEST_METHOD']; //POST, GET, DELETE,...

if ($httpMethod == "POST") {
    $api = [
        'email' => 'Email',
        'password' => 'Password',
    ];

    foreach ($api as $key => $desc) {
        if (!@val_exists($_POST[$key])) {
            ApiResponse::error(500, "{$desc} value is missing");
        }
        $api[$key] = sanitize($_POST[$key]); //sanitize values and store them inside the API
    }

    $email = $_POST['email'];
    $password = $_POST['password'];

    Auth::login($email, $password);
}
if ($httpMethod == "DELETE") {
    if (!Auth::is_authenticated()) {
        ApiResponse::error([], 'Unauthenticated', 401);
    }
    Auth::logout();
    ApiResponse::success([], "successfuly logged out", 200);
}


ApiResponse::error(403, "$httpMethod is not allowed");
