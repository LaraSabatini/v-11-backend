const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

const table = 'working_hours';

const selectTable = `SELECT * FROM ${table}`;

async function getMultiple(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `${selectTable} LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getByWeek(weekId, page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `${selectTable} WHERE week_id = '%${weekId}%' LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(workingHour) {
  const result = await db.query(
    `INSERT INTO ${table}(date, user_id, user_name, working_hours_range, amount_of_hours_worked, week_id, created_by)
    VALUES ('${workingHour.date}','${workingHour.user_id}', '${workingHour.user_name}', '${workingHour.working_hours_range}', '${workingHour.amount_of_hours_worked}', '${workingHour.week_id}', '${workingHour.created_by}')`,
  );

  let message = 'Error in creating working hour';

  if (result.affectedRows) {
    message = 'working hour created successfully';
  }

  return { message };
}

async function update(id, workingHour) {
  const result = await db.query(
    `UPDATE ${table} SET id='${workingHour.id}',date='${workingHour.date}',user_id='${workingHour.user_id}',user_name='${workingHour.user_name}',working_hours_range='${workingHour.working_hours_range}',amount_of_hours_worked='${workingHour.amount_of_hours_worked}',week_id='${workingHour.week_id}', created_by='${workingHour.created_by}' WHERE id='${id}'`,
  );

  let message = 'Error in updating working hours';

  if (result.affectedRows) {
    message = 'working hours updated successfully';
  }

  return { message };
}

async function removeWorking(id) {
  const result = await db.query(
    `DELETE FROM ${table} WHERE id=${id}`,
  );

  let message = 'Error in deleting working hour';

  if (result.affectedRows) {
    message = 'Working hour deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  getByWeek,
  create,
  update,
  removeWorking,
};
