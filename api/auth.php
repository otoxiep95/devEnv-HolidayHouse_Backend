<?php

require_once(__DIR__ . '/init.php');

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


ApiResponse::error(403, "$httpMethod is not allowed");
