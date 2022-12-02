const express = require('express');

const router = express.Router();
const products = require('../services/products');

router.get('/', async (req, res, next) => {
  try {
    res.json(await products.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/stock=:stock', async (req, res, next) => {
  try {
    res.json(await products.getProductsWithLowStock(req.params.stock, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/:value', async (req, res, next) => {
  try {
    res.json(await products.searchProducts(req.params.value, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/category/:value', async (req, res, next) => {
  try {
    res.json(await products.filterByCategory(req.params.value, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await products.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await products.update(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
