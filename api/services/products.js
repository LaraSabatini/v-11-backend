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
    `INSERT INTO products(name, brand_id, stock, price, margin, cost, sales_contact_name, sales_contact_information, category_id)
    VALUES ('${product.name}','${product.brand_id}', '${product.stock}', '${product.price}', '${product.margin}', '${product.cost}', '${product.sales_contact_name}', '${product.sales_contact_information}', '${product.category_id}')`
  );

  let message = 'Error in creating product';

  if (result.affectedRows) {
    message = 'Product created successfully';
  }

  return {message};
}

async function update(id, product){
  const result = await db.query(
    `UPDATE products SET id='${product.id}',name='${product.name}',brand_id='${product.brand_id}',stock='${product.stock}',price='${product.price}',margin='${product.margin}',cost='${product.cost}',sales_contact_name='${product.sales_contact_name}', sales_contact_information='${product.sales_contact_information}', category_id='${product.category_id}' WHERE id='${id}'`
  );

  let message = 'Error in updating product';

  if (result.affectedRows) {
    message = 'product updated successfully';
  }

  return {message};
}

module.exports = {
    getMultiple,
    searchProducts,
    filterByCategory,
    create,
    update
}