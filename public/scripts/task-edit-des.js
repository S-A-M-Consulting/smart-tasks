$(document).ready(function () {
  // Initial state: Show "Edit Description" and "Change Category" buttons, and hide "Save" button
  $(".edit-button, .category-button").show();
  $(".save-button").hide();

  // "Edit Description" button click event
  $(".edit-button").click(function () {
    // Hide "Edit Description" and "Change Category" buttons
    $(".edit-button, .category-button").hide();
    // Show "Save" button
    $(".save-button").show();

    // Get the card text and create an editable textarea
    const cardText = $(this).closest(".card-body").find(".card-text");
    const textContent = cardText.text();

    // Create a textarea element and set its value to the card text content
    const textarea = $("<textarea>").addClass("form-control").val(textContent);

    // Replace the card text with the editable textarea
    cardText.replaceWith(textarea);
  });

  // "Save" button click event
  $(".save-button").click(function () {
    // Get the edited content from the textarea
    const editedContent = $(this).closest(".card-body").find("textarea").val();

    // Replace the textarea with a new card text containing the edited content
    const cardText = $("<p>").addClass("card-text").text(editedContent);

    $(this).closest(".card-body").find("textarea").replaceWith(cardText);

    // Show "Edit Description" and "Change Category" buttons
    $(".edit-button, .category-button").show();
    // Hide "Save" button
    $(this).hide();
  });
});
