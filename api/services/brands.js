const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');
const successResponses = require('../../strings/successMessages');
const errorResponses = require('../../strings/errorMessages');

const table = 'brands';

async function getMultiple(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT id, name FROM ${table} LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(brand) {
  const result = await db.query(
    `INSERT INTO ${table}(name)
      VALUES ('${brand.name}')`,
  );

  let message = {
    status: 500,
    message: errorResponses.createBrand,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.createBrand,
    };
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
};
