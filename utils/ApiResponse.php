<?php



class ApiResponse
{
    private static $debug = true;


    public static function success($data = [], $message = "Success", $httpStatus = 200)
    {
        $response = (object) [
            "data" => $data,
            "message" => $message,
        ];

        setcookie('cross-site-cookie', 'name', ['samesite' => 'None', 'secure' => true]);

        $response = json_encode($response);

        http_response_code($httpStatus);
        echo $response;
        exit;
    }

    public static function error($data = [], $message = "Error", $httpStatus = 500)
    {

        $bt = debug_backtrace();
        $caller = array_shift($bt);
        $lineNumber = $caller['line'];

        if (self::$debug) {
            $response = (object) [
                "data" => $data,
                "message" => $message,
                "line" => $lineNumber
            ];
        } else {
            $response = (object) [
                "data" => $data,
                "message" => $message
            ];
        }


        $response = json_encode($response);

        http_response_code($httpStatus);
        echo $response;
        exit;
    }
}
