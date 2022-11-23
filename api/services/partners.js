const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');
const successResponses = require('../../strings/successMessages');
const errorResponses = require('../../strings/errorMessages');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT * FROM partners LIMIT ${offset},${config.listPerPage}`,
  );
  const amountOfPages = await db.query(
    'SELECT COUNT(*) FROM partners',
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
    `SELECT * FROM partners WHERE name LIKE '%${value}%' OR identification_number LIKE '%${value}%' OR last_name LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function filterStudents(value, page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT * FROM partners WHERE is_student = '${value}' LIMIT ${offset},${config.listPerPage}`,
  );
  const amountOfPages = await db.query(
    `SELECT COUNT(*) FROM partners WHERE is_student LIKE '${value}'`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, totalPages: helper.calcTotalPages(amountOfPages) };

  return {
    data,
    meta,
  };
}

async function filterFreePass(value, page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT * FROM partners WHERE free_pass = '${value}' LIMIT ${offset},${config.listPerPage}`,
  );
  const amountOfPages = await db.query(
    `SELECT COUNT(*) FROM partners WHERE free_pass LIKE '${value}'`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, totalPages: helper.calcTotalPages(amountOfPages) };

  return {
    data,
    meta,
  };
}

async function create(partner) {
  const result = await db.query(
    `INSERT INTO partners(name, last_name, identification_number, birth_date, email, phone, membership_start_date, created_by, free_pass, subs, is_student)
    VALUES ('${partner.name}','${partner.last_name}', '${partner.identification_number}', '${partner.birth_date}', '${partner.email}', '${partner.phone}', '${partner.membership_start_date}', '${partner.created_by}', '${partner.free_pass}', '${partner.subs}', '${partner.is_student}')`,
  );

  let message = {
    status: 500,
    message: errorResponses.createPartner,
  };
  const partnerId = 0;

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.createPartner,
      partnerId: result.insertId,
    };
  }

  return { message, partnerId };
}

async function update(id, partner) {
  const result = await db.query(
    `UPDATE partners SET id='${partner.id}',name='${partner.name}',last_name='${partner.last_name}',identification_number='${partner.identification_number}',birth_date='${partner.birth_date}',email='${partner.email}',phone='${partner.phone}',membership_start_date='${partner.membership_start_date}',created_by='${partner.created_by}',free_pass='${partner.free_pass}',is_student='${partner.is_student}',subs='${partner.subs}' WHERE id='${id}'`,
  );

  let message = {
    status: 500,
    message: errorResponses.editPartner,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.editPartner,
    };
  }

  return { message };
}

async function removePartner(id) {
  const result = await db.query(
    `DELETE FROM partners WHERE id=${id}`,
  );

  let message = {
    status: 500,
    message: errorResponses.deletePartner,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.deletePartner,
    };
  }

  return { message };
}

async function getPartnerById(value) {
  const rows = await db.query(
    `SELECT * FROM partners WHERE id = '${value}'`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

module.exports = {
  getMultiple,
  searchPartner,
  filterStudents,
  filterFreePass,
  create,
  update,
  removePartner,
  getPartnerById,
};
