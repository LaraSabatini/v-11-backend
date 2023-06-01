const db = require('./db');
const helper = require('../../helper');

async function getLessonScheduleByDay(day) {
  const rows = await db.query(
    `SELECT * FROM lessons_schedule WHERE date LIKE '${day}'`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function getLessonScheduleByWeekId(weekId) {
  const rows = await db.query(
    `SELECT * FROM lessons_schedule WHERE weekId = '${weekId}'`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function getByPurchaseId(id) {
  const rows = await db.query(
    `SELECT * FROM lesson_purchases WHERE id = '${id}'`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function createLessonSchedule(lessonDate) {
  const result = await db.query(
    `INSERT INTO lessons_schedule(date, hourRange, weekId, type, purchaseIds, assists)
    VALUES ('${lessonDate.date}', '${lessonDate.hourRange}', '${lessonDate.weekId}', '${lessonDate.type}', '${lessonDate.purchaseIds}', '${lessonDate.assists}')`,
  );

  let message = {
    status: 500,
    message: 'Internal server error',
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: 'Created successfully',
    };
  }

  return { message };
}

async function updateSchedule(data) {
  const result = await db.query(
    `UPDATE lessons_schedule SET id='${data.id}', date='${data.date}', weekId='${data.weekId}', hourRange='${data.hourRange}',type='${data.type}',purchaseIds='${data.purchaseIds}', assists='${data.assists}' WHERE id='${data.id}'`,
  );

  let message = {
    status: 500,
    message: 'Internal error',
    result,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: 'success',
    };
  }

  return { message };
}

async function createLessonPurchase(lesson) {
  const result = await db.query(
    `INSERT INTO lesson_purchases(clientId, paidDay, paymentMethod, pricePaid, paymentExpireDate, createdBy)
    VALUES ('${lesson.clientId}', '${lesson.paidDay}', '${lesson.paymentMethod}', '${lesson.pricePaid}', '${lesson.paymentExpireDate}', '${lesson.createdBy}')`,
  );

  let message = {
    status: 500,
    message: 'Internal server error',
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: 'Created successfully',
      id: result.insertId,
    };
  }

  return { message };
}

// Lesson types
async function createLessonType(data) {
  const result = await db.query(
    `INSERT INTO lesson_type(value, name, color, colorSecondary, unit_price_mp, unit_price_cash, four_price_mp, four_price_cash, eight_price_mp, eight_price_cash, quota, hours)
    VALUES ('${data.value}', '${data.name}', '${data.color}', '${data.colorSecondary}', '${data.unit_price_mp}', '${data.unit_price_cash}', '${data.four_price_mp}', '${data.four_price_cash}', '${data.eight_price_mp}', '${data.eight_price_cash}', '${data.quota}', '${data.hours}')`,
  );

  let message = {
    status: 500,
    message: 'Internal server error',
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: 'Created successfully',
    };
  }

  return { message };
}

async function getLessonTypes() {
  const rows = await db.query(
    'SELECT * FROM lesson_type',
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function updateLessonType(data) {
  const result = await db.query(
    `UPDATE lesson_type SET value='${data.value}', name='${data.name}', color='${data.color}', colorSecondary='${data.colorSecondary}', unit_price_mp='${data.unit_price_mp}', unit_price_cash='${data.unit_price_cash}', four_price_mp='${data.four_price_mp}', four_price_cash='${data.four_price_cash}', eight_price_mp='${data.eight_price_mp}', eight_price_cash='${data.eight_price_cash}', quota='${data.quota}', hours='${data.hours}' WHERE id='${data.id}'`,
  );

  let message = {
    status: 500,
    message: 'Internal server error',
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: 'success',
    };
  }

  return { message };
}

module.exports = {
  getLessonScheduleByDay,
  getByPurchaseId,
  createLessonSchedule,
  updateSchedule,
  createLessonPurchase,
  getLessonScheduleByWeekId,
  createLessonType,
  getLessonTypes,
  updateLessonType,
};
