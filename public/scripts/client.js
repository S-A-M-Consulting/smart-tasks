//const orignalTasksArray = [];
const USER_ID = 1;

const createNewCard = function (task) {
  const task_id = task.id;
  const task_name = task.task_name;

  const $template = $(`
  <div data-id=${task_id} id="task-id-${task_id}" class="col task">
    <div class="card shadow-sm">
      <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        <div class="card-body">
         <h5>${task_name}</h5>
         <p class="card-text">Todo task description</p>
          <div class="d-flex justify-content-between align-items-center">
           <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary done-button">Done</button>
            <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle category-button" data-bs-toggle="dropdown" aria-expanded="false">
              Change Category
            </button>
             <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" data-category="1">Film</a></li>
              <li><a class="dropdown-item" href="#" data-category="2">Restaurant</a></li>
              <li><a class="dropdown-item" href="#" data-category="3">Book</a></li>
              <li><a class="dropdown-item" href="#" data-category="4">Product</a></li>
            </ul>
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary save-button">Save</button>
          <small class="text-body-secondary">9 mins</small>
        </div>
      </div>
    </div>
  </div>
`);
  return $template;
}




const handleDoneButton = function (event) {
  event.preventDefault();
  const task_id = $(this).closest('.task').attr('data-id');

  $.ajax({
    method: 'PATCH',
    url: `/api/tasks/${task_id}`,
    data: {is_complete: true}
  }).then(changed_task => {
    getMyTasks(USER_ID);
    console.log(changed_task.rows);
  }).catch(err => console.log(err));
};

const handleCategoryButton = function(event) {
  event.preventDefault();

};

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
      console.log(myTasks);
      renderTasks(myTasks);
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderTasks = function (tasks) {
  console.log('tasks:', tasks);
  const renderedTasks = [];
  for (let task of tasks) {
    const newCard = createNewCard(task);
    renderedTasks.push(newCard);
  }
  $('#tasks-container-film').empty().append(renderedTasks);
  $('button.done-button').on('click', handleDoneButton);
};

const handleFilterView = function (event) {
  console.log('handling filter view');
  const $film = $('#tasks-container-film').hide();
  const $restaurant = $('#tasks-container-restaurant').hide();
  const $book = $('#tasks-container-book').hide();
  const $product = $('#tasks-container-product').hide();

  $film.siblings('h1.category-title-film').hide();
  $restaurant.siblings('h1.category-title-restaurant').hide();
  $book.siblings('h1.category-title-book').hide();
  $product.siblings('h1.category-title-product').hide();


  if($('#checkbox-film').is(":checked")){
    $film.show();
    $film.siblings('h1.category-title-film').show();
  }

  if($('#checkbox-restaurant').is(":checked")) {
    $restaurant.show()
    $restaurant.siblings('h1.category-title-restaurant').show();
  }

  if($('#checkbox-book').is(":checked")) {
    $book.show()
    $film.siblings('h1.category-title-book').show();
  }

  if($('#checkbox-product').is(":checked")) {
    $product.show()
    $film.siblings('h1.category-title-product').show();
  }
}

const addNewTaskHandler = function () {
  // the submitting of a new task event
  $(".newtask-form").on("submit", handleDoneButton)
};

const addFilterTasksHandler = function () {
  $('.dropdown-item').on('change', handleFilterView);
};

$(document).ready(() => {
  getMyTasks();
  addNewTaskHandler();
  addFilterTasksHandler();


});
