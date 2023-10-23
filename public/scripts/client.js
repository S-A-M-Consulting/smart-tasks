$(document).ready(function () {
  // essential ajax functions to interact with backend API
  const getMyTasks = function (userId) {
    let url = "/api/tasks";
    return $.ajax({
      url,
      type: "GET",
    })
      .then((myTasks) => {
        //renderMyTasks (or something similar)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = function () {
    return $.ajax({
      method: "POST",
      url: "/users/logout",
    })
      .then((userId) => {
        //remove cookie function
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
      .then((myTasks) => {
        //renderMyTasks (or something similar)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTask = function (data) {
    return $.ajax({
      method: "POST",
      url: "/api/tasks",
      data,
    })
      .then((newTask) => {
        //renderNewTask (or something similar)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // this function can edit the task description itself aswell as mark it as complete
  const editTask = function (taskId, data) {
    return $.ajax({
      method: "PATCH",
      url: "/api/tasks/${taskId}",
      data,
    });
  };

  const deleteTask = function (taskId, data) {
    return $.ajax({
      method: "DELETE",
      url: "/api/tasks/${taskId}",
      data,
    })
      .then((deleteTask) => {
        //renderMyTasks (or something similar)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterTask = function (categoryId, data) {
    return $.ajax({
      method: "GET",
      url: "/api/tasks/${categoryId}",
      data,
    })
      .then((data) => {
        //renderMyTasks (or something similar)
      })
      .catch((err) => {
        console.log(err);
      });
  };
});
