const db = require('../connection');

const error = clientMsg => error => console.log(clientMsg, error.message);

//TO BE USED INTERNALLY ONLY! INjection vector
const getAll = data => data.rows;
const getOne = data => data.rows[0];

const _insert = (table, data) => {
  const names = Object.keys(data);
  let valuePlaceholders = [];

  for (let i = 1; i <= names.length; i++) {
    valuePlaceholders.push(`$${i}`);
  }
  const nameString = names.join(', ');
  const valueString = valuePlaceholders.join(', ');

  return `INSERT INTO ${table} (${nameString}) VALUES (${valueString}) RETURNING *`;

}

const insert = (db, table, data) => {
  const statement = _insert(table, data);
  return db.query(statement, Object.values(data));
}

//ONLY ACCEPT $ positions
const where = (field, value) => `WHERE ${field} = ${value}`;
const and   = (field, value) => `AND ${field} = ${value}`;


module.exports = {error, getAll, getOne};

if (process.env.debug) {
  console.log(insert(db, 'users', {name: 'Mitch' , email: 'mij@example.com', password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'}));
}
