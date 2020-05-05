<?php

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
            ApiResponse::error(500, "Invalid email/password combination");
        }

        if (!password_verify($password, $user['password'])) {
            ApiResponse::error(500, "Invalid email/password combination");
        }


        self::init();
        $_SESSION[self::$session_name] = $user['email'];
        ApiResponse::success(200, "User authenticated");
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
}
