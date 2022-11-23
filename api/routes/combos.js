const express = require('express');

const router = express.Router();
const combos = require('../services/combos');
const errorResponses = require('../../strings/errorMessages');

router.get('/', async (req, res, next) => {
  try {
    res.json(await combos.getMultiple(req.query.page));
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
    res.json(await combos.update(req.params.id, req.body));
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
