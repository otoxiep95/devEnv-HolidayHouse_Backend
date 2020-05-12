<?php


//Singleton Database class (static class)
class Database
{

    protected static $conn = null;

    //Singleton's should not have these basic classes
    private function __construct()
    {
    }
    private function __clone()
    {
    }
    private function __destruct()
    {
    }

    /**
     * Connect to the database
     * 
     * @return PDO object
     */

    public static function connect()
    {
        if (self::$conn === null) {
            require(__DIR__ . '/../config.php'); //require database login credentials from the config file

            $dsn = "mysql:host={$db_config->host};port={$db_config->port};dbname={$db_config->database};charset=utf8mb4";

            $conn = new PDO($dsn, $db_config->username, $db_config->password, $db_config->options);

            static::$conn = $conn; //static
            return $conn;
        } else {
            return self::$conn;
        }
    }
}
