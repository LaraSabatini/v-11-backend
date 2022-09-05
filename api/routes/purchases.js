const express = require('express');
const router = express.Router();
const purchases = require('../services/purchases');

/* GET purchases */
router.get('/', async function(req, res, next) {
  try {
    res.json(await purchases.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the store data `, err.message);
    next(err);
  }
});

/* SEARCH purchases by date */
router.get('/:value', async function(req, res, next) {
    try {
      res.json(await purchases.searchPurchasesByDate(req.params.value, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

/* SEARCH by item */
router.get('/item/:value', async function(req, res, next) {
  try {
    res.json(await purchases.filterByProduct(req.params.value, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the products `, err.message);
    next(err);
  }
});

/* POST purchase */
router.post('/', async function(req, res, next) {
  try {
    res.json(await purchases.create(req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
});

module.exports = router;