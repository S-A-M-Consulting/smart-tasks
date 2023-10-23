$(document).ready(function () {
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

  const logout = function () {
    return $.ajax({
      method: "POST",
      url: "/users/logout",
    })
      .then((userId) => {
        //remove cookie callback function
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
      url: `/api/tasks/${taskId}`,
      data,
    });
  };

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
});
