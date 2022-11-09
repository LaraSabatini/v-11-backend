const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM annotations LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

async function getToDos(page = 1){
     const offset = helper.getOffset(page, config.listPerPage);
     const rows = await db.query(
       `SELECT * FROM annotations WHERE type LIKE '%${todo}%' LIMIT ${offset},${config.listPerPage}`
     )
     const data = helper.emptyOrRows(rows);
     const meta = {page};

     return {
         data,
         meta
     }
};

async function getToDosByDone(page = 1, done){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM annotations WHERE type LIKE '%${todo}%' AND done = '${done}' LIMIT ${offset},${config.listPerPage}`
    )
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

 async function getNotes(page = 1, order){
     const offset = helper.getOffset(page, config.listPerPage);
     const rows = await db.query(
       `SELECT * FROM annotations WHERE type LIKE '%${note}%' ORDER BY id ${order} LIMIT ${offset},${config.listPerPage}`
     )
     const data = helper.emptyOrRows(rows);
     const meta = {page};

     return {
         data,
         meta
     }
};

async function create(annotation){
    const result = await db.query(
      `INSERT INTO annotations(title, description, creation_date, type, done, done_date, created_by, done_by)
      VALUES ('${annotation.title}','${annotation.description}','${annotation.creation_date}','${annotation.type}','${annotation.done}','${annotation.done_date}','${annotation.created_by}','${annotation.done_by}')`
    );
  
    let message = 'Error in creating annotation';
  
    if (result.affectedRows) {
      message = 'Annotation created successfully';
    }
  
    return {message};
};

async function deleteAnnotation(id){
    const result = await db.query(
      `DELETE FROM annotations WHERE id=${id}`
    );
  
    let message = 'Error in deleting annotation';
  
    if (result.affectedRows) {
      message = 'Annotation deleted successfully';
    }
  
    return {message};
};

async function update(id, annotation){
    const result = await db.query(
      `UPDATE annotations SET id='${annotation.id}',title='${annotation.title}',description='${annotation.description}',creation_date='${annotation.creation_date}',type='${annotation.type}',done='${annotation.done}',done_date='${annotation.done_date}',created_by='${annotation.created_by}',done_by='${annotation.done_by}' WHERE id='${id}'`
    );
  
    let message = 'Error in updating annotation';
  
    if (result.affectedRows) {
      message = 'Annotation updated successfully';
    }
  
    return {message};
}

module.exports = {
    getMultiple,
    getToDos,
    getNotes,
    create,
    deleteAnnotation,
    update,
    getToDosByDone
}