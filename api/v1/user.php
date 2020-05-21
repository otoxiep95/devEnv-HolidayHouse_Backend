<?php

require_once(__DIR__ . '/../../init.php');

$httpMethod = $_SERVER['REQUEST_METHOD']; //POST, GET, DELETE,...

if ($httpMethod == 'GET') {
    if (!Auth::is_authenticated()) {
        ApiResponse::error([], 'Unauthenticated', 403);
    }
    $userId = Auth::getUserId();
    //$userId = 4; //testing purposes
    $conn = Database::connect();
    $stmt = $conn->prepare("SELECT first_name, last_name, email, phone FROM user WHERE user_id=:userIdVal");
    $stmtEx = $stmt->execute([
        'userIdVal' => $userId
    ]);
    if ($stmtEx) {
        $data = $stmt->fetch();
        return ApiResponse::success($data);
    }
    return ApiResponse::error([], "Failed to get user", 500); //dont know code
}


if ($httpMethod == 'POST') {
    $post = json_decode(file_get_contents('php://input'), true);
    $api = [
        'first_name' => 'First name',
        'last_name' => 'Last name',
        'email' => 'Email',
        'password' => 'Password',
        'confirm_password' => 'Password Confirmation',
        'phone' => 'Phone'
    ];
    foreach ($api as $key => $desc) {
        if (!@val_exists($post[$key])) {
            ApiResponse::error([], "{$desc} value is missing", 500);
        }
        $api[$key] = sanitize($post[$key]); //sanitize values and store them inside the API
    }
    if ($api['password'] !== $api['confirm_password']) {
        ApiResponse::error([], "Passwords do not match", 404);
    }
    //check if email already exists
    $conn = Database::connect();
    $stmt = $conn->prepare("SELECT email FROM user WHERE email = :emailVal");
    $query = $stmt->execute([
        'emailVal' => $api['email']
    ]);
    if ($query && $stmt->rowCount()) {
        return ApiResponse::error([], "Email already exists", 404); //dont know the code
    }

    $passwordHash = password_hash($api['password'], PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO user
    (first_name, last_name, email, password, phone)
    VALUES
    (:firstNameVal, :lastNameVal, :emailVal, :passwordVal, :phoneVal)");
    $stmtEx = $stmt->execute([
        'firstNameVal' => $api['first_name'],
        'lastNameVal' => $api['last_name'],
        'emailVal' => $api['email'],
        'passwordVal' => $passwordHash,
        'phoneVal' => $api['phone'],
    ]);
    if ($stmtEx) {

        return ApiResponse::success([$api], "created user", 200);
    }
    return ApiResponse::error([], "Create user failed", 500); //dont know code
}


if ($httpMethod == 'PATCH') {
    if (!Auth::is_authenticated()) {
        ApiResponse::error(403, 'Please log in');
    }

    $patch = json_decode(file_get_contents('php://input'), true);
    $userId = Auth::getUserId();
    //$userId = 5; //testing purposes
    $api = [
        'first_name' => 'First name',
        'last_name' => 'Last name',
        'email' => 'Email',
        'phone' => 'Phone'
    ];
    foreach ($api as $key => $desc) {
        if (!@val_exists($patch[$key])) {
            ApiResponse::error([], "{$desc} value is missing", 500);
        }
        $api[$key] = sanitize($patch[$key]); //sanitize values and store them inside the API
    }

    $conn = Database::connect();
    $stmt = $conn->prepare(
        "UPDATE user 
            SET
            first_name= :firstNameVal,
            last_name=:lastNameVal,
            email=:emailVal,
            phone=:phoneVal
            WHERE
            user_id = :userIdVal"
    );
    $stmtEx = $stmt->execute([
        'firstNameVal' => $api['first_name'],
        'lastNameVal' => $api['last_name'],
        'emailVal' => $api['email'],
        'phoneVal' => $api['phone'],
        'userIdVal' => $userId
    ]);
    if ($stmtEx) {
        return ApiResponse::success($api, "User updated", 200);
    }
}

if ($httpMethod == 'DELETE') {
    if (!Auth::is_authenticated()) {
        ApiResponse::error([], 'Please log in', 403);
    }

    $userId = Auth::getUserId();
    //$userId = 5; //testing purposes

    $conn = Database::connect();
    $stmt = $conn->prepare("DELETE FROM user WHERE user_id = :userIdVal");
    $stmtEx = $stmt->execute([
        'userIdVal' => $userId
    ]);
    if ($stmtEx) {
        Auth::logout();
        return ApiResponse::success([], "User deleted", 200);
    } else {
        return ApiResponse::error([], "something went wrong", 500);
    }
};

ApiResponse::error([], "$httpMethod is not allowed", 403);
