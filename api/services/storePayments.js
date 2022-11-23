const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT * FROM store_payments LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getByDate(date) {
  const rows = await db.query(
    `SELECT * FROM store_payments WHERE date = '${date}'`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function getByDateAndPaymentMethodAndProduct(date, product, payment) {
  const rows = await db.query(
    `SELECT * FROM store_payments WHERE date LIKE '${date}' AND product_id = ${product} AND payment_method_id = ${payment}`,
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function create(productPurchase) {
  const result = await db.query(
    `INSERT INTO store_payments(product_id, product_name, amount_of_items, profit, payment_method_id, date, created_by)
    VALUES ('${productPurchase.product_id}','${productPurchase.product_name}', '${productPurchase.amount_of_items}', '${productPurchase.profit}', '${productPurchase.payment_method_id}', '${productPurchase.date}', '${productPurchase.created_by}')`,
  );

  let message = 'Error in creating productPurchase';

  if (result.affectedRows) {
    message = 'productPurchase created successfully';
  }

  return { message };
}

async function update(id, productPurchase) {
  const result = await db.query(
    `UPDATE store_payments SET id='${productPurchase.id}',product_id='${productPurchase.product_id}',product_name='${productPurchase.product_name}',amount_of_items='${productPurchase.amount_of_items}',profit='${productPurchase.profit}',payment_method_id='${productPurchase.payment_method_id}',date='${productPurchase.date}', created_by='${productPurchase.created_by}' WHERE id='${id}'`,
  );

  let message = 'Error in updating store_payments';

  if (result.affectedRows) {
    message = 'store_payments updated successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  getByDate,
  getByDateAndPaymentMethodAndProduct,
};
