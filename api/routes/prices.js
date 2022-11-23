const express = require('express');

const router = express.Router();
const prices = require('../services/prices');
const errorResponses = require('../../strings/errorMessages');

router.get('/', async (req, res, next) => {
  try {
    res.json(await prices.getMultiple(req.query.page));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.search,
    };
    res.status(500).json(response);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await prices.update(req.params.id, req.body));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.updatePrices,
    };
    res.status(500).json(response);
  }
});

module.exports = router;
