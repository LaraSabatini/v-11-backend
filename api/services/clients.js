const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM clients LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
};

async function searchPartner(value, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM clients WHERE name LIKE '%${value}%' OR identification_number LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
    )
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
        data,
        meta
    }
};

async function filterStudents(value, page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM clients WHERE hours_and_days IS NOT NULL LIMIT ${offset},${config.listPerPage}`
    )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
};

async function filterFreePass(value, page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM clients WHERE free_pass = '${value}' LIMIT ${offset},${config.listPerPage}`
  )
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
};

async function create(partner){
  const result = await db.query(
    `INSERT INTO clients(name, last_name, identification_number, birth_date, email, phone, subs, membership_start_date, created_by, free_pass, hours_and_days)
    VALUES ('${partner.name}','${partner.last_name}', '${partner.identification_number}', '${partner.birth_date}', '${partner.email}', '${partner.phone}', '${partner.subs}', '${partner.membership_start_date}', '${partner.created_by}', '${partner.free_pass}', '${partner.hours_and_days}')`
  );

  let message = 'Error in creating partner';

  if (result.affectedRows) {
    message = 'partner created successfully';
    partnerId = result.insertId
  }

  return {message, partnerId};
}

async function update(id, partner){
  const result = await db.query(
    `UPDATE clients SET id='${partner.id}',name='${partner.name}',last_name='${partner.last_name}',identification_number='${partner.identification_number}',birth_date='${partner.birth_date}',email='${partner.email}',phone='${partner.phone}',subs='${partner.subs}',membership_start_date='${partner.membership_start_date}',created_by='${partner.created_by}',free_pass='${partner.free_pass}',days_and_hours='${partner.days_and_hours}' WHERE id='${id}'`
  );

  let message = 'Error in updating partner';

  if (result.affectedRows) {
    message = 'partner updated successfully';
  }

  return {message};
}

async function removePartner(id){
  const result = await db.query(
    `DELETE FROM clients WHERE id=${id}`
  );

  let message = 'Error in deleting product';

  if (result.affectedRows) {
    message = 'Product deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  searchPartner,
  filterStudents,
  filterFreePass,
  create,
  update,
  removePartner
}