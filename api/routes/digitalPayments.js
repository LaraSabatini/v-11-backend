const express = require('express');
const router = express.Router();
const digitalPayments = require('../services/digitalPayments');

/* GET all */
router.get('/', async function(req, res, next) {
  try {
    res.json(await digitalPayments.getAll(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the digital payments `, err.message);
    next(err);
  }
});

/* SEARCH by user and product */
router.get('/by-user-and-product/user_id=:user_id&product_id=:product_id', async function(req, res, next) {
    try {
      res.json(await digitalPayments.searchByUserAndProduct(req.params.user_id, req.params.product_id, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error getting the data `, err.message);
      next(err);
    }
});

/* SEARCH by user */
router.get('/by-user/user_id=:user_id', async function(req, res, next) {
    try {
      res.json(await digitalPayments.searchByUser(req.params.user_id, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error getting the data `, err.message);
      next(err);
    }
});

/* SEARCH by month */
router.get('/by-month/month_id=:month_id', async function(req, res, next) {
    try {
      res.json(await digitalPayments.searchByMonth(req.params.month_id, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error getting the data `, err.message);
      next(err);
    }
});

/* SEARCH by date */
router.get('/by-date/date=:date', async function(req, res, next) {
    try {
      res.json(await digitalPayments.searchByDate(req.params.date, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error getting the data `, err.message);
      next(err);
    }
});

/* SEARCH by user && product && month */
router.get('/by-user-product-month/user_id=:user_id&product_id=:product_id&month_id=:month_id', async function(req, res, next) {
    try {
      res.json(await digitalPayments.searchByUserAndProductAndMonth(req.params.user_id, req.params.product_id, req.params.month_id, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error getting the data `, err.message);
      next(err);
    }
});

/* create digital payment */
router.post('/', async function(req, res, next) {
  try {
    res.json(await digitalPayments.createDigitalPayment(req.body));
  } catch (err) {
    console.error(`Error while creating digital payment`, err.message);
    next(err);
  }
});

/* edit digital payment */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await digitalPayments.updateDigitalPayment(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating digital payment`, err.message);
    next(err);
  }
});

module.exports = router;