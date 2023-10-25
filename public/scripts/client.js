const USER_ID = 1;

// function to create the HTML new task element using template literals
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
              <li><a class="dropdown-item dropdown-category" href="#" data-category="1">Film</a></li>
              <li><a class="dropdown-item dropdown-category" href="#" data-category="2">Restaurant</a></li>
              <li><a class="dropdown-item dropdown-category" href="#" data-category="3">Book</a></li>
              <li><a class="dropdown-item dropdown-category" href="#" data-category="4">Product</a></li>
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

// handles marking the task as complete (changing the is_complete boolean element in tasks database)
const handleDoneButton = function (event) {
  event.preventDefault();
  // grabs task class for the dynamically generated tasks
  const task_id = $(this).closest('.task').attr('data-id');

  $.ajax({
    method: 'PATCH',
    url: `/api/tasks/${task_id}`,
    data: {is_complete: true}
  }).then(changed_task => {
    // calls getMyTasks if successful
    getMyTasks(USER_ID);
  }).catch(err => console.log(err));
};

// similarly to the above done button, this allows users to change the task category_id in the tasks database
const handleCategoryButton = function(event) {
  event.preventDefault();
  const task_id = $(this).closest('.task').attr('data-id');
  const category_id = $(this).attr('data-category');
  //using patch because it is only a partial change
  $.ajax({
    method: 'PATCH',
    url: `/api/tasks/${task_id}`,
    data: {category_id}
  }).then(changed_task => {
    // calls getMyTasks if resolved
    getMyTasks(USER_ID);
  }).catch(err => console.log(err));

};

// GET request to grab all the tasks (based on user.id) from the database
const getMyTasks = function (userID) {
  return $.ajax({
    url: "/api/tasks",
    method: "GET",
  })
    .then((myTasks) => {
      // calls renderTasks if resolved
      renderTasks(myTasks);
    })
    .catch((err) => {
      console.log(err);
    });
};

// function to append the tasks to their appropriate categories in the index.js
const renderTasks = function (tasks) {
  console.log('tasks:', tasks);
  // create empty arrays within an object for the tasks to be assigned into by category
  const renderedTasks = {
    films: [],
    restaurants: [],
    books: [],
    products: []
  };

  // for loop to interact with the individual tasks
  for (let task of tasks) {
    // call createNewCard to generate the HTML for each individual task
    const newCard = createNewCard(task);
    // push each task element in to the appropriate array based on category
    switch (task.category_id) {
      case 1:
        renderedTasks.films.push(newCard);
        break;
      case 2:
        renderedTasks.restaurants.push(newCard);
          break;
      case 3:
        renderedTasks.books.push(newCard);

          break;
      case 4:
        renderedTasks.products.push(newCard);
          break;

      default:
        break;
    }
  }

  // empty or clear out the various containers within the index.js to append the now categorized tasks
  $('#tasks-container-film').empty().append(renderedTasks.films);
  $('#tasks-container-restaurant').empty().append(renderedTasks.restaurants);
  $('#tasks-container-book').empty().append(renderedTasks.books);
  $('#tasks-container-product').empty().append(renderedTasks.products);

  // add listener events to each
  $('button.done-button').on('click', handleDoneButton);
  $('.dropdown-category').on('click', handleCategoryButton);
};

const handleFilterView = function (event) {
  event.preventDefault();

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

const makeTask = function(text) {
  const keywords = {
    'watch': 1,
    'eat': 2,
    'read': 3,
    'buy': 4,
    'purchase': 4
  };

  const splitText = text.split(' ');

  let category_id = keywords[splitText[0].toLowerCase()];
  category_id = category_id ? category_id : 0; //If cateogry id exists, pass thru, otherwise set to 0;

  return {
    user_id: USER_ID,
    category_id,
    task_name: text,
    is_complete: false
  };
}

const handleNewTask = function (event) {


  event.preventDefault();
  const content = $('#newTask-text').val();
  console.log('eneter handle block')
  const newTask = makeTask(content);


  console.log('content:', newTask);

  $.ajax({
    method: 'POST',
    url: 'api/tasks',
    data: newTask
  }).then(task => {
    $("#newTask-text").val("");
    console.log('entered then block');
    getMyTasks(USER_ID);
  }).catch(err => console.log(err));

}

const addNewTaskHandler = function () {
  // the submitting of a new task event
  $("#newtask-form").on("submit", handleNewTask)
};

const addFilterTasksHandler = function () {
  $('a.item-filter').on('change', handleFilterView);
};

$(document).ready(() => {
  getMyTasks();
  addNewTaskHandler();
  addFilterTasksHandler();
});
