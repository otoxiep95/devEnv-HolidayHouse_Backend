<?php
require_once(__DIR__ . '/../../init.php');

$sImagePath = __DIR__ . "/../../user_uploads/img/";




//Sanitize image
//Check if the file extension is jpg or png file
$sImageExtension = pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION);
// convert to lowercase so we don't have to worry about case sensitivity
$sImageExtension = strtolower($sImageExtension);
$aAllowedExtensions = ['jpg', 'png', 'jpeg'];
if (!in_array($sImageExtension, $aAllowedExtensions)) {
    ApiResponse::error([], "Not supported file extension", 400);
}

//Check if the file type is allowed
$sImageType = finfo_file(finfo_open(FILEINFO_MIME_TYPE), $_FILES['img']['tmp_name']); //-> dont use $_FILES['imgAgent]['type'] as OSX devices can send different headers -> https://stackoverflow.com/a/38658536/3673659
$aAllowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
if (!in_array($sImageType, $aAllowedTypes)) {
    ApiResponse::error([], "Corrupted file", 400);
}

//Check that the file is not too small or too big
$iImageSize = $_FILES['img']['size']; //below 1MB = 1024KB = 
if (!$iImageSize > 20 * 1024 && !$iImageSize < 1024 * 1024 * 2) {
    ApiResponse::error([], "File too big", 400);
}


//Save the file with an unique id inside the images folder
$imgId = uniqid();
$sUniqueImageName = $imgId . '.' . pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION); //create a unique name for the image to make sure the img name does not exist twice

move_uploaded_file($_FILES['img']['tmp_name'], $sImagePath . $sUniqueImageName);

echo json_encode((object) [
    "image" => $_FILES['img']['name']
]);
