// load .env data into process.env
require('dotenv').config();

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const db = require('../db/connection');
const { editTask } = require('../db/queries/tasks.js')
const fetch = require('node-fetch');
// PG connection setup
// const connectionString = process.env.DATABASE_URL ||
//   `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
// const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync('./db/schema');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const schemaFilenames = fs.readdirSync('./db/seeds');

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const addMovieInfo = async () => {
  console.log(chalk.cyan(`-> Loading film info ...`));
  const dbResponse = await db.query('SELECT * FROM tasks WHERE category_id = 1');
  //console.log(movies.rows[0].id);
  const shows = dbResponse.rows;
  for (const show of shows) {
    const name = show.task_name;
    console.log(show);
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
        throw new Error(`No results found for "${searchString}" on TMDb.`);
      }

      // Get the first result
      const movieInfo = data.results[0];
      //console.log(movieInfo);
      const updateObj = {
        task_description: movieInfo.overview,
        url_image: `https://www.themoviedb.org/t/p/w1280${movieInfo.poster_path}`
      }

      await editTask(show.id, updateObj);

    } catch (error) {
      console.error('Error fetching movie information:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }
}

const runResetDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

    await runSchemaFiles();
    await runSeedFiles();
    await addMovieInfo();
    process.exit();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    process.exit();
  }
};

runResetDB();
