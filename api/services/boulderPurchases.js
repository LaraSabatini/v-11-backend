const db = require('./db');
const helper = require('../../helper');

async function searchPurchasesByDate(value){
    const rows = await db.query(
      `SELECT * FROM boulder_purchases WHERE date LIKE '%${value}%'`
    )
    const data = helper.emptyOrRows(rows);
  
    return {
        data,
    }
};

async function create(bouderPayment){
    const result = await db.query(
      `INSERT INTO boulder_purchases(id, date, item_id, item_name, amount_of_items, profit, payment_method_id)
      VALUES ('${bouderPayment.id}','${bouderPayment.date}', '${bouderPayment.item_id}', '${bouderPayment.item_name}', '${bouderPayment.amount_of_items}', '${bouderPayment.profit}', '${bouderPayment.payment_method_id}')`
    );
  
    let message = 'Error in creating bouderPayment';
  
    if (result.affectedRows) {
      message = 'bouderPayment created successfully';
    }
  
    return {message};
  }

module.exports = {
    searchPurchasesByDate,
    create
}