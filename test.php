<?php

$httpMethod = $_SERVER['REQUEST_METHOD']; //POST, GET, DELETE,...
$data = json_decode(file_get_contents('php://input'), true);
require_once(__DIR__ . '/init.php');


// Auth::login("susa29@mail.com", "hello");

Auth::logout();
var_dump(Auth::is_authenticated());








// $api = [
//     'first_name' => 'First name',
//     'last_name' => 'Last name',
// ];

// foreach ($api as $key => $desc) {
//     if (!@val_exists($_POST[$key])) {
//         ApiResponse::error(500, "{$desc} value is missing");
//     }
//     $api[$key] = sanitize($_POST[$key]); //sanitize values and store them inside the API
// }

// ApiResponse::success();
