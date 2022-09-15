const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getSchedule(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM schedule LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
};

async function createSchedule(schedule){
  const result = await db.query(
    `INSERT INTO schedule(day_and_hour)
    VALUES ('${schedule.day_and_hour}')`
  );

  let message = 'Error in creating schedule';

  if (result.affectedRows) {
    message = 'schedule created successfully';
  }

  return {message};
}

async function updateSchedule(id, schedule){
  const result = await db.query(
    `UPDATE schedule SET id=${schedule.id},day_and_hour=${schedule.day_and_hour} WHERE id='${id}'`
  );

  let message = 'Error in updating schedule';

  if (result.affectedRows) {
    message = 'schedule updated successfully';
  }

  return {message};
}

module.exports = {
    getSchedule,
    createSchedule,
    updateSchedule,
}