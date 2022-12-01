const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');
const successResponses = require('../../strings/successMessages');
const errorResponses = require('../../strings/errorMessages');

const table = 'lessons_purchased';

const selectTable = `SELECT * FROM ${table}`;

async function getAll(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `${selectTable} LIMIT ${offset},${config.listPerPage}`,
  );
  const amountOfPages = await db.query(
    `SELECT COUNT(*) FROM ${table}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, totalPages: helper.calcTotalPages(amountOfPages) };

  return {
    data,
    meta,
  };
}

async function getByWeek(week) {
  const rows = await db.query(
    `${selectTable} WHERE week_id = '${week}'`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function getByPartnerIdAndPaid(id, paid) {
  const rows = await db.query(
    `${selectTable} WHERE partner_id = '${id}' AND paid = '${paid}'`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function getByDateAndShift(date, shift) {
  const rows = await db.query(
    `${selectTable} WHERE lesson_date LIKE '${date}' AND shift = '${shift}'`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function createPurchase(lessonPurchase) {
  const result = await db.query(
    `INSERT INTO ${table}(lesson_date, shift, partner_id, partner_name, partner_last_name, trainer_id, trainer_name, week_id, paid, day_id, final_price, payment_method_id, paid_day, payment_expire_date, created_by)
      VALUES ('${lessonPurchase.lesson_date}','${lessonPurchase.shift}', '${lessonPurchase.partner_id}', '${lessonPurchase.partner_name}', '${lessonPurchase.partner_last_name}', '${lessonPurchase.trainer_id}', '${lessonPurchase.trainer_name}', '${lessonPurchase.week_id}', '${lessonPurchase.paid}', '${lessonPurchase.day_id}', '${lessonPurchase.final_price}', '${lessonPurchase.payment_method_id}', '${lessonPurchase.paid_day}', '${lessonPurchase.payment_expire_date}', '${lessonPurchase.created_by}')`,
  );

  let message = {
    status: 500,
    message: errorResponses.createLessonPurchase,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.createLessonPurchase,
    };
  }

  return { message };
}

async function updateLessonPurchase(id, lessonPurchase) {
  const result = await db.query(
    `UPDATE ${table} SET id='${lessonPurchase.id}',lesson_date='${lessonPurchase.lesson_date}',shift='${lessonPurchase.shift}',partner_id='${lessonPurchase.partner_id}',partner_name='${lessonPurchase.partner_name}',partner_last_name='${lessonPurchase.partner_last_name}',trainer_id='${lessonPurchase.trainer_id}',trainer_id='${lessonPurchase.trainer_name}', week_id='${lessonPurchase.week_id}', paid='${lessonPurchase.paid}', day_id='${lessonPurchase.day_id}', final_price='${lessonPurchase.final_price}', payment_method_id='${lessonPurchase.payment_method_id}', paid_day='${lessonPurchase.paid_day}', payment_expire_date='${lessonPurchase.payment_expire_date}', created_by='${lessonPurchase.created_by}' WHERE id='${id}'`,
  );

  let message = {
    status: 500,
    message: errorResponses.createLessonPurchase,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.createLessonPurchase,
    };
  }

  return { message };
}

async function removeLessonPur(id) {
  const result = await db.query(
    `DELETE FROM ${table} WHERE id=${id}`,
  );

  let message = {
    status: 500,
    message: errorResponses.deleteLesson,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.deleteLesson,
    };
  }
  return { message };
}

module.exports = {
  getAll,
  getByWeek,
  createPurchase,
  updateLessonPurchase,
  getByDateAndShift,
  getByPartnerIdAndPaid,
  removeLessonPur,
};
