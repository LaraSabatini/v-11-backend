const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM purchases LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

async function searchPurchasesByDate(value, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM purchases WHERE date LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
    )
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

async function filterByProduct(value, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM purchases WHERE item_id = '${value}' LIMIT ${offset},${config.listPerPage}`
     )
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
        data,
        meta
    }
};

async function create(purchase){
  const result = await db.query(
    `INSERT INTO purchases(date, item_id, amount_of_items, cost, margin, final_price)
    VALUES ('${purchase.date}','${purchase.item_id}', '${purchase.amount_of_items}', '${purchase.cost}', '${purchase.margin}', '${purchase.final_price}')`
  );

  let message = 'Error in creating purchase';

  if (result.affectedRows) {
    message = 'purchase created successfully';
  }

  return {message};
}

module.exports = {
    getMultiple,
    searchPurchasesByDate,
    filterByProduct,
    create
}