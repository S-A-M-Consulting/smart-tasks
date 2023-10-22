// Client facing scripts here
// needs to be added through a script tag on the index.html

// essential ajax functions to interact with backend API
function getAllTasks() {
  let url = "/api/tasks";
  return $.ajax({
    url,
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

const editTask = function (data) {
  return $.ajax({
    method: "PATCH",
    url: "/api/tasks/:id",
    data,
  });
};

const deleteTask = function (data) {
  return $.ajax({
    method: "DELETE",
    url: "/api/tasks/:id",
    data,
  });
};

// const completeTask =
