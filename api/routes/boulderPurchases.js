const express = require('express');

const router = express.Router();
const boulderPurchases = require('../services/boulderPurchases');
const errorResponses = require('../../strings/errorMessages');

router.get('/', async (req, res, next) => {
  try {
    res.json(await boulderPurchases.getAll(req.query.page));
  } catch (err) {
    const response = {
      status: 500,
      message: errorResponses.updatePartnerPayment,
    };
    res.status(500).json(response);
    next(err);
  }
});

router.get('/date=:date', async (req, res, next) => {
  try {
    res.json(await boulderPurchases.searchPurchasesByDate(req.params.date, req.query.page));
  } catch (err) {
    const response = {
      status: 500,
      message: errorResponses.search,
    };
    res.status(500).json(response);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await boulderPurchases.create(req.body));
  } catch (err) {
    const response = {
      status: 500,
      message: errorResponses.updatePartnerPayment,
    };
    res.status(500).json(response);
    next(err);
  }
});

module.exports = router;
