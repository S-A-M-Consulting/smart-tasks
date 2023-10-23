// initial call to set views_manager to logIn
$(() => {
  logIn().then(function (json) {
    // propertyListings.addProperties(json.properties);
    views_manager.show("logIn");
    console.log(json);
  });
});
