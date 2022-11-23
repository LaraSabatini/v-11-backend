const express = require('express');

const router = express.Router();
const storePayments = require('../services/storePayments');

router.get('/', async (req, res, next) => {
  try {
    res.json(await storePayments.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

/* SEARCH purchases by month and product */
router.get('/date=:date', async (req, res, next) => {
  try {
    res.json(await storePayments.getByDate(req.params.date, req.query.page));
  } catch (err) {
    next(err);
  }
});

// /* SEARCH purchases by month and product */
router.get('/month=:date&product=:product&payment=:payment', async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    res.json(await storePayments.getByDateAndPaymentMethodAndProduct(req.params.date, req.params.product, req.params.payment, req.query.page));
  } catch (err) {
    next(err);
  }
});

/* POST purchase */
router.post('/', async (req, res, next) => {
  try {
    res.json(await storePayments.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await storePayments.update(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
