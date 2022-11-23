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

module.exports = {
  createPartner,
};
