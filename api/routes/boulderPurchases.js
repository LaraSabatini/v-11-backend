const express = require('express');

const router = express.Router();
const boulderPurchases = require('../services/boulderPurchases');
const errorResponses = require('../../strings/errorMessages');

const errorResponse = {
  status: 500,
  message: errorResponses.updatePartnerPayment,
};

router.get('/', async (req, res, next) => {
  try {
    res.json(await boulderPurchases.getAll(req.query.page));
  } catch (err) {
    res.status(500).json(errorResponse);
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
    res.status(500).json(errorResponse);
    next(err);
  }
});

module.exports = router;
