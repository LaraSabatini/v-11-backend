const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');
const successResponses = require('../../strings/successMessages');
const errorResponses = require('../../strings/errorMessages');

const table = 'prices';

async function getMultiple(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT id, name, price_cash, price_mp
    FROM ${table} LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function update(id, price) {
  const result = await db.query(
    `UPDATE ${table} SET id='${price.id}',name='${price.name}',
        price_cash='${price.price_cash}', price_mp='${price.price_mp}' WHERE id='${id}'`,
  );

  let message = {
    status: 500,
    message: errorResponses.updatePrices,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.updatePrices,
    };
  }

  return { message };
}

module.exports = {
  getMultiple,
  update,
};
