const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM partners LIMIT ${offset},${config.listPerPage}`
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
      `SELECT * FROM partners WHERE name LIKE '%${value}%' OR identification_number LIKE '%${value}%' OR last_name LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
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
    `SELECT * FROM partners WHERE is_student = '${value}' LIMIT ${offset},${config.listPerPage}`
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
    `SELECT * FROM partners WHERE free_pass = '${value}' LIMIT ${offset},${config.listPerPage}`
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
    `INSERT INTO partners(name, last_name, identification_number, birth_date, email, phone, membership_start_date, created_by, free_pass, subs, is_student)
    VALUES ('${partner.name}','${partner.last_name}', '${partner.identification_number}', '${partner.birth_date}', '${partner.email}', '${partner.phone}', '${partner.membership_start_date}', '${partner.created_by}', '${partner.free_pass}', '${partner.subs}', '${partner.is_student}')`
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
    `UPDATE partners SET id='${partner.id}',name='${partner.name}',last_name='${partner.last_name}',identification_number='${partner.identification_number}',birth_date='${partner.birth_date}',email='${partner.email}',phone='${partner.phone}',membership_start_date='${partner.membership_start_date}',created_by='${partner.created_by}',free_pass='${partner.free_pass}',is_student='${partner.is_student}',subs='${partner.subs}' WHERE id='${id}'`
  );

  let message = 'Error in updating partner';

  if (result.affectedRows) {
    message = 'partner updated successfully';
  }

  return {message};
}

async function removePartner(id){
  const result = await db.query(
    `DELETE FROM partners WHERE id=${id}`
  );

  let message = 'Error in deleting product';

  if (result.affectedRows) {
    message = 'Product deleted successfully';
  }

  return {message};
};

async function getPartnerById(value){
  const rows = await db.query(
    `SELECT * FROM partners WHERE id = '${value}'`
  )
  const data = helper.emptyOrRows(rows);

  return {
      data,
  }
};

module.exports = {
  getMultiple,
  searchPartner,
  filterStudents,
  filterFreePass,
  create,
  update,
  removePartner,
  getPartnerById
}