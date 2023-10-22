$(() => {
  getAllTasks().then(function (json) {
    // propertyListings.addProperties(json.properties);
    // views_manager.show('listings');
    console.log(json);
  });
});
