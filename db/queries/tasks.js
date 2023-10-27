//Authored by @mxtchjohnston
const db = require('../connection');
const { error, getAll, insert, update, debug, getOne} = require('./util.js');

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

const getTaskById = (task_id) => {
  return db.query('SELECT * FROM tasks WHERE id = $1', [task_id])
    .then(getOne)
    .catch(error('getTaskById'));
}

module.exports = {getTasksByUser, createTask, editTask, getTaskById};

