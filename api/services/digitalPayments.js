const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');
const successResponses = require('../../../strings/successMessages.js');
const errorResponses = require('../../../strings/errorMessages.js');

async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM digital_payments LIMIT ${offset},${config.listPerPage}`
  );
  const amountOfPages = await db.query(
    `SELECT COUNT(*) FROM digital_payments`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page, totalPages: Math.ceil(Object.values(amountOfPages[0])[0] / 25)};

  return {
      data,
      meta
  }
};

async function searchByUserAndDate(user_id, date, page=1){
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

async function searchByUser(user_id, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM digital_payments WHERE user_id = '${user_id}' LIMIT ${offset},${config.listPerPage}`
    );
    const amountOfPages = await db.query(
      `SELECT COUNT(*) FROM digital_payments WHERE user_id = '${user_id}'`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page, totalPages: Math.ceil(Object.values(amountOfPages[0])[0] / 25)};
  
    return {
        data,
        meta
    }
};

async function searchByMonth(month_id, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM digital_payments WHERE month_id = '${month_id}' LIMIT ${offset},${config.listPerPage}`
    );
    const amountOfPages = await db.query(
      `SELECT COUNT(*) FROM digital_payments WHERE month_id = '${month_id}'`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page, totalPages: Math.ceil(Object.values(amountOfPages[0])[0] / 25)};

    return {
        data,
        meta
    }
};

async function searchByDate(date){
    const rows = await db.query(
      `SELECT * FROM digital_payments WHERE date LIKE '%${date}%'`
    )
    const data = helper.emptyOrRows(rows);
  
    return {
        data,
    }
};

async function createDigitalPayment(payment){
  const result = await db.query(
    `INSERT INTO digital_payments(user_id, user_name, date, month, month_id, total_profit, created_by)
    VALUES ('${payment.user_id}', '${payment.user_name}', '${payment.date}', '${payment.month}', '${payment.month_id}', '${payment.total_profit}', '${payment.created_by}')`
  );

  let message = {
    stauts: 500,
    message: errorResponses.createDigitalPayment
  }

  if (result.affectedRows) {
    message = {
      stauts: 200,
      message: successResponses.createDigitalPayment
    }
  }

  return {message};
}

async function updateDigitalPayment(id, payment){
  const result = await db.query(
    `UPDATE digital_payments SET id='${payment.id}',user_id='${payment.user_id}',user_name='${payment.user_name}',date='${payment.date}',month='${payment.month}',month_id='${payment.month_id}',total_profit='${payment.total_profit}', created_by='${payment.created_by}' WHERE id='${id}'`
  );

  let message = {
    stauts: 500,
    message: errorResponses.createDigitalPayment
  }

  if (result.affectedRows) {
    message = {
      stauts: 200,
      message: successResponses.createDigitalPayment
    }
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