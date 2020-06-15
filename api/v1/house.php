<?php

require_once(__DIR__ . '/../../init.php');

$per_page = 20; //pagination per page value

/**
 * GET requests
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    /**
     * Single house request, id for house id
     */
    if (isset($_GET['id'])) {
        $house_id = $_GET['id'];
        $conn = Database::connect();
        $stmt = $conn->prepare(
            " SELECT house.*, user.email, user.phone 
            FROM house
            LEFT JOIN user ON 
            house.user_id = user.user_id
            WHERE house_id = :idVal;"
        );
        $query = $stmt->execute([
            'idVal' => $house_id
        ]);
        if ($query) {
            $data = $stmt->fetch();
            return ApiResponse::success($data);
        }

        return ApiResponse::error([], "Failed to get house details");
    }

    /**
     * Get properties of the logged in user
     */
    if (isset($_GET['user'])) {
        $user = $_GET['user'];
        if ($user && Auth::is_authenticated()) {
            $user_id = Auth::getUserId();
            $conn = Database::connect();
            $stmt = $conn->prepare("SELECT * FROM house
            WHERE
                user_id = :idVal
                ORDER BY house_id DESC");
            $query = $stmt->execute([
                'idVal' => $user_id
            ]);
            if ($query) {
                $data = $stmt->fetchAll();
                return ApiResponse::success($data);
            }
        }
    }

    /**
     * Get properties during a search
     */
    if (isset($_GET['search'])) {
        $search = $_GET['search'];
        $searchTerm =  ($search) . '%'; // sanitize
        $conn = Database::connect();
        $stmt = $conn->prepare("SELECT * FROM house
            WHERE title LIKE :searchVal1
            OR street LIKE :searchVal2
            OR country LIKE :searchVal3
            OR city LIKE :searchVal4
            ORDER BY house_id DESC
            ");
        $query = $stmt->execute([
            'searchVal1' => $searchTerm,
            'searchVal2' => $searchTerm,
            'searchVal3' => $searchTerm,
            'searchVal4' => $searchTerm
        ]);
        if ($query) {
            $data = $stmt->fetchAll();
            return ApiResponse::success($data);
        }
    }

    /**
     * Multiple house request, p for page number
     */
    $page = 0;
    if (isset($_GET['p'])) {
        $page = $_GET['p'] - 1;
    }
    $start = $page * $per_page;
    $conn = Database::connect();
    $stmt = $conn->prepare("SELECT * FROM house ORDER BY house_id DESC LIMIT :startVal,:per_pageVal ");
    $query = $stmt->execute([
        'startVal' => $start,
        'per_pageVal' => $per_page
    ]);
    if ($query) {
        $data = $stmt->fetchAll();
        return ApiResponse::success($data);
    }

    return ApiResponse::error([], "Failed to get house");
}


/**
 * How to POST a new house
 * 
 * The data needs to be send via fetch, but in formData() format, NOT json.
 * 
 * There needs to be 2 formData values: "img" and "json"
 * -> img is the image file 
 * -> json is a JSON text of all other fields, such as title, city,..., e.g: 
 *      json: {
 *          "title": "Hakaaaaua",
 *          "description": "hdsadakjdsakdas",
 *          "bathroom": 3,
 *          "bedroom": 4,
 *          "size": 300,
 *          "street": "dawqeewq",
 *          "city": "dsadasd",
 *          "country": "Luxemb",
 *          "postal": 2233,
 *          "price_per_night": 299
 *      }
 */



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['method'] === "POST") {
        if (!Auth::is_authenticated()) {
            return ApiResponse::error([], "Unauthenticated", 401);
        }

        $post = json_decode($_POST['json'], true);
        // var_dump($post);
        // POST API schema, these fields are required
        $api = [
            'title' => 'Title',
            'description' => 'Description',
            'bedroom' => 'Bedroom',
            'bathroom' => 'Bathroom',
            'size' => 'Size',
            'street' => 'Street',
            'city' => 'City',
            'country' => 'Country',
            'postal' => 'Postal',
            'price_per_night' => 'Price per night',
        ];
        //Check existence and sanitize values
        foreach ($api as $key => $desc) {
            if (!@val_exists($post[$key])) {
                return ApiResponse::error([], "{$desc} value is missing", 500);
            }
            $api[$key] = sanitize($post[$key]); //sanitize values and store them inside the API
        }

        //Handle and upload the image
        $imageId =  imageUploadHandler();

        // Insert new house
        $conn = Database::connect();
        $stmt = $conn->prepare("INSERT INTO house (title, description, bedroom, bathroom, size, street, city, country, postal, price_per_night, image, user_id)
    VALUES (:titleVal, :descriptionVal, :bedroomVal, :bathroomVal, :sizeVal, :streetVal, :cityVal, :countryVal, :postalVal, :price_per_nightVal, :imageVal, :user_idVal)
    ");
        $query = $stmt->execute([
            'titleVal' => $api['title'],
            'descriptionVal' => $api['description'],
            'bedroomVal' => $api['bedroom'],
            'bathroomVal' => $api['bathroom'],
            'sizeVal' => $api['size'],
            'streetVal' => $api['street'],
            'cityVal' => $api['city'],
            'countryVal' => $api['country'],
            'postalVal' => $api['postal'],
            'price_per_nightVal' => $api['price_per_night'],
            'imageVal' => $imageId,
            'user_idVal' => Auth::getUserId()
        ]);
        if ($query) {
            $insertid = $conn->lastInsertId();
            $api['house_id'] = $insertid;
            $api['user_id'] = Auth::getUserId();
            return ApiResponse::success($api);
        }

        return ApiResponse::error([], "Failed to create house");
    }

    /**
     * Update a single house
     */
    if ($_POST['method'] === 'PATCH') {

        var_dump($_SERVER['REQUEST_METHOD']);
        if (!Auth::is_authenticated()) {
            return ApiResponse::error([], "Unauthenticated", 401);
        }
        $patch = json_decode($_POST['json'], true);

        $userId = Auth::getUserId();

        // PATCH API schema, these fields are required
        $api = [
            'title' => 'Title',
            'description' => 'Description',
            'bedroom' => 'Bedroom',
            'bathroom' => 'Bathroom',
            'size' => 'Size',
            'street' => 'Street',
            'city' => 'City',
            'country' => 'Country',
            'postal' => 'Postal',
            'price_per_night' => 'Price per night',
            'house_id' => 'Id house'
        ];

        //Check existence and sanitize values
        foreach ($api as $key => $desc) {
            if (!@val_exists($patch[$key])) {
                return ApiResponse::error([], "{$desc} value is missing", 500);
            }
            $api[$key] = sanitize($patch[$key]); //sanitize values and store them inside the API
        }

        // Check if user is allowed to update house
        $conn = Database::connect();
        $stmt = $conn->prepare("SELECT * FROM house WHERE house_id = :house_idVal");
        $query = $stmt->execute([
            'house_idVal' => $patch['house_id']
        ]);

        //Handle and upload the image
        $imageId =  imageUploadHandler();

        //Handle and upload the image
        // $imageId =  imageUploadHandler();

        if ($query && $stmt->rowCount()) {
            $data = $stmt->fetch();
            if ($data['user_id'] != $userId) {
                return ApiResponse::error([], "Forbidden to update this house", 403);
            }

            $stmt = $conn->prepare("UPDATE house
        SET 
            title = :titleVal,
            description =:descriptionVal,
            bedroom =:bedroomVal,
            bathroom = :bathroomVal,
            size =:sizeVal,
            street = :streetVal, 
            city =:cityVal,
            country =:countryVal,
            postal =:postalVal,
            price_per_night =:price_per_nightVal, 
            image = :imageVal
        WHERE
            house_id = :house_idVal
        ");


            $query = $stmt->execute([
                'titleVal' => $api['title'],
                'descriptionVal' => $api['description'],
                'bedroomVal' => $api['bedroom'],
                'bathroomVal' => $api['bathroom'],
                'sizeVal' => $api['size'],
                'streetVal' => $api['street'],
                'cityVal' => $api['city'],
                'countryVal' => $api['country'],
                'postalVal' => $api['postal'],
                'price_per_nightVal' => $api['price_per_night'],
                'imageVal' => $imageId,
                'house_idVal' => $api['house_id']
            ]);
            if ($query) {
                return ApiResponse::success($api, "House updated");
            }
        }

        return ApiResponse::error([], "Deleting house failed");
    }
}


/**
 * DELETE a single house
 */
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $delete = json_decode(file_get_contents('php://input'), true);

    if (!Auth::is_authenticated()) {
        return ApiResponse::error([], "Unauthenticated", 401);
    }
    $userId = Auth::getUserId();
    if (!@val_exists($delete['house_id'])) {
        return ApiResponse::error([], "House id value is missing", 500);
    }


    // Insert new house
    $conn = Database::connect();
    $stmt = $conn->prepare("SELECT * FROM house WHERE house_id = :house_idVal
        ");
    $query = $stmt->execute([
        'house_idVal' => $delete['house_id']
    ]);
    if ($query && $stmt->rowCount()) {
        $data = $stmt->fetch();
        if ($data['user_id'] != $userId) {
            return ApiResponse::error([], "Forbidden to delete this house", 403);
        }

        $stmt = $conn->prepare("DELETE FROM house WHERE house_id = :house_idVal
        ");
        $query = $stmt->execute([
            'house_idVal' => $delete['house_id']
        ]);

        if ($query) {
            return ApiResponse::success($data, "House deleted");
        }
    }

    return ApiResponse::error([], "Deleting house failed");
}


/**
 * Disable all other HTTP request methods
 */
if (isset($_SERVER['REQUEST_METHOD'])) {
    $method = $_SERVER['REQUEST_METHOD'];
    return ApiResponse::error([], "HTTP method {$method} not allowed", 405);
}

/**
 * Image upload hanlder, taking out of the $_FILES global variable during a post
 */



function imageUploadHandler()
{
    $sImagePath = __DIR__ . "/../../client/public/user_uploads/img/";

    if (!$_FILES['img']) {
        ApiResponse::error([], "Image does not exist", 400);
    }

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

    $savedImage = $sImagePath . $sUniqueImageName;

    move_uploaded_file($_FILES['img']['tmp_name'], $savedImage);
    compressAndResize($sUniqueImageName, 80);

    return $sUniqueImageName;
}

/**
 * Compress & Optimize Images
 */

function compressAndResize($imageId, $quality)
{
    $sImagePath = __DIR__ . "/../../client/public/user_uploads/img/";
    $source = $sImagePath . $imageId;

    // Compress
    $info = getimagesize($source);


    if ($info['mime'] == 'image/jpeg')
        $image = imagecreatefromjpeg($source);

    elseif ($info['mime'] == 'image/gif')
        $image = imagecreatefromgif($source);

    elseif ($info['mime'] == 'image/png')
        $image = imagecreatefrompng($source);

    // Resize image to normal size

    // $info[0] returns image width
    // $info[1] returns image height
    $aspectRatio = 700 / $info[0];
    if ($info[0] > 700) {

        //resize to width 700 and keep aspect ratio
        $image = imagescale($image, 700, $aspectRatio * $info[1]);
    }
    imagejpeg($image, $sImagePath . "/normal/" . $imageId, $quality);

    // Resize image to thumbnail size

    // $info[0] returns image width
    // $info[1] returns image height
    $aspectRatio = 300 / $info[0];
    //resize to width 700 and keep aspect ratio
    $image = imagescale($image, 300, $aspectRatio * $info[1]);

    imagejpeg($image, $sImagePath . "/thumbnail/" . $imageId, $quality);

    unlink($sImagePath . $imageId); // delete original image
}
