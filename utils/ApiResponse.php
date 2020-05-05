<?php

class ApiResponse
{
    public static function success($httpStatus = 200, $message = "Success", $data = [])
    {
        $response = (object) [
            "data" => $data,
            "message" => $message,
        ];

        setcookie('cross-site-cookie', 'name', ['samesite' => 'None', 'secure' => true]);

        $response = json_encode($response);

        header('Content-type:application/json;charset=utf-8');
        http_response_code($httpStatus);
        echo $response;
        exit;
    }

    public static function error($httpStatus = 500, $message = "Error", $data = [])
    {

        $bt = debug_backtrace();
        $caller = array_shift($bt);
        $lineNumber = $caller['line'];

        $response = (object) [
            "data" => $data,
            "message" => $message,
            "line" => $lineNumber
        ];

        $response = json_encode($response);

        header('Content-type:application/json;charset=utf-8');
        http_response_code($httpStatus);
        echo $response;
        exit;
    }
}
