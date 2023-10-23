//const db = require('../connection');

const error = clientMsg => error => console.log(clientMsg, error.message);

//TO BE USED INTERNALLY ONLY! INjection vector
const getAll = data => data.rows;
const getOne = data => data.rows[0];

const insert = (table, data) => {
  const names = Object.keys(data);
  let valuePlaceholders = [];

  for (let i = 1; i <= names.length; i++) {
    valuePlaceholders.push(`$${i}`);
  }
  const nameString = names.join(', ');
  const valueString = valuePlaceholders.join(', ');

  return `INSERT INTO ${table} (${nameString}) VALUES (${valueString})`;

}

//ONLY ACCEPT $ positions
const where = (field, value) => `WHERE ${field} = ${value}`;
const and   = (field, value) => `AND ${field} = ${value}`;


module.exports = {error, getAll, getOne};

if (process.env.debug) {
  console.log(insert('table', {a: 1, b: 'string', c: false}));
}
