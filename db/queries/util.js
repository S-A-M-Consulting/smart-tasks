const db = require('../connection');

const error = clientMsg => error => console.log(clientMsg, error.message);

//TO BE USED INTERNALLY ONLY! INjection vector
const getAll = data => data.rows;
const getOne = data => data.rows[0];

const _insert = (table, names) => {
  const valuePlaceholders = [];

  for (let i = 1; i <= names.length; i++) {
    valuePlaceholders.push(`$${i}`);
  }
  const nameString = names.join(', ');
  const valueString = valuePlaceholders.join(', ');

  return `INSERT INTO ${table} (${nameString}) VALUES (${valueString}) RETURNING *`;
}

const insert = (db, table, data) => {
  const statement = _insert(table, Object.keys(data));
  return db.query(statement, Object.values(data));
}

const update = (db, table, id, newData) => {
  const names = Object.keys(newData);
  const values = Object.values(newData);

  const writeStatements = keys => keys.map((elem, i) => `${elem} = $${i + 1}`).join(', ');

  const statement = `UPDATE ${table} SET ${writeStatements(names)} WHERE id = ${id}`;

  return db.query(statement, values);
}

//ONLY ACCEPT $ positions
const where = (field, value) => `WHERE ${field} = ${value}`;
const and   = (field, value) => `AND ${field} = ${value}`;


module.exports = {error, getAll, getOne, insert, update};

if (process.env.debug) {
  //console.log(insert(db, 'users', {name: 'jessie' , email: 'j@example.com', password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'}));
  console.log(update(db, 'users', 4, {name: 'Jessie Ware', email: 'jw@example.com'}));
}
