const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM closed_till LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getByDate(date, page = 1){
     const offset = helper.getOffset(page, config.listPerPage);
     const rows = await db.query(
       `SELECT * FROM closed_till WHERE date LIKE '%${date}%' LIMIT ${offset},${config.listPerPage}`
     );
     const amountOfPages = await db.query(
      `SELECT COUNT(*) FROM closed_till WHERE date LIKE '%${date}%'`
    );
     const data = helper.emptyOrRows(rows);
     const meta = {page, totalPages: Math.ceil(Object.values(amountOfPages[0])[0] / 25)};

     return {
         data,
         meta
     }
}

async function create(tillData){
    const result = await db.query(
      `INSERT INTO closed_till(date, software_cash, software_mp, real_cash, real_mp, closed_by)
      VALUES ('${tillData.date}','${tillData.software_cash}','${tillData.software_mp}','${tillData.real_cash}','${tillData.real_mp}','${tillData.closed_by}')`
    );
  
    let message = 'Error in closing till';
  
    if (result.affectedRows) {
      message = 'Till closed successfully';
    }
  
    return {message};
}

async function update(id, tillData){
    const result = await db.query(
      `UPDATE closed_till SET id='${tillData.id}',date='${tillData.date}',software_cash='${tillData.software_cash}',software_mp='${tillData.software_mp}',real_cash='${tillData.real_cash}',real_mp='${tillData.real_mp}',closed_by='${tillData.closed_by}' WHERE id='${id}'`
    );
  
    let message = 'Error in updating till';
  
    if (result.affectedRows) {
      message = 'Till updated successfully';
    }
  
    return {message};
}

module.exports = {
    getMultiple,
    getByDate,
    create,
    update
}