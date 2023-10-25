require("dotenv").config();
const fetch = require('node-fetch');
const { findNullTaskDescriptions, editTask } = require('../db/queries/tasks.js');

const urlEncode = string => string.split(' ').join('%20');

const invokeApiCalls = function() {
  findNullTaskDescriptions
    .then(delegateApiCalls);
}

const delegateApiCalls = function (tasks) {
  for (const task of tasks) {
    if (task.category_id === 1) {
      makeMovieAPICall(task.taskName)
        .then(info => {
          task.task_description = info.overview;
          task.url_image = `https://www.themoviedb.org/t/p/w1280${info.poster_path}`;
          return task;
        }).then(task => {
          editTask(task.id, task)
        })
        .catch(e => console.log(e.message));
    }
  }
}


const makeMovieAPICall = function (searchString) {
  const url = `https://api.themoviedb.org/3/search/multi?query=${urlEncode(searchString)}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_MOVIE_BEARER_TOKEN}`
    }
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(json => json.results[0])
    .catch(err => console.error('error:' + err));
};

async function fetchMovieInfo(searchString) {
  try {
    // Construct the TMDb API URL with your API key
    const apiKey = process.env.API_MOVIE_KEY;
    const encodedSearchString = encodeURIComponent(searchString);
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
      throw new Error(`No results found for "${searchString}" on TMDb.`);
    }

    // Get the first result
    const movieInfo = data.results[0];
    console.log(movieInfo);
    return movieInfo;
  } catch (error) {
    console.error('Error fetching movie information:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}

//makeAPICall('What We do in the shadows');
module.exports = { invokeApiCalls };

console.log(fetchMovieInfo('The matrix'));
