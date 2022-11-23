/* eslint-disable array-callback-return */
/* eslint-disable max-len */
const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT * FROM closed_till LIMIT ${offset},${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getByDate(date, page = 1) {
  const offset = helper.getOffset(config.listPerPage, page);
  const rows = await db.query(
    `SELECT * FROM closed_till WHERE date LIKE '%${date}%' LIMIT ${offset},${config.listPerPage}`,
  );
  const amountOfPages = await db.query(
    `SELECT COUNT(*) FROM closed_till WHERE date LIKE '%${date}%'`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page, totalPages: helper.calcTotalPages(amountOfPages) };

  return {
    data,
    meta,
  };
}

async function create(tillData) {
  const result = await db.query(
    `INSERT INTO closed_till(date, software_cash, software_mp, real_cash, real_mp, closed_by)
      VALUES ('${tillData.date}','${tillData.software_cash}','${tillData.software_mp}','${tillData.real_cash}','${tillData.real_mp}','${tillData.closed_by}')`,
  );

  let message = 'Error in closing till';

  if (result.affectedRows) {
    message = 'Till closed successfully';
  }

  return { message };
}

async function update(id, tillData) {
  const result = await db.query(
    `UPDATE closed_till SET id='${tillData.id}',date='${tillData.date}',software_cash='${tillData.software_cash}',software_mp='${tillData.software_mp}',real_cash='${tillData.real_cash}',real_mp='${tillData.real_mp}',closed_by='${tillData.closed_by}' WHERE id='${id}'`,
  );

  let message = 'Error in updating till';

  if (result.affectedRows) {
    message = 'Till updated successfully';
  }

  return { message };
}

async function getEarningsBoulder(date) {
  const boulderRows = await db.query(
    `SELECT * FROM boulder_purchases WHERE date LIKE '%${date}%'`,
  );
  const storeRows = await db.query(
    `SELECT amount_of_items, profit, payment_method_id, product_id
    FROM store_payments
    WHERE date LIKE '${date}'`,
  );
  // STORE
  let boulderCash = 0;
  let boulderMp = 0;
  let totalFreePasses = 0;
  let totalLessons = 0;

  const filterBoulderProductsInStore = storeRows.filter((item) => item.product_id === 1 || item.product_id === 2 || item.product_id === 28);

  const filterCashFromStore = filterBoulderProductsInStore.filter((item) => item.payment_method_id === 1);
  filterCashFromStore.map((item) => { boulderCash += item.profit; });

  const filterMPFromStore = filterBoulderProductsInStore.filter((item) => item.payment_method_id === 2);
  filterMPFromStore.map((item) => { boulderMp += item.profit; });

  // BOULDER PURCHASES
  const filterCashFromBoulder = boulderRows.filter((item) => item.payment_method_id === 1);
  filterCashFromBoulder.map((item) => { boulderCash += item.profit; });

  const filterMPFromBoulder = boulderRows.filter((item) => item.payment_method_id === 2);
  filterMPFromBoulder.map((item) => { boulderMp += item.profit; });

  // PASSES SOLD
  filterBoulderProductsInStore.map((item) => { totalFreePasses += item.amount_of_items; });

  const filterPassesSoldInBoulder = boulderRows.filter((item) => item.item_id === 2);
  filterPassesSoldInBoulder.map((item) => { totalFreePasses += item.amount_of_items; });
  const filterLessonsSoldInBoulder = boulderRows.filter((item) => item.item_id === 4);
  filterLessonsSoldInBoulder.map((item) => { totalLessons += item.amount_of_items; });

  // STORE EARNINGS
  let storeCash = 0;
  let storeMp = 0;
  const filterStoreProducts = storeRows.filter((item) => item.product_id !== 1 && item.product_id !== 2 && item.product_id !== 28);

  const filterCashProductsFromStore = filterStoreProducts.filter((item) => item.payment_method_id === 1);
  filterCashProductsFromStore.map((item) => { storeCash += item.profit; });

  const filterMPProductsFromStore = filterStoreProducts.filter((item) => item.payment_method_id === 2);
  filterMPProductsFromStore.map((item) => { storeMp += item.profit; });

  const data = {
    boulderData: {
      cash: boulderCash,
      mp: boulderMp,
      freePass: {
        total: totalFreePasses,
        packFour: boulderRows.filter((item) => item.item_id === 2 && item.amount_of_items === 4).length,
        packEight: boulderRows.filter((item) => item.item_id === 2 && item.amount_of_items === 8).length,
      },
      lessons: {
        total: totalLessons,
        packFour: boulderRows.filter((item) => item.item_id === 4 && item.amount_of_items === 4).length,
        packEight: boulderRows.filter((item) => item.item_id === 4 && item.amount_of_items === 8).length,
      },
      month: boulderRows.filter((item) => item.item_id === 3).length,
    },
    storeData: {
      cash: storeCash,
      mp: storeMp,
    },
  };

  return {
    data,
  };
}

module.exports = {
  getMultiple,
  getByDate,
  create,
  update,
  getEarningsBoulder,
};
