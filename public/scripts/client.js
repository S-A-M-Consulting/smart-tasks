$(document).ready(function () {
  //let user = {id: 1};
  let orignalTasksArray = [];
  let filteredTasksArray = [];
  // the logout event

  $("#logout").on("submit", function (event) {
    event.preventDefault();

    const logout = function () {
      return $.ajax({
        method: "POST",
        url: "/users/logout",
      })
        .then(() => {
          let user = null;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    logout();
  });

  // the submitting of a new task event
  $(".newtask-form").on("submit", function (event) {
    event.preventDefault();

    const $text = $('#task_name');
    const task_name = $('#newTask-text').val();

    const newTask = {
      //user_id: 1,
      task_name: task_name,
      is_complete: false,
      category_id: 1
    };


    return $.ajax({
      method: "POST",
      url: "/api/tasks",
      data: newTask,
    })
      .then((newTask) => {
        //renderNewTask in html
        console.log(newTask);
        getMyTasks(1);
      })
      .catch((err) => {
        console.log(err);
      });
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
  $("#checkbox-film").on("change", function (event) {
    if ($(this).is(":checked")) {
      console.log("clicked");
      filteredTasksArray = orignalTasksArray.filter(
        (task) =>
          task.category_id === 2 ||
          task.category_id === 3 ||
          task.category_id === 4
      );
    }
    renderTasks(filteredTasksArray);
  });

  // to filter specific task categories - restaurant
  $("#checkbox-restaurant").on("click", function (event) {
    if ($(this).is(":checked")) {
      console.log("clicked");
    }
  });

  // to filter specific task categories - book
  $("#checkbox-book").on("click", function (event) {
    if ($(this).is(":checked")) {
      console.log("clicked");
    }
  });

  // to filter specific task categories - product
  $("#checkbox-product").on("click", function (event) {
    event.preventDefault();
    if ($(this).is(":checked")) {
      console.log("clicked");
    }
  });

  // login event, FIX THIS
  $("PLACEHOLDER").on("submit", function (event) {
    event.preventDefault();

    const logIn = function (data) {
      $.ajax({
        method: "POST",
        url: "/users/login",
        data,
      })
        .then((userObj) => {
          let user = userObj;
          getMyTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    logIn();
  });


  const getMyTasks = function (userID) {
    return $.ajax({
      url: "/api/tasks",
      method: "GET",
    })
      .then((myTasks) => {
        console.log(myTasks)
        orignalTasksArray = myTasks;
        renderTasks(myTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderTasks = function(tasks) {
    console.log('tasks:', tasks);
    const renderedTasks = []
    for (let task of tasks) {
      renderedTasks.push(getCard(task));
    }
    $('#tasks-container-film').empty().append(renderedTasks);
  }

  getMyTasks();
});
