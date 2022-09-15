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
    `INSERT INTO schedule(hour)
    VALUES ('${schedule.hour}')`
  );

  let message = 'Error in creating schedule';

  if (result.affectedRows) {
    message = 'schedule created successfully';
  }

  return {message};
}

async function updateSchedule(id, schedule){
  const result = await db.query(
    `UPDATE schedule SET id=${schedule.id},hour=${schedule.hour} WHERE id='${id}'`
  );

  let message = 'Error in updating schedule';

  if (result.affectedRows) {
    message = 'schedule updated successfully';
  }

  return {message};
}

// ----- DAYS

async function getDays(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM days LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
        data,
        meta
    }
};

async function addDays(days){
    const result = await db.query(
      `INSERT INTO days(name)
      VALUES ('${days.name}')`
    );
  
    let message = 'Error in creating day';
  
    if (result.affectedRows) {
      message = 'day created successfully';
    }
  
    return {message};
  }

module.exports = {
    getSchedule,
    createSchedule,
    updateSchedule,
    getDays,
    addDays
}