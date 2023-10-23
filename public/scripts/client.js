$(document).ready(function () {
  // the logout event
  $("#logout").on("submit", function (event) {
    event.preventDefault();

    const logout = function () {
      return $.ajax({
        method: "POST",
        url: "/users/logout",
      });
      // .then((userId) => {
      //   //remove cookie callback function
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    };

    logout();
  });

  // the submitting of a new task event
  $("#button-submit-new").on("submit", function (event) {
    event.preventDefault();

    if (!$("#button-submit-new").val()) {
      // $("#error-message").append('<i class="fa-solid fa-triangle-exclamation"></i>You cannot post an empty tweet<i class="fa-solid fa-triangle-exclamation"></i>').show();
    } else {
      const createTask = function (data) {
        return $.ajax({
          method: "POST",
          url: "/api/tasks",
          data,
        })
          .then((newTask) => {
            //renderNewTask in html
          })
          .catch((err) => {
            console.log(err);
          });
      };
    }
  });

  // to confirm changes made to a task event
  $("#button-task-edit-des").on("submit", function (event) {
    event.preventDefault();

    // this function can edit the task description itself aswell as mark it as complete
    const editTask = function (taskId, data) {
      return $.ajax({
        method: "PATCH",
        url: `/api/tasks/${taskId}`,
        data,
      });
    };
  });

  // to mark a task as complete event
  $("#button-task-done").on("submit", function (event) {
    event.preventDefault();

    // this function can edit the task description itself aswell as mark it as complete
    const editTask = function (taskId, data) {
      return $.ajax({
        method: "PATCH",
        url: `/api/tasks/${taskId}`,
        data,
      });
    };
  });

  // to delete a task event
  $("#button-task-delete").on("submit", function (event) {
    event.preventDefault();

    const deleteTask = function (taskId) {
      return $.ajax({
        method: "DELETE",
        url: `/api/tasks/${taskId}`,
      })
        .then((deleteTask) => {
          //renderMyTasks (or something similar)
        })
        .catch((err) => {
          console.log(err);
        });
    };
  });

  // to filter specific task categories - film
  $("#checkbox-film").on("checked", function (event) {
    event.preventDefault();

    const filterTask = function (categoryId) {
      return $.ajax({
        method: "GET",
        url: `/api/tasks/${categoryId}`,
        data,
      })
        .then((data) => {
          //renderMyTasks (or something similar)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    filterTask(1);
  });

  // to filter specific task categories - restaurant
  $("#checkbox-restaurant").on("checked", function (event) {
    event.preventDefault();

    const filterTask = function (categoryId) {
      return $.ajax({
        method: "GET",
        url: `/api/tasks/${categoryId}`,
        data,
      })
        .then((data) => {
          //renderMyTasks (or something similar)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    filterTask(2);
  });

  // to filter specific task categories - book
  $("#checkbox-book").on("checked", function (event) {
    event.preventDefault();

    const filterTask = function (categoryId) {
      return $.ajax({
        method: "GET",
        url: `/api/tasks/${categoryId}`,
        data,
      })
        .then((data) => {
          //renderMyTasks (or something similar)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    filterTask(3);
  });

  // to filter specific task categories - product
  $("#checkbox-product").on("checked", function (event) {
    event.preventDefault();

    const filterTask = function (categoryId) {
      return $.ajax({
        method: "GET",
        url: `/api/tasks/${categoryId}`,
        data,
      })
        .then((data) => {
          //renderMyTasks (or something similar)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    filterTask(4);
  });

  const getMyTasks = function () {
    return $.ajax({
      url: "/api/tasks",
      method: "GET",
    })
      .then((myTasks) => {
        //renderMyTasks (for currently logged in user)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logIn = function (data) {
    return $.ajax({
      method: "POST",
      url: "/users/login",
      data,
    })
      .then((data) => {
        getMyTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };
});
