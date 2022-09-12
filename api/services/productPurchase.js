const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM product_purchases LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

async function getByMonth(month, product, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM product_purchases WHERE month_id = ${month} AND product_id = ${product}`
    )
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
};

async function create(productPurchase){
  const result = await db.query(
    `INSERT INTO product_purchases(month_name, month_id, product_id, product_name, amount_of_sales, profit)
    VALUES ('${productPurchase.month_name}','${productPurchase.month_id}', '${productPurchase.product_id}', '${productPurchase.product_name}', '${productPurchase.amount_of_sales}', '${productPurchase.profit}')`
  );

  let message = 'Error in creating productPurchase';

  if (result.affectedRows) {
    message = 'productPurchase created successfully';
  }

  return {message};
}

async function update(id, productPurchase){
  const result = await db.query(
    `UPDATE product_purchases SET id='${productPurchase.id}',month_name='${productPurchase.month_name}',month_id='${productPurchase.month_id}',product_id='${productPurchase.product_id}',product_name='${productPurchase.product_name}',amount_of_sales='${productPurchase.amount_of_sales}',profit='${productPurchase.profit}' WHERE id='${id}'`
  );

  let message = 'Error in updating product_purchases';

  if (result.affectedRows) {
    message = 'product_purchases updated successfully';
  }

  return {message};
}

module.exports = {
    getMultiple,
    getByMonth,
    create,
    update
}