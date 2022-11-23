const express = require('express');

const router = express.Router();
const partnersPayment = require('../services/partnersPayment');
const errorResponses = require('../../strings/errorMessages');

const errorResSearch = {
  status: 500,
  message: errorResponses.search,
};

const errorResPayment = {
  status: 500,
  message: errorResponses.updatePartnerPayment,
};

router.get('/', async (req, res, next) => {
  try {
    res.json(await partnersPayment.getMultiple(req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/:value', async (req, res, next) => {
  try {
    res.json(await partnersPayment.searchPurchasesByPartner(req.params.value, req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/date/:value', async (req, res, next) => {
  try {
    res.json(await partnersPayment.searchPurchasesByDate(req.params.value, req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/cards/:date', async (req, res, next) => {
  try {
    res.json(await partnersPayment.getEarningsByDate(req.params.date));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/payment_by_partner_id/:value', async (req, res, next) => {
  try {
    res.json(await partnersPayment.getPurchaseByPartnerId(req.params.value));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await partnersPayment.create(req.body));
  } catch (err) {
    next(err);
    res.status(500).json(errorResPayment);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await partnersPayment.update(req.params.id, req.body));
  } catch (err) {
    next(err);
    res.status(500).json(errorResPayment);
  }
});

module.exports = router;
