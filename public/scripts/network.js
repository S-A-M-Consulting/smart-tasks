// Client facing scripts here
// needs to be added through a script tag on the index.html

function getAllTasks() {
  let url = "/api/tasks";
  return $.ajax({
    url,
  });
}

// const login =
// const logout =
// const createTask =
// const completeTask =
// const editTask =
// const recategorizeTask =
// const deleteTask =
