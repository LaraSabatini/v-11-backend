const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

const table = 'trainers';

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

async function searchTrainer(value, page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `${selectTable} WHERE name LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(trainer) {
  const result = await db.query(
    `INSERT INTO ${table}(name, last_name, min_students, max_students)
    VALUES ('${trainer.name}','${trainer.last_name}','${trainer.min_students}','${trainer.max_students}')`,
  );

  let message = 'Error in creating trainer';

  if (result.affectedRows) {
    message = 'trainer created successfully';
  }

  return { message };
}

async function update(id, trainer) {
  const result = await db.query(
    `UPDATE ${table} SET id=${trainer.id},name=${trainer.name},last_name=${trainer.last_name},min_students=${trainer.min_students},max_students=${trainer.max_students} WHERE id='${id}'`,
  );

  let message = 'Error in updating trainer';

  if (result.affectedRows) {
    message = 'trainer updated successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  searchTrainer,
  create,
  update,
};
