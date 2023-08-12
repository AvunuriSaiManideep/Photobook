<!DOCTYPE html>
<html>
<head>
    <title>Basic Photobook Tool</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="stylesheet" href="css/style.css">

</head>
<body>
    <div class="h-screen flex flex-col">
        <!-- Top Row -->
        <div class="h-6/7 flex-1 flex">
            <!-- Sidebar - 20% of the screen -->
            <div class="w-1/6 p-4 bg-gray-100">
                <h1>Basic Photobook Tool</h1>
                <form action="upload.php" method="post" enctype="multipart/form-data" class="flex flex-col gap-4">
    <!-- Upload button with icon -->

    <!-- Choose Files button with icon -->
    <label for="photo" class="px-4 py-2 font-medium text-white bg-green-500 rounded cursor-pointer hover:bg-green-600 flex items-center">
      <i class="fas fa-file mr-2"></i>Choose Files
    </label>
    <input id="photo" type="file" name="photo[]" class="sr-only" multiple accept="image/*">
    <button type="submit" class="px-4 py-2 font-medium text-white bg-green-500 rounded cursor-pointer hover:bg-green-600 flex items-center">
      <i class="fas fa-upload mr-2"></i>Upload
    </button>
  </form>

                <!-- Display the uploaded photos as thumbnails in the sidebar -->
                <div id="sidebar">
                    <?php
                    if (!is_dir("user_uploads/")) {
                        mkdir("user_uploads/", 0777, true);
                    }
                    session_start(); // Start the session to get the user's unique ID
                    $uploadDir = "user_uploads/" . session_id() . "/"; // Directory for user-specific uploads

                    // Create the user-specific directory if it doesn't exist
                    if (!file_exists($uploadDir)) {
                        mkdir($uploadDir, 0777, true);
                    }

                    $uploadedPhotos = scandir($uploadDir);

                    // Counter for numbering
                    $number = 1;

                    foreach ($uploadedPhotos as $photo) {
                        if ($photo != '.' && $photo != '..') {
                            // Wrap each image and number in a container div
                            echo '<div class="image-number-container">';
                            echo '<img src="' . $uploadDir . $photo . '" alt="Uploaded Photo" id="foo-bar">';
                            echo '<p class="mt-2 text-center">' . $number . '</p>';
                            echo '</div>';
                            $number++;
                        }
                    }
                    ?>
                </div>
            </div>

            <!-- Editable Area - 80% of the screen -->
            <div class="w-5/6 p-4 bg-gray-200" id="center">
                <div id="layout-panel">
                    <!-- This is where the selected layout will be displayed -->
                </div>
                <!-- Left and Right Navigation Buttons -->
                <div class="flex justify-between mt-4">
                    <button id="left-arrow-btn" class="arrow-btn">&lt;</button>
                    <p class="mt-2 text-center" id="page-number">Page 1 of 5</p>
                    <button id="right-arrow-btn" class="arrow-btn">&gt;</button>
                </div>
            </div>

        </div>

        <!-- Bottom Row -->
        <div class="h-1/7 flex-initial p-4 bg-gray-300 flex items-center justify-between" id="bottom">
  <!-- Styled "Remove All Images" button -->
  <form action="remove_all.php" method="post">
    <button type="submit" class="px-4 py-2 font-medium text-white bg-red-500 rounded cursor-pointer hover:bg-red-600 flex items-center">
      <i class="fas fa-trash-alt mr-2"></i>Remove All Images
    </button>
  </form>

  <!-- Download PDF button with icon -->
  <button id="download-pdf" class="px-4 py-2 font-medium text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600 flex items-center">
    <span class="mr-2">Download PDF</span>
    <i class="fas fa-download"></i>
  </button>
</div>


    </div>
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="js/script.js"></script>
    <!-- Include the html2pdf library from CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
</body>
</html>
