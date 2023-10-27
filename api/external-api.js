require("dotenv").config();
const fetch = require('node-fetch');

const makeMovieAPICall = async function (task) {

  try {
    // Construct the TMDb API URL with your API key
    const apiKey = process.env.API_MOVIE_KEY;
    const encodedSearchString = encodeURIComponent(task.task_name);
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
      throw new Error(`No results found for "${task.task_name}" on TMDb.`);
    }

    // Get the first result
    const movieInfo = data.results[0];

    task.task_name = capitalizeWords(task.task_name);
    task.task_description = movieInfo.overview;
    task.url_image = `https://www.themoviedb.org/t/p/w1280${movieInfo.poster_path}`;
    task.link_url = `https://www.themoviedb.org/${movieInfo.media_type}/${movieInfo.id}`


    return task;

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
  if (!data.docs || data.docs.length === 0) {
    throw new Error(`No results found for "${queryString}" on open library.`);
  }

  // Get the first result
  const bookInfo = data.docs[0];
  const isbn = bookInfo.isbn[0];
  const imageResponse = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  //console.log(imageResponse);
  task.task_name = capitalizeWords(task.task_name)

  task.task_description = bookInfo.first_sentence[0];
  task.url_image = imageResponse;

  return task;

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


    const options = {
      headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
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

    task.task_name = yelpInfo.name
    task.task_description = yelpInfo.categories[0].title;
    task.url_image = yelpInfo.image_url;
    task.link_url = yelpInfo.url;


    return task;
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


    //console.log(imageResponse)
    task.task_name = capitalizeWords(task.task_name);
    task.task_description = productInfo;
    task.url_image = productImg;
    task.link_url = data.shopping_results[0].product_link;

    return task;
  } catch (error) {
    console.error("Error fetching product information:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

const makeRandomPhotoAPICall = async function (task) {
  try {
    const encoded = encodeURIComponent(task.task_name);
    const apiKey = process.env.API_PHOTO_KEY;
    const url = `https://api.unsplash.com/search/photos?query=${encoded}&per_page=1&client_id=${apiKey}`;

    const options = {header: {Authorization: `Client-ID ${apiKey}`}};

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from open photos. Status: ${response.status}`
      );
    }

    // Parse the response as JSON
    const data = await response.json();
    let image;
    if (data.results.length === 0) {
      image = 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjA4ODV8MHwxfHNlYXJjaHwxfHxxdWVzdGlvbnxlbnwwfHx8fDE2OTgzNTQ3NTV8MA&ixlib=rb-4.0.3&q=80&w=400';
    } else {
      image = data.results[0].urls.small;
    }


    const description = '';
    task.task_name= capitalizeWords(task.task_name);
    task.task_description = description,
    task.url_image = image

    return task;
    } catch (error) {
    console.log(error);
    throw error;
  }
}

const delegateCategorize = async (task) => {
  const delegation = [
    makeRandomPhotoAPICall,
    makeMovieAPICall,
    makeYelpAPICall,
    makeBookAPICall,
    makeProductAPICall
  ];
  const selectedFunc = delegation[task.category_id];

  return await selectedFunc(task);
};

function capitalizeWords(input) {
  return input.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

module.exports = { delegateCategorize };
