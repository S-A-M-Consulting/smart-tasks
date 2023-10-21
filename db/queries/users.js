const db = require('../connection');

const error = clientMsg => error => console.log(clientMsg, error.message);

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    })
    .catch(error('getUsers'));
};

const getTasksByUser = (user_id) => {
  return db.query('SELECT * FROM tasks WHERE user_id = $1', [user_id])
    .then(data => data.rows)
    .catch(error(`getTasksByUser ${user_id}`));
}
module.exports = { getUsers };
