<?php

/**
 * Database connection credentials in an object
 * 
 * Usually, this file should be excluded inside the .gitignore file
 * 
 * @return object of the database credentials and options
 */
$db_config = (object) [
    'host' => 'localhost',
    'port' => '3306',
    'database' => 'devenv_holiday_house',
    'username' => 'root',
    'password' => '',
    'character_set' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'options' => [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]
];
