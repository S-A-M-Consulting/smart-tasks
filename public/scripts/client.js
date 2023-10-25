const USER_ID = 1;

// function to create the HTML new task element using template literals
const createNewCard = function (task) {
  const task_id = task.id;
  const task_name = task.task_name;
  const task_description = task.task_description;
  const task_image = task.url_image;

  const $template = $(`
  <div data-id=${task_id} id="task-id-${task_id}" class="col task">
    <div class="card shadow-sm">
      <img src=${task_image} alt="Thumbnail Image" width="100%" height="225">
        <div class="card-body">
         <h5>${task_name}</h5>
         <p class="card-text">${task_description}</p>
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
    products: [],
    uncategorized: []
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
        renderedTasks.uncategorized.push(newCard);
        break;
    }
  }

  // empty or clear out the various containers within the index.js to append the now categorized tasks
  $('#tasks-container-uncategorized').empty().append(renderedTasks.uncategorized);
  $('#tasks-container-film').empty().append(renderedTasks.films);
  $('#tasks-container-restaurant').empty().append(renderedTasks.restaurants);
  $('#tasks-container-book').empty().append(renderedTasks.books);
  $('#tasks-container-product').empty().append(renderedTasks.products);

  // add event listens after everything is rendered to prevent the issue of having the listeners prior to the tasks being rendered
  $('button.done-button').on('click', handleDoneButton);
  $('.dropdown-category').on('click', handleCategoryButton);
};

// function to provide a filtered view of tasks by category
const handleFilterView = function (event) {
  event.preventDefault();

  const $uncategorized = $('#tasks-container-uncategorized').hide();
  const $film = $('#tasks-container-film').hide();
  const $restaurant = $('#tasks-container-restaurant').hide();
  const $book = $('#tasks-container-book').hide();
  const $product = $('#tasks-container-product').hide();

  $uncategorized.siblings('h1.category-title-uncategorized').hide();
  $film.siblings('h1.category-title-film').hide();
  $restaurant.siblings('h1.category-title-restaurant').hide();
  $book.siblings('h1.category-title-book').hide();
  $product.siblings('h1.category-title-product').hide();

  // to hide or show the category container based on checkbox status
  if($('#checkbox-uncategorized').is(":checked")){
    $uncategorized.show();
    $uncategorized.siblings('h1.category-title-uncategorized').show();
  }

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
    $book.siblings('h1.category-title-book').show();
  }

  if($('#checkbox-product').is(":checked")) {
    $product.show()
    $product.siblings('h1.category-title-product').show();
  }
}

// function to create a task object for inserting into the database
const makeTask = function(text) {
  // simple category sorting based on key starting words
  const keywords = {
    'watch': 1,
    'eat': 2,
    'read': 3,
    'buy': 4,
    'purchase': 4,
    'get': 4
  };

  // split text into an array
  const splitText = text.split(' ');
  // search for starting keyword based on index 0
  let category_id = keywords[splitText[0].toLowerCase()];
  category_id = category_id ? category_id : 0; //If cateogry id exists, pass thru, otherwise set to 0;

  // return new task object
  return {
    user_id: USER_ID,
    category_id,
    task_name: text,
    is_complete: false
  };
}

// adds the new task to the database via POST request
const handleNewTask = function (event) {
  event.preventDefault();

  // getting the text content from the textarea
  const content = $('#newTask-text').val();
  // making a new task element through template literals
  const newTask = makeTask(content);

  $.ajax({
    method: 'POST',
    url: 'api/tasks',
    data: newTask
  }).then(task => {
    // clears text area
    $("#newTask-text").val("");
    // calls getMyTasks function which ultimately calls renderTasks to re-render the page with the newly created task
    getMyTasks(USER_ID);
  }).catch(err => console.log(err));

}
// function to add the event listener for submitting a new task
const addNewTaskHandler = function () {
  $("#newtask-form").on("submit", handleNewTask)
};

// function to add the event listener for filtering the view of taks by category
const addFilterTasksHandler = function () {
  $('a.item-filter').on('change', handleFilterView);
};

// calls the functions once the documennt is ready
$(document).ready(() => {
  getMyTasks();
  addNewTaskHandler();
  addFilterTasksHandler();
});
