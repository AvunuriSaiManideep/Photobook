$(document).ready(function () {
  let currentPage = 1;
  const totalPages = 5;
  const pageStates = {};
  // Handle right arrow button click for navigation
  $("#right-arrow-btn").click(function () {
    saveCurrentPageState(); //
    currentPage++;
    if (currentPage > totalPages) {
      currentPage = 1;
    }
    updateLayoutPanel();
    loadCurrentPageState();
  });

  // Handle left arrow button click for navigation
  $("#left-arrow-btn").click(function () {
    saveCurrentPageState();
    currentPage--;
    if (currentPage < 1) {
      currentPage = totalPages;
    }
    updateLayoutPanel();
    loadCurrentPageState();
  });
  // Function to save the state of the current page
  function saveCurrentPageState() {
    // Get the current layout of the layout panel
    const layoutHtml = $("#layout-panel").html();

    // Save the current layout to the pageStates object using the currentPage as the key
    pageStates[currentPage] = layoutHtml;

    // Save the pageStates object to localStorage
    localStorage.setItem("pageStates", JSON.stringify(pageStates));
  }

  function loadCurrentPageState() {
    // Get the pageStates object from localStorage
    const storedPageStates = JSON.parse(localStorage.getItem("pageStates"));

    // If the pageStates object exists, load the layout for the current page
    if (storedPageStates && storedPageStates[currentPage]) {
      $("#layout-panel").html(storedPageStates[currentPage]);

      // Reinitialize draggable functionality for images in the sidebar
      $("#sidebar img").draggable({
        helper: function () {
          return $("<div>")
            .append($("<img>").attr("src", $(this).attr("src")))
            .addClass("drag-helper");
        },
        revert: "invalid",
        appendTo: "body",
        zIndex: 100,
      });

      // Reinitialize droppable functionality for layout containers
      $("#layout-panel .layout-container").droppable({
        accept: "#sidebar img",
        drop: function (event, ui) {
          var imgSrc = ui.draggable.attr("src");
          var newImage = $("<img>")
            .attr("src", imgSrc)
            .addClass("w-full h-full object-cover");
          $(this).empty().append(newImage);
        },
      });
    } else {
      // If the current page state does not exist in localStorage, create a new layout
      updateLayoutPanel();
    }
  }

  // Function to update the layout panel based on the selected layout
  function updateLayoutPanel() {
    // Remove any existing content in the layout panel
    $("#layout-panel").empty();

    // Create a layout based on the current page
    switch (currentPage) {
      case 1:
        createTwoRowsLayout();
        break;
      case 2:
        createOneRowTwoColumnsLayout();
        break;
      case 3:
        createThreeRowsLayout();
        break;
      case 4:
        createGridLayout();
        break;
      case 5:
        createSingleImageLayout();
        break;
      default:
        // Default layout option (e.g., single image layout)
        createSingleImageLayout();
        break;
    }

    // Enable draggable functionality for images in the sidebar
    $("#sidebar img").draggable({
      helper: function () {
        // Create a custom helper element (e.g., a div)
        return $("<div>")
          .append(
            $("<img>").attr("src", $(this).attr("src")) // Set the same source as the original image
          )
          .addClass("drag-helper"); // Apply a class for styling
      },
      revert: "invalid",
      appendTo: "body",
      zIndex: 100,
    });

    // Enable droppable functionality for layout panels
    $("#layout-panel .layout-container").droppable({
      // accept: "#sidebar img",
      drop: function (event, ui) {
        // Get the image source from the dragged element

        var imgSrc = ui.draggable.attr("src");
        // Create a new image element and append it to the layout container
        console.log(imgSrc);
        var newImage = $("<img>")
          .attr("src", imgSrc)
          .addClass("w-full h-full object-cover");
        $(this).empty().append(newImage);
      },
    });
    $("#page-number").text(`Page ${currentPage} of ${totalPages}`);
  }

  // Function to create a two rows layout
  // Function to create a two rows layout
  function createTwoRowsLayout() {
    // Clear the layout panel before adding new layout
    $("#layout-panel").empty();

    // Create the first row container
    var row1 = $("<div>").addClass("flex");

    // Create image containers in the first row
    row1.append(
      $("<div>").addClass(
        "w-1/2 p-2 border border-black h-96 bg-gray-300 layout-container"
      )
    );
    row1.append(
      $("<div>").addClass(
        "w-1/2 p-2 border border-black h-96 bg-gray-300 layout-container"
      )
    );

    // Append the first row to the layout panel
    $("#layout-panel").append(row1);

    // Create the second row container
    var row2 = $("<div>").addClass("flex");

    // Create image container in the second row
    row2.append(
      $("<div>").addClass(
        "w-full p-2 border border-black h-96 bg-gray-300 layout-container"
      )
    );

    // Append the second row to the layout panel
    $("#layout-panel").append(row2);
  }

  // Enable droppable functionality for layout containers
  $("#layout-panel .layout-container").droppable({
    accept: "#sidebar img", // Ensure only images from the sidebar are accepted
    drop: function (event, ui) {
      // Get the image source from the dragged element
      var imgSrc = ui.draggable.attr("src");
      // var imgSrc = document.getElementById("foo-bar").getAttribute("src");

      console.log(imgSrc);
      // Create a new image element and append it to the layout container
      var newImage = $("<img>")
        .attr("src", imgSrc)
        .addClass("w-full h-full object-cover");

      $(this).empty().append(newImage);
    },
  });
  // Function to create a one row with two columns layout
  function createOneRowTwoColumnsLayout() {
    // Create a div for the row
    var row = $("<div>").addClass("flex");

    // Create image containers in the row
    row.append(
      $("<div>").addClass(
        "w-1/2 p-2 border border-black h-96 bg-gray-300 layout-container"
      )
    );
    row.append(
      $("<div>").addClass(
        "w-1/2 p-2 border border-black h-96 bg-gray-300 layout-container"
      )
    );

    // Append the row to the layout panel
    $("#layout-panel").append(row);
  }
  // Function to create a three rows layout
  function createThreeRowsLayout() {
    // Clear the layout panel before adding new layout
    $("#layout-panel").empty();

    // Create the first row container
    var row1 = $("<div>").addClass("flex");

    // Create image container in the first row
    row1.append(
      $("<div>").addClass(
        "w-full p-2 border border-black h-64 bg-gray-300 layout-container"
      )
    );

    // Append the first row to the layout panel
    $("#layout-panel").append(row1);

    // Create the second row container
    var row2 = $("<div>").addClass("flex");

    // Create image container in the second row
    row2.append(
      $("<div>").addClass(
        "w-full p-2 border border-black h-64 bg-gray-300 layout-container"
      )
    );

    // Append the second row to the layout panel
    $("#layout-panel").append(row2);

    // Create the third row container
    var row3 = $("<div>").addClass("flex");

    // Create image container in the third row
    row3.append(
      $("<div>").addClass(
        "w-full p-2 border border-black h-64 bg-gray-300 layout-container"
      )
    );

    // Append the third row to the layout panel
    $("#layout-panel").append(row3);
  }
  // Function to create a grid layout
  function createGridLayout() {
    // Clear the layout panel before adding new layout
    $("#layout-panel").empty();

    // Create the first row container
    var row1 = $("<div>").addClass("flex");

    // Create image containers in the first row
    row1.append(
      $("<div>").addClass(
        "w-1/2 p-2 border border-black h-96 bg-gray-300 layout-container"
      )
    );
    row1.append(
      $("<div>").addClass(
        "w-1/2 p-2 border border-black h-96 bg-gray-300 layout-container"
      )
    );

    // Append the first row to the layout panel
    $("#layout-panel").append(row1);

    // Create the second row container
    var row2 = $("<div>").addClass("flex");

    // Create image containers in the second row
    row2.append(
      $("<div>").addClass(
        "w-1/2 p-2 border border-black h-96 bg-gray-300 layout-container"
      )
    );
    row2.append(
      $("<div>").addClass(
        "w-1/2 p-2 border border-black h-96 bg-gray-300 layout-container"
      )
    );

    // Append the second row to the layout panel
    $("#layout-panel").append(row2);
  }

  // Function to create a single image layout
  function createSingleImageLayout() {
    // Create a div for the single image container
    var singleImage = $("<div>").addClass(
      "w-full p-2 border border-black h-96 bg-gray-300 layout-container"
    );

    // Append the single image container to the layout panel
    $("#layout-panel").append(singleImage);
  }
  // By default, update the layout panel with the first layout option
  updateLayoutPanel();
  $("#download-pdf").click(function () {
    generatePDF();
  });

  // Function to generate the PDF
  function generatePDF() {
    const options = {
      filename: "my-document.pdf",
      margin: 0, // [top, right, bottom, left] margins in inches
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };

    // Create an array to hold the content of each page
    const pagesContent = [];

    // Loop through all the pages and append their content to the pagesContent array
    for (let page = 1; page <= totalPages; page++) {
      // Save the current page state before cloning its content
      saveCurrentPageState();

      // Load the state of the current page
      currentPage = page;
      loadCurrentPageState();

      // Clone the content of the current page and add it to the pagesContent array
      const currentPageContent = $("#layout-panel").clone();
      pagesContent.push(currentPageContent[0]);
    }

    // Restore the current page state to the first page
    saveCurrentPageState();
    currentPage = 1;
    loadCurrentPageState();

    // Generate the PDF from the combined content
    const combinedContent = document.createElement("div");
    pagesContent.forEach((pageContent) => {
      combinedContent.appendChild(pageContent);
    });

    html2pdf().set(options).from(combinedContent).save();
  }
});

$(document).on("dragenter", function (e) {
  e.stopPropagation();
  e.preventDefault();
});
$(document).on("dragover", function (e) {
  e.stopPropagation();
  e.preventDefault();
  obj.css("border", "2px dotted #0B85A1");
});
$(document).on("drop", function (e) {
  e.stopPropagation();
  e.preventDefault();
});
