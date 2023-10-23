// Client facing scripts here
// needs to be added through a script tag on the index.html

// essential ajax functions to interact with backend API
function getMyTasks(userId) {
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
}

function logOut() {
  return $.ajax({
    method: "POST",
    url: "/users/logout",
  });
}

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/users/login",
    data,
  });
}

const createTask = function (data) {
  return $.ajax({
    method: "POST",
    url: "/api/tasks",
    data,
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
  });
};
