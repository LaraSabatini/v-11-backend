const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

// get all
async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM digital_payments LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
};

// buscar x user_id && date
async function searchByUserAndDate(user_id, date, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM digital_payments WHERE user_id = '${user_id}' AND date LIKE '${date}' LIMIT ${offset},${config.listPerPage}`
    )
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
        data,
        meta
    }
};

// buscar x user_id
async function searchByUser(user_id, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM digital_payments WHERE user_id = '${user_id}' LIMIT ${offset},${config.listPerPage}`
    )
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
        data,
        meta
    }
};

// buscar x mes
async function searchByMonth(month_id, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM digital_payments WHERE month_id = '${month_id}' LIMIT ${offset},${config.listPerPage}`
    )
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
        data,
        meta
    }
};

// buscar x fecha
async function searchByDate(date){
    const rows = await db.query(
      `SELECT * FROM digital_payments WHERE date LIKE '%${date}%'`
    )
    const data = helper.emptyOrRows(rows);
  
    return {
        data,
    }
};

// crear
async function createDigitalPayment(payment){
  const result = await db.query(
    `INSERT INTO digital_payments(user_id, user_name, date, month, month_id, total_profit)
    VALUES ('${payment.user_id}', '${payment.user_name}', '${payment.date}', '${payment.month}', '${payment.month_id}', '${payment.total_profit}')`
  );

  let message = 'Error in creating payment';

  if (result.affectedRows) {
    message = 'payment created successfully';
  }

  return {message};
}

async function updateDigitalPayment(id, payment){
  const result = await db.query(
    `UPDATE digital_payments SET id='${payment.id}',user_id='${payment.user_id}',user_name='${payment.user_name}',date='${payment.date}',month='${payment.month}',month_id='${payment.month_id}',total_profit='${payment.total_profit}' WHERE id='${id}'`
  );

  let message = 'Error in updating payment';

  if (result.affectedRows) {
    message = 'payment updated successfully';
  }

  return {message};
}

module.exports = {
    getAll,
    createDigitalPayment,
    updateDigitalPayment,
    searchByUser,
    searchByMonth,
    searchByDate,
    searchByUserAndDate
}