const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, email, password 
    FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
      data,
      meta
  }
}

// async function getMultiple(page = 1){
//   const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(
//     `SELECT id, name, producer, price, cost, margin, units, category, sub_category, active 
//     FROM products LIMIT ${offset},${config.listPerPage}`
//   );
//   const data = helper.emptyOrRows(rows);
//   const meta = {page};

//   return {
//       data,
//       meta
//   }
// }

// async function create(product){
//   const result = await db.query(
//     `INSERT INTO products(name, producer, price, cost, margin, units, category, sub_category, active)
//     VALUES ('${product.name}','${product.producer}', '${product.price}', '${product.cost}', '${product.margin}', '${product.units}', '${product.category}', '${product.sub_category}', '${product.active}')`
//   );

//   let message = 'Error in creating product';

//   if (result.affectedRows) {
//     message = 'Product created successfully';
//   }

//   return {message};
// }

// async function update(id, product){
//     const result = await db.query(
//       `UPDATE products SET id='${id}',name='${product.name}',producer='${product.producer}',price='${product.price}',cost='${product.cost}',margin='${product.margin}',units='${product.units}',category='${product.category}',sub_category='${product.sub_category}',active='${product.active}' WHERE id='${id}'`
//     );
  
//     let message = 'Error in updating product';
  
//     if (result.affectedRows) {
//       message = 'Product updated successfully';
//     }
  
//     return {message};
// }

// async function remove(id){
//     const result = await db.query(
//       `DELETE FROM products WHERE id=${id}`
//     );
  
//     let message = 'Error in deleting product';
  
//     if (result.affectedRows) {
//       message = 'Product deleted successfully';
//     }
  
//     return {message};
// }

// async function search(value, page = 1){
//   const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(
//     `SELECT * FROM products WHERE name LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
//   )
//   const data = helper.emptyOrRows(rows);
//   const meta = {page};

//   return {
//       data,
//       meta
//   }
// }

// async function searchByCategory(value, page = 1){
//   const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(
//     `SELECT * FROM products WHERE category LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
//   )
//   const data = helper.emptyOrRows(rows);
//   const meta = {page};

//   return {
//       data,
//       meta
//   }
// }

// async function searchBySubCategory(value, page = 1){
//   const offset = helper.getOffset(page, config.listPerPage);
//   const rows = await db.query(
//     `SELECT * FROM products WHERE sub_category LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
//   )
//   const data = helper.emptyOrRows(rows);
//   const meta = {page};

//   return {
//       data,
//       meta
//   }
// }

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  search,
  searchByCategory,
  searchBySubCategory
}