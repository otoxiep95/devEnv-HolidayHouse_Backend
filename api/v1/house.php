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
                user_id = :idVal;");
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
     * Multiple house request, p for page number
     */
    $page = 0;
    if (isset($_GET['p'])) {
        $page = $_GET['p'] - 1;
    }
    $start = $page * $per_page;
    $conn = Database::connect();
    $stmt = $conn->prepare("SELECT * FROM house LIMIT :startVal,:per_pageVal");
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!Auth::is_authenticated()) {
        return ApiResponse::error([], "Unauthenticated", 401);
    }
    $post = json_decode(file_get_contents('php://input'), true);

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
        'image' => 'Image'
    ];

    //Check existence and sanitize values
    foreach ($api as $key => $desc) {
        if (!@val_exists($post[$key])) {
            return ApiResponse::error([], "{$desc} value is missing", 500);
        }
        $api[$key] = sanitize($post[$key]); //sanitize values and store them inside the API
    }

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
        'imageVal' => $api['image'],
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
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {


    if (!Auth::is_authenticated()) {
        return ApiResponse::error([], "Unauthenticated", 401);
    }
    $patch = json_decode(file_get_contents('php://input'), true);

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
        'image' => 'Image'
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
            'imageVal' => $api['image'],
            'house_idVal' => $api['house_id']
        ]);
        if ($query) {
            return ApiResponse::success($api, "House updated");
        }
    }

    return ApiResponse::error([], "Deleting house failed");
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
