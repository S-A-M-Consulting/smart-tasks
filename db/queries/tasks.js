const db = require('../connection');
const { error, getAll} = require('./util.js');

const getTasksByUser = (user_id) => {
  return db.query('SELECT * FROM tasks WHERE user_id = $1', [user_id])
    .then(getAll)
    .catch(error(`getTasksByUser ${user_id}`));
}

if (process.env.debug) {
  getTasksByUser(1).then(data => console.log("1:", data));
  getTasksByUser(2).then(data => console.log("2:", data));
}
