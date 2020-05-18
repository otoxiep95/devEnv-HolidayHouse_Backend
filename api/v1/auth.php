<?php

require_once(__DIR__ . '/../../init.php');

$httpMethod = $_SERVER['REQUEST_METHOD']; //POST, GET, DELETE,...

if ($httpMethod == "POST") {
    $api = [
        'email' => 'Email',
        'password' => 'Password',
    ];
    $post = json_decode(file_get_contents('php://input'), true);
    foreach ($api as $key => $desc) {
        if (!@val_exists($post[$key])) {
            ApiResponse::error(500, "{$desc} value is missing");
        }
        $api[$key] = sanitize($post[$key]); //sanitize values and store them inside the API
    }

    $email = $api['email'];
    $password = $api['password'];

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
