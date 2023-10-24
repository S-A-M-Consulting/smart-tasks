$(document).ready(function () {
  // Initial state: Show "Edit Description" button and hide "Done," "Change Category," and "Save" buttons for all tasks
  $(".done-button, .category-button, .edit-button").show();
  $(".save-button").hide();

  // "Edit Description" button click event
  $(".edit-button").click(function () {
    // Get the task's specific ID
    const taskId = $(this).closest(".task").attr("id");

    // Hide 3 button
    $(
      `#${taskId} .done-button, #${taskId} .category-button, #${taskId} .edit-button`
    ).hide();
    // Show "Save" buttons
    $(
      `#${taskId} .save-button`
    ).show();

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
    // Get the task's specific ID
    const taskId = $(this).closest(".task").attr("id");

    // Hide "Save" buttons
    $(
      `#${taskId} .save-button`
    ).hide();
    // Show 3 button
    $(
      `#${taskId} .done-button, #${taskId} .category-button, #${taskId} .edit-button`
    ).show();

    // Replace the textarea with a new card text containing the edited content (if any)
    const editedContent = $(this).closest(".card-body").find("textarea").val();
    const cardText = $("<p>").addClass("card-text").text(editedContent);

    $(this).closest(".card-body").find("textarea").replaceWith(cardText);
  });
});
