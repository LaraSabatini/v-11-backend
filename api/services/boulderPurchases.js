const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getAll(page=1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM boulder_purchases LIMIT ${offset},${config.listPerPage}`
  );
  const amountOfPages = await db.query(
    `SELECT COUNT(*) FROM boulder_purchases`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page, totalPages: Math.ceil(Object.values(amountOfPages[0])[0] / 25)};

  return {
      data,
      meta
  }
};

async function searchPurchasesByDate(value, page = 1){
   const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM boulder_purchases WHERE date LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
    );
    const amountOfPages = await db.query(
      `SELECT COUNT(*) FROM boulder_purchases WHERE date LIKE '${value}'`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page, totalPages: Math.ceil(Object.values(amountOfPages[0])[0] / 25)};
  
    return {
        data,
        meta
    }
};

async function create(bouderPayment){
    const result = await db.query(
      `INSERT INTO boulder_purchases(id, date, item_id, item_name, amount_of_items, profit, payment_method_id, created_by)
      VALUES ('${bouderPayment.id}','${bouderPayment.date}', '${bouderPayment.item_id}', '${bouderPayment.item_name}', '${bouderPayment.amount_of_items}', '${bouderPayment.profit}', '${bouderPayment.payment_method_id}', '${bouderPayment.created_by}')`
    );
  
    let message = 'Error in creating bouderPayment';
  
    if (result.affectedRows) {
      message = 'bouderPayment created successfully';
    }
  
    return {message};
}

module.exports = {
    searchPurchasesByDate,
    create,
    getAll
}