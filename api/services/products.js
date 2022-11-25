const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');
const successResponses = require('../../strings/successMessages');
const errorResponses = require('../../strings/errorMessages');

const table = 'products';

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

async function searchProducts(value, page = 1) {
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

async function filterByCategory(value, page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `${selectTable} WHERE category_id = '${value}' LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(product) {
  const result = await db.query(
    `INSERT INTO ${table}(name, brand_id, stock, price, margin, cost, sales_contact_name, sales_contact_information, category_id)
    VALUES ('${product.name}','${product.brand_id}', '${product.stock}', '${product.price}', '${product.margin}', '${product.cost}', '${product.sales_contact_name}', '${product.sales_contact_information}', '${product.category_id}')`,
  );

  let message = {
    status: 500,
    message: errorResponses.createProduct,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.createProduct,
    };
  }

  return { message };
}

async function update(id, product) {
  const result = await db.query(
    `UPDATE ${table} SET id='${product.id}',name='${product.name}',brand_id='${product.brand_id}',stock='${product.stock}',price='${product.price}',margin='${product.margin}',cost='${product.cost}',sales_contact_name='${product.sales_contact_name}', sales_contact_information='${product.sales_contact_information}', category_id='${product.category_id}' WHERE id='${id}'`,
  );

  let message = {
    status: 500,
    message: errorResponses.updateProduct,
  };

  if (result.affectedRows) {
    message = {
      status: 200,
      message: successResponses.updateProduct,
    };
  }

  return { message };
}

module.exports = {
  getMultiple,
  searchProducts,
  filterByCategory,
  create,
  update,
};
