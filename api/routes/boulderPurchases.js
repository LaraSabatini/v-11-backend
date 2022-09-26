const express = require('express');
const router = express.Router();
const boulderPurchases = require('../services/boulderPurchases');

router.get('/', async function(req, res, next) {
  try {
    res.json(await boulderPurchases.getAll());
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the digital payments `, err.message);
    next(err);
  }
});

router.get('/date=:date', async function(req, res, next) {
    try {
      res.json(await boulderPurchases.searchPurchasesByDate(req.params.date, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

router.post('/', async function(req, res, next) {
    try {
      res.json(await boulderPurchases.create(req.body));
    } catch (err) {
      console.error(`Error while creating boulder purchase`, err.message);
      next(err);
    }
});

module.exports = router;