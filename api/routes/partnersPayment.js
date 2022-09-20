const express = require('express');
const router = express.Router();
const partnersPayment = require('../services/partnersPayment');

/* GET partnersPayment */
router.get('/', async function(req, res, next) {
  try {
    res.json(await partnersPayment.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the store data `, err.message);
    next(err);
  }
});

/* SEARCH partnersPayment by partner */
router.get('/:value', async function(req, res, next) {
    try {
      res.json(await partnersPayment.searchPurchasesByPartner(req.params.value, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

/* SEARCH partnersPayment by date */
router.get('/date/:value', async function(req, res, next) {
  try {
    res.json(await partnersPayment.searchPurchasesByDate(req.params.value, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting search `, err.message);
    next(err);
  }
});

/* SEARCH partnersPayment by clases */
router.get('/clases/:value', async function(req, res, next) {
  try {
    res.json(await partnersPayment.searchClases(req.params.value, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting search `, err.message);
    next(err);
  }
});

/* SEARCH partnersPayment by date */
router.get('/cards/:date', async function(req, res, next) {
  try {
    res.json(await partnersPayment.getEarningsByDate(req.params.date, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting search `, err.message);
    next(err);
  }
});

/* SEARCH partnersPayment by partner_id */
router.get('/payment_by_partner_id/:value', async function(req, res, next) {
  try {
    res.json(await partnersPayment.getPurchaseByPartnerId(req.params.value));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting search `, err.message);
    next(err);
  }
});

/* POST purchase */
router.post('/', async function(req, res, next) {
  try {
    res.json(await partnersPayment.create(req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
});

/* PUT payment */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await partnersPayment.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating payment`, err.message);
    next(err);
  }
});

module.exports = router;