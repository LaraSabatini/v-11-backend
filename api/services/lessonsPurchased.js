
const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM lessons_purchased LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
};

async function getByWeek(week){
    const rows = await db.query(
      `SELECT * FROM lessons_purchased WHERE week_id = '${week}'`
    )
    const data = helper.emptyOrRows(rows);

    return {
        data,
    }
};

async function getByDateAndShift(date, shift){
  const rows = await db.query(
    `SELECT * FROM lessons_purchased WHERE lesson_date = '${date}' AND shift = '${shift}'`
  )
  const data = helper.emptyOrRows(rows);

  return {
      data,
  }
};

async function createPurchase(lessonPurchase){
    const result = await db.query(
      `INSERT INTO lessons_purchased(lesson_date, shift, partner_id, partner_name, partner_last_name, trainer_id, trainer_name, week_id, paid)
      VALUES ('${lessonPurchase.lesson_date}','${lessonPurchase.shift}', '${lessonPurchase.partner_id}', '${lessonPurchase.partner_name}', '${lessonPurchase.partner_last_name}', '${lessonPurchase.trainer_id}', '${lessonPurchase.trainer_id}', '${lessonPurchase.week_id}', '${lessonPurchase.paid}')`
    );
  
    let message = 'Error in creating lesson purchase';
  
    if (result.affectedRows) {
      message = 'Lesson purchase created successfully';
    }
  
    return {message};
};

async function updateLessonPurchase(id, lessonPurchase){
    const result = await db.query(
      `UPDATE lessons_purchased SET id='${lessonPurchase.id}',lesson_date='${lessonPurchase.lesson_date}',shift='${lessonPurchase.shift}',partner_id='${lessonPurchase.partner_id}',partner_name='${lessonPurchase.partner_name}',partner_last_name='${lessonPurchase.partner_last_name}',trainer_id='${lessonPurchase.trainer_id}',trainer_id='${lessonPurchase.trainer_id}', week_id='${lessonPurchase.week_id}', paid='${lessonPurchase.paid}' WHERE id='${id}'`
    );
  
    let message = 'Error in updating lesson purchase';
  
    if (result.affectedRows) {
      message = 'Lesson purchase updated successfully';
    }
  
    return {message};
}

module.exports = {
    getAll,
    getByWeek,
    createPurchase,
    updateLessonPurchase,
    getByDateAndShift
}