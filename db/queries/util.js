const db = require('../connection');

const error = clientMsg => error => console.log(clientMsg, error.message);

//TO BE USED INTERNALLY ONLY! INjection vector
const getAll = data => data.rows;
const getOne = data => data.rows[0];

//ONLY ACCEPT $ positions
const where = (field, value) => `WHERE ${field} = ${value}`;
const and   = (field, value) => `AND ${field} = ${value}`;


module.exports = {error, getAll, getOne};

