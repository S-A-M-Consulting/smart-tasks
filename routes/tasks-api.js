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
  const newTask = req.body;
  //newTask.user_id = user_id;

  taskQueries
    .createTask(newTask)
    .then(task => {
      console.log('Created Task:', task.rows)
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
