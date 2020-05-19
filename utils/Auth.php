<?php

ini_set('session.cookie_httponly', 1); //use HttpOnly session cookies

class Auth
{
    private static $session_name = "user_sid";

    public static function init()
    {
        //start session
        if (session_id() == '' || !isset($_SESSION)) {
            session_start();
        }
    }

    public static function login($email, $password)
    {
        $conn = Database::connect();
        $stmt = $conn->prepare("SELECT * FROM user WHERE email = :emailVal;");
        $stmt->execute([
            'emailVal' => $email
        ]);
        $user = $stmt->fetch();
        $userLength = $stmt->rowCount();
        if (!$userLength) {
            ApiResponse::error([], "Invalid email/password combination", 400);
        }

        if (!password_verify($password, $user['password'])) {
            ApiResponse::error([], "Invalid email/password combination", 400);
        }


        self::init();
        $_SESSION[self::$session_name] = $user['user_id'];
        ApiResponse::success([], "User authenticated", 200);
    }

    public static function is_authenticated()
    {
        self::init();

        if (!isset($_SESSION)) {
            return false;
        }

        if (array_key_exists(self::$session_name, $_SESSION)) {
            return true;
        } else {
            return false;
        }
    }

    public static function logout()
    {
        self::init();
        //destry session
        session_destroy();
    }

    public static function getUserId()
    {
        if (!self::is_authenticated()) {
            return false;
        } else {
            return $_SESSION[self::$session_name];
        }
    }
}
