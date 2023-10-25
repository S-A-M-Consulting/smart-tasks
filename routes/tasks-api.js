//Authored by @mxtchjohnston
/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const taskQueries = require('../db/queries/tasks');
const raw = require("body-parser/lib/types/raw");

const keywords = {
  'watch': 1,
  'eat': 2,
  'go to': 2,
  'read': 3,
  'buy': 4,
  'purchase': 4
};

const makeTask = function(rawTask) {
  const user_id = rawTask.user_id;
  const is_complete = false;

  const splitName = rawTask.task_name.split(' ');
  let category_id = keywords[splitName[0].toLowerCase()];
  category_id = category_id ? category_id : 0;

  const task_name = splitName.splice(2).join(' ');
  return {user_id, category_id, task_name, is_complete};
};

router.get("/", (req, res) => {
  //const user_id = req.session.user_id;
  const user_id = 1;
  taskQueries
    .getTasksByUser(user_id)
    .then(tasks => {
      res.send(tasks);
    });
});

router.post('/', (req, res) => {
  //const user_id = req.session.user_id;
  const newTask = makeTask(req.body);
  //newTask.user_id = user_id;

  taskQueries
    .createTask(newTask)
    .then(task => {
      console.log('Created Task:', task.rows)
      //res.send(task);
    })
    .catch(e => console.log(e.message));
});

router.patch('/:id', (req, res) => {
  const task_id = req.params.id;
  const changed = req.body;
  taskQueries
    .editTask(task_id, changed)
    .then(task => {
      console.log('changed task:', task_id, task);
      res.send(task);
    })
})

module.exports = router;
