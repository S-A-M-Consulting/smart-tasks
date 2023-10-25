require("dotenv").config();
const fetch = require('node-fetch');


const urlEncode = string => string.split(' ').join('%20');

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

//makeAPICall('What We do in the shadows');
module.exports = { makeMovieAPICall };

console.log(makeMovieAPICall('The matrix'));
