<?php
session_start(); // Start the session to get the user's unique ID
$uploadDir = "user_uploads/" . session_id() . "/"; // Directory for user-specific uploads

// Create the user-specific directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Check if files were uploaded
if (isset($_FILES['photo'])) {
    $allowedExtensions = array('jpg', 'jpeg', 'png'); // Allowed file extensions

    foreach ($_FILES['photo']['tmp_name'] as $key => $tmpName) {
        $fileName = $_FILES['photo']['name'][$key];
        $fileTmp = $_FILES['photo']['tmp_name'][$key];
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Check if the file is an image and has a valid extension
        if (in_array($fileExt, $allowedExtensions)) {
            $destination = $uploadDir . uniqid() . '.' . $fileExt;
            move_uploaded_file($fileTmp, $destination);
        }
    }
}

// Redirect back to the main page after uploading
header("Location: index.php");
exit();
?>
