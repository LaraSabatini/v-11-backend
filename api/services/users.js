const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, email, password 
    FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
}

async function searchUser(name, password, page = 1){
  const rows = await db.query(
    // `SELECT * FROM users WHERE name = '%${name}%' AND password = '%${password}%' LIMIT ${offset},${config.listPerPage}`
    `SELECT * FROM users WHERE name = ${name} AND password = ${password}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
}

module.exports = {
  getMultiple,
  searchUser
}