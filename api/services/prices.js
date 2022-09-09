const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, price_cash, price_mp
    FROM prices LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
}

async function update(id, price){
    const result = await db.query(
      `UPDATE prices SET id='${price.id}',name='${price.name}',price_cash='${price.price_cash}', price_mp='${price.price_mp}' WHERE id='${id}'`
    );
  
    let message = 'Error in updating price';
  
    if (result.affectedRows) {
      message = 'price updated successfully';
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  update
}