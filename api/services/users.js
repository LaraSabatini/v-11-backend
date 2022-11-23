const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

const table = 'users';

async function getMultiple(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT id, name, email, permissions, admin
    FROM ${table} LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function searchUser(name, password, page = 1) {
  const rows = await db.query(
    `SELECT * FROM ${table} WHERE name = ${name} AND password = ${password}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

module.exports = {
  getMultiple,
  searchUser,
};
