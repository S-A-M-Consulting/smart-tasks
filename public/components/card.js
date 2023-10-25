const getCard = function (task) {
  const task_id = task.id;
  const task_name = task.task_name;

  const $template = $(`
  <div id="task-id-${task_id}" class="col task">
    <div class="card shadow-sm">
      <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        <div class="card-body">
         <h5>${task_name}</h5>
         <p class="card-text">Todo task description</p>
          <div class="d-flex justify-content-between align-items-center">
           <div class="btn-group">
            <button id="done" type="button" class="btn btn-sm btn-outline-secondary done-button">Done</button>
            <button type="button" class="btn btn-sm btn-outline-secondary edit-button">Edit Description</button>
            <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle category-button" data-bs-toggle="dropdown" aria-expanded="false">
              Change Category
            </button>
             <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" data-category="film">Film</a></li>
              <li><a class="dropdown-item" href="#" data-category="restaurant">Restaurant</a></li>
              <li><a class="dropdown-item" href="#" data-category="book">Book</a></li>
              <li><a class="dropdown-item" href="#" data-category="product">Product</a></li>
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
