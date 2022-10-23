const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM partner_payments LIMIT ${offset},${config.listPerPage}`
    );
    const amountOfPages = await db.query(
      `SELECT COUNT(*) FROM partner_payments`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page, totalPages: Math.ceil(Object.values(amountOfPages[0])[0] / 25)};

    return {
        data,
        meta
    }
};

async function searchPurchasesByPartner(value, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM partner_payments WHERE partner_name LIKE '%${value}%' OR partner_last_name LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
    )
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
    `SELECT * FROM partner_payments WHERE date LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
};

async function getPurchaseByPartnerId(id){
  const rows = await db.query(
    `SELECT * FROM partner_payments WHERE partner_id = ${id}`
  )
  const data = helper.emptyOrRows(rows);

  return {
      data,
  }
};

async function create(partnerPayment){
  const result = await db.query(
    `INSERT INTO partner_payments(partner_id, partner_name, partner_last_name, combo, time_paid, time_paid_unit, payment_method_id, payment_method_name, price_paid, date, payment_expire_date)
    VALUES ('${partnerPayment.partner_id}','${partnerPayment.partner_name}', '${partnerPayment.partner_last_name}', '${partnerPayment.combo}', '${partnerPayment.time_paid}', '${partnerPayment.time_paid_unit}', '${partnerPayment.payment_method_id}', '${partnerPayment.payment_method_name}', '${partnerPayment.price_paid}', '${partnerPayment.date}', '${partnerPayment.payment_expire_date}')`
  );

  let message = 'Error in creating partnerPayment';

  if (result.affectedRows) {
    message = 'partnerPayment created successfully';
  }

  return {message};
}

async function update(id, partnerPayment){
  const result = await db.query(
    `UPDATE partner_payments SET id='${partnerPayment.id}',partner_id='${partnerPayment.partner_id}',partner_name='${partnerPayment.partner_name}',partner_last_name='${partnerPayment.partner_last_name}',combo='${partnerPayment.combo}',time_paid='${partnerPayment.time_paid}',time_paid_unit='${partnerPayment.time_paid_unit}', payment_method_id='${partnerPayment.payment_method_id}', payment_method_name='${partnerPayment.payment_method_name}', price_paid='${partnerPayment.price_paid}', date='${partnerPayment.date}', payment_expire_date='${partnerPayment.payment_expire_date}' WHERE id='${id}'`
  );

  let message = 'Error in updating payment';

  if (result.affectedRows) {
    message = 'payment updated successfully';
  }

  return {message};
}

async function getEarningsByDate(date){
  const rows = await db.query(
    `SELECT price_paid, payment_method_id, combo, time_paid, time_paid_unit FROM partner_payments WHERE date = '${date}'`
  )
  const data = helper.emptyOrRows(rows);

  return {
      data,
  }
};


module.exports = {
    getMultiple,
    searchPurchasesByPartner,
    create,
    update,
    getPurchaseByPartnerId,
    searchPurchasesByDate,
    getEarningsByDate
}