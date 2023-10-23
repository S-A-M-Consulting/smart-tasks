const db = require('../connection');
const { error, getAll, insert} = require('./util.js');

const getTasksByUser = (user_id) => {
  return db.query('SELECT * FROM tasks WHERE user_id = $1', [user_id])
    .then(getAll)
    .catch(error(`getTasksByUser ${user_id}`));
}

const createTask = (data) => {
  return insert(db, 'tasks', data)
    .catch(error('createTask'));
}

const editTask = (data) => {
  
}

module.exports = {getTasksByUser, createTask};

if (process.env.debug) {
  getTasksByUser(1).then(data => console.log("1:", data));
  getTasksByUser(2).then(data => console.log("2:", data));
}
