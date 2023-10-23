//Authored by @mxtchjohnston
const db = require('../connection');
const { error, getOne, getAll} = require('./util.js');


const getUsers = () => {
  return db.query('SELECT * FROM users')
    .then(getAll)
    .catch(error('getUsers'));
};

const getUserById = user_id => {
  return db.query('SELECT * FROM users WHERE id = $1', [user_id])
    .then(getOne)
    .catch(error('getUserById'));
}

if (process.env.debug) {
  getUsers().then(data => console.log("1:", data));
  getUserById(2).then(data => console.log("2:", data));
}

module.exports = { getUsers, getUserById };
