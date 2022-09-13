const express = require('express');
const router = express.Router();
const productPurchases = require('../services/productPurchase');

/* GET purchases */
router.get('/', async function(req, res, next) {
  try {
    res.json(await productPurchases.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the store data `, err.message);
    next(err);
  }
});

/* SEARCH purchases by month and product */
router.get('/month=:month&product=:product', async function(req, res, next) {
    try {
      res.json(await productPurchases.getByMonthAndProduct(req.params.month, req.params.product, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

/* SEARCH purchases by month */
router.get('/month=:month', async function(req, res, next) {
  try {
    res.json(await productPurchases.getByMonth(req.params.month, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting search `, err.message);
    next(err);
  }
});

/* POST purchase */
router.post('/', async function(req, res, next) {
  try {
    res.json(await productPurchases.create(req.body));
  } catch (err) {
    console.error(`Error while creating product purchase`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
    try {
      res.json(await productPurchases.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating product purchase`, err.message);
      next(err);
    }
  });

module.exports = router;