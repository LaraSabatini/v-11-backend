const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM boulder_payments LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

async function create(partnerPayment){
  const result = await db.query(
    `INSERT INTO boulder_payments(partner_id, combo, time_paid, time_paid_unit, clases_paid, payment_method_id, price_paid, date)
    VALUES ('${partnerPayment.partner_id}','${partnerPayment.combo}', '${partnerPayment.time_paid}', '${partnerPayment.time_paid_unit}', '${partnerPayment.clases_paid}', '${partnerPayment.payment_method_id}', '${partnerPayment.price_paid}', '${partnerPayment.date}')`
  );

  let message = 'Error in creating partnerPayment';

  if (result.affectedRows) {
    message = 'partnerPayment created successfully';
  }

  return {message};
}

module.exports = {
    getMultiple,
    create,
}