$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function (item) {
    $allTasks.detach();
    $logInForm.detach();

    switch (item) {
      case "tasks":
        $allTasks.appendTo($main);
        break;
      case "logIn":
        $logInForm.appendTo($main);
        break;
      case "error": {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo("body");
        setTimeout(() => {
          $error.remove();
          views_manager.show("tasks");
        }, 2000);

        break;
      }
    }
  };
});
