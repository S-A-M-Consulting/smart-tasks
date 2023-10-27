// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const db = require('../db/connection');
const { delegateCategorize } = require('../api/external-api');
const { update } = require('../db/queries/util');

// PG connection setup
// const connectionString = process.env.DATABASE_URL ||
//   `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
// const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync("./db/schema");

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, "utf8");
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const schemaFilenames = fs.readdirSync("./db/seeds");

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, "utf8");
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const addExternalInfo = async () => {
  console.log(chalk.cyan(`-> Loading external info ...`));
  const dbResponse = await db.query('SELECT * FROM tasks');

  for (const result of dbResponse.rows) {
    const updatedTask = await delegateCategorize(result);
    console.log(updatedTask);
    await update(db, 'tasks', updatedTask.id, updatedTask);
  }
}

const runResetDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(
        `-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`
      );

    await runSchemaFiles();
    await runSeedFiles();
    await addExternalInfo();
    process.exit();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    process.exit();
  }
};

runResetDB();
