/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/logout', (req, res) => {
  req.session.user_id = null;
  res.send({});
});

router.post('/login/:id', (req, res) => {
  const id = req.params.id;
  userQueries.getUserById(id)
    .then(user => {
      req.session.user_id = user.id;
      res.send({
        user: {
          name: user.name,
          email: user.email,
          user_id: user.id
        }
      });
    })
})

module.exports = router;
