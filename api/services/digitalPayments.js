const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');
const successResponses = require('../../strings/successMessages');
const errorResponses = require('../../strings/errorMessages');

const table = 'digital_payments';

const selectTable = `SELECT * FROM ${table}`;
const selectCount = `SELECT COUNT(*) FROM ${table}`;

async function getAll(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `${selectTable} LIMIT ${offset},${config.listPerPage}`,
  );
  const amountOfPages = await db.query(
    `${selectCount}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, totalPages: helper.calcTotalPages(amountOfPages) };

  return {
    data,
    meta,
  };
}

async function searchByUserAndDate(userId, date, page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `${selectTable} WHERE user_id = '${userId}' AND date LIKE '${date}' LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function searchByUser(userId, page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `${selectTable} WHERE user_id = '${userId}' LIMIT ${offset},${config.listPerPage}`,
  );
  const amountOfPages = await db.query(
    `${selectCount} WHERE user_id = '${userId}'`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, totalPages: helper.calcTotalPages(amountOfPages) };

  return {
    data,
    meta,
  };
}

async function searchByMonth(monthId, page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `${selectTable} WHERE month_id = '${monthId}' LIMIT ${offset},${config.listPerPage}`,
  );
  const amountOfPages = await db.query(
    `${selectCount} WHERE month_id = '${monthId}'`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, totalPages: helper.calcTotalPages(amountOfPages) };

  return {
    data,
    meta,
  };
}

async function searchByDate(date) {
  const rows = await db.query(
    `${selectTable} WHERE date LIKE '%${date}%'`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function createDigitalPayment(payment) {
  const result = await db.query(
    `INSERT INTO ${table}(user_id, user_name, date, month, month_id, total_profit, created_by)
    VALUES ('${payment.user_id}', '${payment.user_name}', '${payment.date}', '${payment.month}', '${payment.month_id}', '${payment.total_profit}', '${payment.created_by}')`,
  );

  let message = {
    status: 500,
    message: errorResponses.createDigitalPayment,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.createDigitalPayment,
    };
  }

  return { message };
}

async function updateDigitalPayment(id, payment) {
  const result = await db.query(
    `UPDATE ${table} SET id='${payment.id}',user_id='${payment.user_id}',user_name='${payment.user_name}',date='${payment.date}',month='${payment.month}',month_id='${payment.month_id}',total_profit='${payment.total_profit}', created_by='${payment.created_by}' WHERE id='${id}'`,
  );

  let message = {
    status: 500,
    message: errorResponses.createDigitalPayment,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.createDigitalPayment,
    };
  }

  return { message };
}

module.exports = {
  getAll,
  createDigitalPayment,
  updateDigitalPayment,
  searchByUser,
  searchByMonth,
  searchByDate,
  searchByUserAndDate,
};
