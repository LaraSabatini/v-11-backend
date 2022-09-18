const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM partner_payments LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

async function searchPurchasesByPartner(value, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM partner_payments WHERE partner_name LIKE '%${value}%'  LIMIT ${offset},${config.listPerPage}`
      `SELECT * FROM partners WHERE name LIKE '%${value}%' OR identification_number LIKE '%${value}%' OR last_name LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
    )
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

async function create(partnerPayment){
  const result = await db.query(
    `INSERT INTO partner_payments(partner_id, partner_name, partner_last_name, combo, time_paid, time_paid_unit, clases_paid, payment_method_id, payment_method_name, price_paid, date, payment_expire_date, days_and_hours)
    VALUES ('${partnerPayment.partner_id}','${partnerPayment.partner_name}', '${partnerPayment.partner_last_name}', '${partnerPayment.combo}', '${partnerPayment.time_paid}', '${partnerPayment.time_paid_unit}', '${partnerPayment.clases_paid}', '${partnerPayment.payment_method_id}', '${partnerPayment.payment_method_name}', '${partnerPayment.price_paid}', '${partnerPayment.date}', '${partnerPayment.payment_expire_date}', '${partnerPayment.days_and_hours}')`
  );

  let message = 'Error in creating partnerPayment';

  if (result.affectedRows) {
    message = 'partnerPayment created successfully';
  }

  return {message};
}

async function update(id, partnerPayment){
  const result = await db.query(
    `UPDATE partner_payments SET id='${partnerPayment.id}',partner_id='${partnerPayment.partner_id}',partner_name='${partnerPayment.partner_name}',partner_last_name='${partnerPayment.partner_last_name}',combo='${partnerPayment.combo}',time_paid='${partnerPayment.time_paid}',time_paid_unit='${partnerPayment.time_paid_unit}',clases_paid='${partnerPayment.clases_paid}', payment_method_id='${partnerPayment.payment_method_id}', payment_method_name='${partnerPayment.payment_method_name}', price_paid='${partnerPayment.price_paid}', date='${partnerPayment.date}', payment_expire_date='${partnerPayment.payment_expire_date}', days_and_hours='${partnerPayment.days_and_hours}' WHERE id='${id}'`
  );

  let message = 'Error in updating payment';

  if (result.affectedRows) {
    message = 'payment updated successfully';
  }

  return {message};
}

module.exports = {
    getMultiple,
    searchPurchasesByPartner,
    create,
    update
}