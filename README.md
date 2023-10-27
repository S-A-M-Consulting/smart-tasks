#Smart Task - Lighthouse Labs Midterm Project

Smart Task is an auto-categorizing task list app. We have built the app to categorize user input into four categories: movies, restaurants, books, and products. Smart Task uses external API calls to provide the user with an image, description, and link to their task. This project was built by Mitch Johnston, Yiqun (Albert) Huang, and Steve Fraser.


## Getting Started

1. To get started create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `smart` 
  - password: `task` 
  - database: `smart_task`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/` and enjoy.

## Features

- Use the keywords watch, eat, read, and buy to enter your task (example: "watch The Matrix")


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
