const express = require('express');
const router = express.Router();
const partnersPayment = require('../services/partnersPayment');

/* GET partnersPayment */
router.get('/', async function(req, res, next) {
  try {
    res.json(await partnersPayment.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the store data `, err.message);
    next(err);
  }
});

/* SEARCH partnersPayment by partner */
router.get('/:value', async function(req, res, next) {
    try {
      res.json(await partnersPayment.searchPurchasesByPartner(req.params.value, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

/* POST purchase */
router.post('/', async function(req, res, next) {
  try {
    res.json(await partnersPayment.create(req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
});

module.exports = router;