const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');
const successResponses = require('../../../strings/successMessages.js');
const errorResponses = require('../../../strings/errorMessages.js');


async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, price_cash, price_mp, description
    FROM combos LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
}

async function update(id, combo){
    const result = await db.query(
      `UPDATE combos SET id='${combo.id}',name='${combo.name}',price_cash='${combo.price_cash}',price_mp='${combo.price_mp}', description='${combo.description}' WHERE id='${id}'`
    );
  
    let message = {
      message: errorResponses.editCombo,
      status: 500
    };
  
    if (result.affectedRows) {
      message = {
        message: successResponses.editCombo,
        status: 200
      };
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  update
}