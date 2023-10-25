//Authored by @mxtchjohnston
const db = require('../connection');
const { error, getAll, insert, update} = require('./util.js');

const getTasksByUser = (user_id) => {
  return db.query('SELECT * FROM tasks WHERE user_id = $1 AND is_complete = FALSE', [user_id])
    .then(getAll)
    .catch(error(`getTasksByUser ${user_id}`));
}

const createTask = (data) => {
  return insert(db, 'tasks', data)
    .catch(error('createTask'));
}

const editTask = (id, data) => {
  return update(db, 'tasks', id, data)
    .catch(error('editTask', id, data));
}

module.exports = {getTasksByUser, createTask, editTask};

if (process.env.debug) {
  getTasksByUser(1).then(data => console.log("1:", data));
  getTasksByUser(2).then(data => console.log("2:", data));
}
