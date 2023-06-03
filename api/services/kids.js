const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

const table = 'minor_partners';

const selectTable = `SELECT * FROM ${table}`;
const selectCount = `SELECT COUNT(*) FROM ${table}`;

async function getMultiple(page = 1) {
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

async function searchPartner(value, page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `${selectTable} WHERE name LIKE '%${value}%' OR identification LIKE '%${value}%' OR last_name LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(partner) {
  const result = await db.query(
    `INSERT INTO ${table}(name, last_name, identification, birthdate, tutor_name, phone, tutor_last_name, tutor_identification, member_since)
      VALUES ('${partner.name}','${partner.last_name}', '${partner.identification}', '${partner.birthdate}', '${partner.tutor_name}', '${partner.phone}', '${partner.tutor_last_name}', '${partner.tutor_identification}', '${partner.member_since}')`,
  );

  let message = {
    status: 500,
    message: 'Internal server error',
  };
  const partnerId = 0;

  if (result.affectedRows) {
    message = {
      status: 200,
      message: 'Success',
      partnerId: result.insertId,
    };
  }

  return { message, partnerId };
}

async function update(id, partner) {
  const result = await db.query(
    `UPDATE ${table} SET id='${partner.id}',name='${partner.name}',last_name='${partner.last_name}',identification='${partner.identification}',birthdate='${partner.birthdate}',phone='${partner.phone}',tutor_name='${partner.tutor_name}',tutor_last_name='${partner.tutor_last_name}',tutor_identification='${partner.tutor_identification}',member_since='${partner.member_since}' WHERE id='${id}'`,
  );

  let message = {
    status: 500,
    message: 'Internal server error',

  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: 'Success',
    };
  }

  return { message };
}

async function getKidById(value) {
  const rows = await db.query(
    `${selectTable} WHERE id = '${value}'`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

module.exports = {
  getMultiple,
  searchPartner,
  create,
  update,
  getKidById,
};
