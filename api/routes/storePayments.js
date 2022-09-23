const express = require('express');
const router = express.Router();
const storePayments = require('../services/storePayments');

/* GET purchases */
router.get('/', async function(req, res, next) {
  try {
    res.json(await storePayments.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the store data `, err.message);
    next(err);
  }
});

/* SEARCH purchases by month and product */
router.get('/date=:date&payment_method_id=:payment_method_id', async function(req, res, next) {
    try {
      res.json(await storePayments.getByDate(req.params.date, req.params.payment_method_id, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

/* POST purchase */
router.post('/', async function(req, res, next) {
  try {
    res.json(await storePayments.create(req.body));
  } catch (err) {
    console.error(`Error while creating product purchase`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
    try {
      res.json(await storePayments.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating product purchase`, err.message);
      next(err);
    }
  });

module.exports = router;