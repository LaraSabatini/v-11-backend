const express = require('express');
const router = express.Router();
const partnersPayment = require('../services/partnersPayment');

/* GET partnersPayment */
router.get('/', async function(req, res, next) {
  try {
    res.json(await partnersPayment.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    next(err);
        const response = {
            status: 500,
		    message: errorResponses.search,
        }
        res.status(500).json(response)
  }
});

/* SEARCH partnersPayment by partner */
router.get('/:value', async function(req, res, next) {
    try {
      res.json(await partnersPayment.searchPurchasesByPartner(req.params.value, req.query.page));
      console.log(req);
    } catch (err) {
      next(err);
        const response = {
            status: 500,
		    message: errorResponses.search,
        }
        res.status(500).json(response)
    }
});

/* SEARCH partnersPayment by date */
router.get('/date/:value', async function(req, res, next) {
  try {
    res.json(await partnersPayment.searchPurchasesByDate(req.params.value, req.query.page));
    console.log(req);
  } catch (err) {
    next(err);
        const response = {
            status: 500,
		    message: errorResponses.search,
        }
        res.status(500).json(response)
  }
});

/* SEARCH partnersPayment by date */
router.get('/cards/:date', async function(req, res, next) {
  try {
    res.json(await partnersPayment.getEarningsByDate(req.params.date));
    console.log(req);
  } catch (err) {
    next(err);
        const response = {
            status: 500,
		    message: errorResponses.search,
        }
        res.status(500).json(response)
  }
});

/* SEARCH partnersPayment by partner_id */
router.get('/payment_by_partner_id/:value', async function(req, res, next) {
  try {
    res.json(await partnersPayment.getPurchaseByPartnerId(req.params.value));
    console.log(req);
  } catch (err) {
    next(err);
        const response = {
            status: 500,
		    message: errorResponses.search,
        }
        res.status(500).json(response)
  }
});

/* POST purchase */
router.post('/', async function(req, res, next) {
  try {
    res.json(await partnersPayment.create(req.body));
  } catch (err) {
    next(err);
        const response = {
            status: 500,
		    message: errorResponses.updatePartnerPayment,
        }
        res.status(500).json(response)
  }
});

/* PUT payment */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await partnersPayment.update(req.params.id, req.body));
  } catch (err) {
    next(err);
    const response = {
        status: 500,
    message: errorResponses.updatePartnerPayment,
    }
    res.status(500).json(response)
  }
});

module.exports = router;