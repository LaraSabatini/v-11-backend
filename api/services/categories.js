const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT id, name FROM categories LIMIT ${offset},${config.listPerPage}`,
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
};
