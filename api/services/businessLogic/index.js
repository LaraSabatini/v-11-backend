/* eslint-disable no-return-assign */
const db = require('../db');
const successResponses = require('../../../strings/successMessages');
const errorResponses = require('../../../strings/errorMessages');

async function createPartner(partner, partnerPayment, boulderPayment) {
  const createPartnerResult = await db.query(
    `INSERT INTO partners(name, last_name, identification_number, birth_date, email, phone, membership_start_date, created_by, free_pass, subs, is_student) VALUES ('${partner.name}','${partner.last_name}', '${partner.identification_number}', '${partner.birth_date}', '${partner.email}', '${partner.phone}', '${partner.membership_start_date}', '${partner.created_by}', '${partner.free_pass}', '${partner.subs}', '${partner.is_student}')`,
  );

  const createPartnerPaymentResult = await db.query(
    `INSERT INTO partner_payments(partner_id, partner_name, partner_last_name, combo, time_paid, time_paid_unit, payment_method_id, payment_method_name, price_paid, date, payment_expire_date, created_by)
     VALUES ('${createPartnerResult.insertId}','${partner.name}', '${partner.last_name}', '${partnerPayment.combo}', '${partnerPayment.time_paid}', '${partnerPayment.time_paid_unit}', '${partnerPayment.payment_method_id}', '${partnerPayment.payment_method_name}', '${partnerPayment.price_paid}', '${partner.membership_start_date}', '${partnerPayment.payment_expire_date}', '${partner.created_by}')`,
  );

  const createBoulderPurchaseResult = await db.query(`INSERT INTO boulder_purchases(id, date, item_id, item_name, amount_of_items, profit, payment_method_id, created_by) VALUES ('${boulderPayment.id}','${partner.membership_start_date}', '${boulderPayment.item_id}', '${boulderPayment.item_name}', '${boulderPayment.amount_of_items}', '${partnerPayment.price_paid}', '${partnerPayment.payment_method_id}', '${partner.created_by}')`);

  let message = {
    message: errorResponses.createPartner,
    status: 500,
  };

  // eslint-disable-next-line max-len
  if (createPartnerResult.affectedRows && createPartnerPaymentResult.affectedRows && createBoulderPurchaseResult.affectedRows) {
    message = {
      message: successResponses.createPartner,
      status: 200,
    };
  }

  return { message };
}

const addProfit = (list) => {
  const profits = {
    cash: 0,
    mp: 0,
  };
  if (list.length > 0) {
    list.forEach((purchase) => (
      purchase.payment_method_id === 1
        ? profits.cash += purchase.profit
        : profits.mp += purchase.profit
    ));
  }

  return profits;
};

async function getDataForFinances(date) {
  const boulderPurchases = await db.query(
    `SELECT * FROM boulder_purchases WHERE date LIKE '${date}'`,
  );
  const storePurchases = await db.query(
    `SELECT * FROM store_payments WHERE date = '${date}'`,
  );

  const data = {
    tillEarnings: {
      cash: 0,
      mp: 0,
    },
    boulder: {
      earnings: {
        cash: 0,
        mp: 0,
      },
      freePass: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        individual: 0,
        packFour: 0,
        packEight: 0,
        total: 0,
        amountOfPeople: 0,
      },
      lessons: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        individual: 0,
        packFour: 0,
        packEight: 0,
        total: 0,
      },
      month: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        total: 0,
      },
      combo: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        total: 0,
      },
      shoes: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        total: 0,
      },
      freePassWithDiscount: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        total: 0,
      },
    },
    store: {
      earnings: {
        cash: 0,
        mp: 0,
      },
    },
  };

  // TILL EARNINGS *********************************************
  const addBoulderProfits = addProfit(boulderPurchases);
  const addStoreProfits = addProfit(storePurchases);

  data.tillEarnings = {
    cash: addBoulderProfits.cash + addStoreProfits.cash,
    mp: addBoulderProfits.mp + addStoreProfits.mp,
  };

  // BOULDER EARNINGS *********************************************
  const freePassFromStore = storePurchases.filter((product) => product.product_id === 1
  || product.product_id === 2);
  const shoes = storePurchases.filter((product) => product.product_id === 3);
  const freePassWithDiscount = storePurchases.filter((product) => product.product_id === 28);
  const addFreePass = addProfit(freePassFromStore);
  const addFreePassWithDiscount = addProfit(freePassWithDiscount);
  const addShoes = addProfit(shoes);

  data.boulder.earnings = {
    cash: addBoulderProfits.cash + addFreePass.cash + addFreePassWithDiscount.cash + addShoes.cash,
    mp: addBoulderProfits.mp + addFreePass.mp + addFreePassWithDiscount.mp + addShoes.mp,
  };

  // FREE PASS EARNINGS *********************************************
  let totalIndividualPasses = 0;
  freePassFromStore.forEach((pass) => totalIndividualPasses += pass.amount_of_items);

  const freePassesInBoulderPurchases = boulderPurchases.filter((item) => item.item_id === 2);
  const fourPackPasses = freePassesInBoulderPurchases.filter((item) => item.amount_of_items === 4);
  const eightPackPasses = freePassesInBoulderPurchases.filter((item) => item.amount_of_items === 8);
  const otherFreePasses = freePassesInBoulderPurchases.filter((item) => item.amount_of_items !== 4
    && item.amount_of_items !== 8);

  otherFreePasses.forEach((pass) => totalIndividualPasses += pass.amount_of_items);

  const earningsFromBoulder = addProfit(freePassesInBoulderPurchases);
  const earningsFromStore = addProfit(freePassFromStore);

  data.boulder.freePass = {
    earnings: {
      cash: earningsFromBoulder.cash + earningsFromStore.cash,
      mp: earningsFromBoulder.mp + earningsFromStore.mp,
    },
    individual: totalIndividualPasses,
    packFour: fourPackPasses.length,
    packEight: eightPackPasses.length,
    total: totalIndividualPasses + fourPackPasses.length * 4 + eightPackPasses.length * 8,
    amountOfPeople: otherFreePasses.length + totalIndividualPasses
      + fourPackPasses.length + eightPackPasses.length,
  };

  // FREE PASS WITH DISCOUNT EARNINGS *********************************************
  let freePassWithDiscountAmount = 0;
  freePassWithDiscount.forEach((item) => freePassWithDiscountAmount += item.amount_of_items);

  data.boulder.freePassWithDiscount = {
    earnings: addFreePassWithDiscount,
    total: freePassWithDiscountAmount,
  };

  // LESSON EARNINGS *********************************************
  const lessonsPurchased = boulderPurchases.filter((item) => item.item_id === 4);
  const packFourLessons = lessonsPurchased.filter((item) => item.amount_of_items === 4);
  const packEightLessons = lessonsPurchased.filter((item) => item.amount_of_items === 8);
  const otherLessons = lessonsPurchased.filter((item) => item.amount_of_items !== 4
    && item.amount_of_items !== 8);

  data.boulder.lessons = {
    earnings: addProfit(lessonsPurchased),
    individual: otherLessons.length,
    packFour: packFourLessons.length,
    packEight: packEightLessons.length,
    total: otherLessons.length + packFourLessons.length * 4 + packEightLessons.length * 8,
  };

  // COMBO EARNINGS *********************************************
  const combosPurchased = boulderPurchases.filter((item) => item.item_id === 1);
  let amountOfCombos = 0;
  combosPurchased.forEach((item) => amountOfCombos += item.amount_of_items);

  data.boulder.combo = {
    earnings: addProfit(combosPurchased),
    total: amountOfCombos,
  };

  // MONTH EARNINGS *********************************************
  const monthsPurchased = boulderPurchases.filter((item) => item.item_id === 3);
  let amountOfMonths = 0;
  monthsPurchased.forEach((item) => amountOfMonths += item.amount_of_items);

  data.boulder.month = {
    earnings: addProfit(monthsPurchased),
    total: amountOfMonths,
  };

  // SHOES EARNINGS *********************************************
  let totalShoes = 0;
  shoes.forEach((item) => totalShoes += item.amount_of_items);

  data.boulder.shoes = {
    earnings: addShoes,
    total: totalShoes,
  };

  // STORE EARNINGS *********************************************
  const itemsFromStore = storePurchases.filter((item) => item.product_id !== 1
  && item.product_id !== 2 && item.product_id !== 28 && item.product_id !== 3);

  data.store = {
    earnings: addProfit(itemsFromStore),
  };

  return {
    data,
  };
}

module.exports = {
  createPartner,
  getDataForFinances,
};
