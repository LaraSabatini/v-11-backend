const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, last_name, identification_number, birth_date, email, membership_start_date, membership_time_paid, payment_expire_date, payment_is_active, created_by, trainer_id, free_pass 
    FROM partners LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
}

// async function searchPartner(value, page = 1){
//     const offset = helper.getOffset(page, config.listPerPage);
//     const rows = await db.query(
//       `SELECT * FROM partners WHERE name LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
//     )
//     const data = helper.emptyOrRows(rows);
//     const meta = {page};
  
//     return {
//         data,
//         meta
//     }
// }

// async function createPartner(partner){
//   const result = await db.query(
//     `INSERT INTO partnerts(name, last_name, identification_number, birth_date, email, membership_start_date, membership_time_paid, payment_expire_date, payment_is_active, created_by, trainer_id, free_pass)
//     VALUES ('${partner.name}','${partner.last_name}', '${partner.identification_number}', '${partner.birth_date}', '${partner.email}', '${partner.membership_start_date}', '${partner.membership_time_paid}', '${partner.payment_expire_date}', '${partner.payment_is_active}, '${partner.created_by}', '${partner.trainer_id}', '${partner.free_pass}')`
//   );
//   let message = 'Error in creating partner';

//   if (result.affectedRows) {
//     message = 'partner created successfully';
//   }

//   return {message};
// }

module.exports = {
  getMultiple,
  // searchPartner,
  // createPartner
}