const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM products LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

async function searchProducts(value, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM products WHERE name LIKE '%${value}%' LIMIT ${offset},${config.listPerPage}`
    )
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

async function filterByCategory(value, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM products WHERE category_id = '${value}' LIMIT ${offset},${config.listPerPage}`
     )
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
        data,
        meta
    }
};

async function create(product){
  const result = await db.query(
    `INSERT INTO products(name, brand_id, stock, price, margin, cost, sales_contact_name, sales_contact_information, image, category_id)
    VALUES ('${product.name}','${product.brand_id}', '${product.stock}', '${product.price}', '${product.margin}', '${product.cost}', '${product.sales_contact_name}', '${product.sales_contact_information}', '${product.image}', '${product.category_id}')`
  );

  let message = 'Error in creating product';

  if (result.affectedRows) {
    message = 'Product created successfully';
  }

  return {message};
}

module.exports = {
    getMultiple,
    searchProducts,
    filterByCategory,
    create
}