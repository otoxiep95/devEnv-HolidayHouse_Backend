<?php

/**
 * Sanitize a variable and/or convert it into the correct data type
 * 
 * Strings:     Convert all html tags into HTML friendly characters(Escape). Remove space in the beginning and end of the string
 * Number:      Convert string numbers into real numbers. Returns as integer or float depending on the input string
 * Array:       Loop through the array and re-use the sanitization methods for number and strings. Multidimensial arrays are working too.
 * Object:      Loop through the object and re-use the sanitization methods for number and strings. Multidimensial objects are working too.
 * Date:        If the date string is a valid date based on the passed format, return the date as a date type, else return false
 * 
 * Example:     input                                           -->     output
 *              =====================================================================================================================================
 *              sanitize(" Hello <br> world ");                 -->     "Hello &lt;br&gt; world"
 *              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *              sanitize("699");                                -->     699                             (as data type integer)
 *              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *              sanitize("42.48290");                           -->     42.48290                        (as data type float)
 *              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *              sanitize([                                              [
 *               "42",                                                   42,
 *               "Hello there",                                          "Hello there",
 *               "Hello <br> world",                                     "Hello &lt;br&gt; world",
 *               (object) [                                     -->      (object) [
 *                          "this" => "Is how",                                 "this" => "Is how",
 *                          "we" => 32,                                         "we" => 32,
 *                          "do" => "999.999"                                   "do" => 999.999
 *                        ]                                                     ]
 *              ]);                                                     ]
 *              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *              sanitize("2020-20-12", true, "Y-m-d");          -->     false                           (not valid date as a year only has 20 months)
 *              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *              sanitize("12/05/2015", true, "d/m/Y");          -->     12/05/2015                      (as data type date)
 *              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 
 *  
 * 
 * @param array|object|integer|float|string $value The value to sanitize and/or convert into the respective data type
 * 
 * @return array|object|integer|float|string|date The sanitized value
 */

function sanitize($value, $isDate = false, $dateFormat = 'Y-m-d')
{
    if ($isDate) {
        $d = DateTime::createFromFormat($dateFormat, $value);
        return ($d && $d->format($dateFormat) === $value) ? $d : false;
    }
    if (is_numeric($value)) {
        return ($value == (int) $value) ? (int) $value : (float) $value; //return number as integer or float type, depending on $value input
    }
    if (is_string($value)) {
        return trim(htmlspecialchars($value)); //escape html tags and remove space from start and end
    }
    if (is_array($value)) {
        $array = [];
        foreach ($value as $i => $val) {
            $array[$i] = sanitize($val); //sanitize each value inside the array
        }
        return $array;
    }
    if (is_object($value)) {
        $array = [];
        foreach ($value as $i => $val) {
            $array[$i] = sanitize($val); //sanitize each value inside the object
        }
        return (object) $array;
    }
}


/**
 * Check for the existence of a value.
 * 
 * This setup is mainly aimed to be used within API's
 * where sometimes you have to use false or zero's
 * and need to check for their existence.
 * Why not use alone empty() or isset()?
 *      - empty() will fail with 0 and false.
 *      - isset() returns true with an empty string (""), empty array [] or empty object {}
 * 
 * 
 * Returns true in these cases:
 *      1               (integer)
 *      0               (integer with 0 value)
 *      1.2             (float)
 *      0.0             (float with 0.0 value)
 *      true            (boolean)
 *      false           (boolean)
 *      "Hello world"   (string)
 *      ['a','b']       (array)
 *      {a : 'b'}       (object)
 * 
 * 
 * Returns false in these cases:
 *      ""              (empty string)
 *      []              (empty array)
 *      {}              (empty object)
 *      $variable;      (declared variable without value)
 *      NULL
 *      non declared variables
 * 
 * In the case of non declared variables, use the function like: val_exists(@$var); which will turn off error noticing for this function
 * 
 * @param array|object|integer|float|string|boolean|null $var The variable to check
 * @return boolean Retuns true or false
 */
function val_exists($var)
{
    return is_array($var) || is_object($var) ? !empty((array) $var) : (is_numeric($var) ? true : (!empty($var) && strlen($var)) || is_bool($var));
}
/**
 * The val_exists function (above) in a expended version for better understanding
 * 
 *    function valExistExpanded($var)
 *      {
 *         if (is_array($var) || is_object($var)) {
 *              return !empty((array) $var);
 *         }
 *   
 *        if (is_numeric($var)) {
 *             return true;
 *         }
 *   
 *         return !empty($var) && strlen($var) || is_bool($var);
 *      }
 */
