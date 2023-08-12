<?php
session_start(); // Start the session to get the user's unique ID
$uploadDir = "user_uploads/" . session_id() . "/"; // Directory for user-specific uploads

// Function to remove all files in a directory
function removeFilesInDirectory($dirPath)
{
    if (is_dir($dirPath)) {
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            unlink($file);
        }
    }
}

// Call the function to remove all files in the user's specific upload directory
removeFilesInDirectory($uploadDir);

// Redirect back to the main page after removing images
header("Location: index.php");
exit();
?>
