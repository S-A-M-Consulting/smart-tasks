require("dotenv").config();
const fetch = require('node-fetch');
const { editTask } = require('../db/queries/tasks.js');

const urlEncode = string => string.split(' ').join('%20');

const makeMovieAPICall = async function (task) {
  const name = task.task_name;
  try {
    // Construct the TMDb API URL with your API key
    const apiKey = process.env.API_MOVIE_KEY;
    const encodedSearchString = encodeURIComponent(name);
    const url = `https://api.themoviedb.org/3/search/multi?query=${encodedSearchString}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

    // Make the API request and await the response
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from TMDb. Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Check if there are results
    if (data.results.length === 0) {
      throw new Error(`No results found for "${name}" on TMDb.`);
    }

    // Get the first result
    const movieInfo = data.results[0];
    //console.log(movieInfo);
    const updateObj = {
      task_description: movieInfo.overview,
      url_image: `https://www.themoviedb.org/t/p/w1280${movieInfo.poster_path}`
    };

    await editTask(task.id, updateObj);

  } catch (error) {
    console.error('Error fetching movie information:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}

const makeBookAPICall = async function (task) {
  const name = task.task_name;
  try {
    // Construct the open library API URL
    const queryString = name.split(' ').join('+')
    const url = `https://openlibrary.org/search.json?title=${queryString}&limit=1`;

      // Make the API request and await the response
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from open library. Status: ${response.status}`);
    }

  // Parse the response as JSON
  const data = await response.json();

  // Check if there are results
  if (data.docs.length === 0) {
    throw new Error(`No results found for "${queryString}" on open library.`);
  }

  // Get the first result
  const bookInfo = data.docs[0];
  const isbn = bookInfo.isbn[0];
  const imageResponse = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  //console.log(imageResponse);
  const updateObj = {
    task_description: bookInfo.first_sentence[0],
    url_image: imageResponse
  };

  await editTask(task.id, updateObj);

  } catch (error) {
  console.error('Error fetching movie information:', error);
  throw error; // Rethrow the error for the caller to handle
  }
}

const makeYelpAPICall = async function (task) {
  const name = task.task_name;
  try {
    // Construct the TMDb API URL with your API key
    const apiKey = process.env.API_YELP_KEY;
    const encodedSearchString = encodeURIComponent(name);
    const url = `https://api.yelp.com/v3/businesses/search?location=Vancouver&term=${encodedSearchString}&limit=1`;
                `https://api.yelp.com/v3/businesses/search?location=Vancouver&term=${encodedSearchString}&limit=1`

    const options = {
      headers: {
      accept: 'application/json',
      Authorization: `Bearer P21WYCUYLBDqYWoiLts1HYmqnq8LHDidv_C-F69dJUcAYTHXOikbjFYklPF1K7unXNXldi3hLbUGzsWuUWm_UNJwNLGbfBnQf0Ac_uxQTJ3SHGUNupWnxQkAtcw5ZXYx`
      }
    }
    // Make the API request and await the response
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from Yelp. Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Check if there are results
    if (data.businesses.length === 0) {
      throw new Error(`No results found for "${name}" on TMDb.`);
    }

    // Get the first result
    const yelpInfo = data.businesses[0];
    //console.log(movieInfo);
    const updateObj = {
      task_description: yelpInfo.categories[0].title,
      url_image: yelpInfo.image_url
    };

    await editTask(task.id, updateObj);

  } catch (error) {
    console.error('Error fetching yelp information:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}

const makeProductAPICall = async function (task) {
  const name = task.task_name;
  try {
    // Construct the open library API URL
    const queryString = name.split(" ").join("+");
    const apiKey = process.env.API_SHOPPING_KEY;
    const searchEngine = "google_shopping";

    const url = `https://serpapi.com/search.json?engine=${searchEngine}&q=${queryString}&serp_api_key=${apiKey}`;


    // Make the API request and await the response
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from open library. Status: ${response.status}`
      );
    }

    // Parse the response as JSON
    const data = await response.json();

    // Check if there are results
    if (data.shopping_results.length === 0) {
      throw new Error(`No results found for "${queryString}" on open library.`);
    }

    // Get the first result
    const productInfo = data.shopping_results[0].title;
    const productImg = data.shopping_results[0].thumbnail;


    //console.log(imageResponse);
    const updateObj = {
      task_description: productInfo,
      url_image: productImg
    };

    await editTask(task.id, updateObj);
  } catch (error) {
    console.error("Error fetching product information:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

module.exports = {makeMovieAPICall, makeBookAPICall, makeProductAPICall, makeYelpAPICall};
