const express = require('express');
const router = express.Router();
const products = require('../services/products');

/* GET products */
router.get('/', async function(req, res, next) {
  try {
    res.json(await products.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the store data `, err.message);
    next(err);
  }
});

/* SEARCH partners */
router.get('/:value', async function(req, res, next) {
    try {
      res.json(await products.searchProducts(req.params.value, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

/* SEARCH by category */
router.get('/category/:value', async function(req, res, next) {
  try {
    res.json(await products.filterByCategory(req.params.value, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the products `, err.message);
    next(err);
  }
});

/* POST products */
router.post('/', async function(req, res, next) {
  try {
    res.json(await products.create(req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
});

/* PUT product */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await products.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating product`, err.message);
    next(err);
  }
});

module.exports = router;