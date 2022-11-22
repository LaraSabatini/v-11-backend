const express = require('express');
const router = express.Router();
const digitalPayments = require('../services/digitalPayments');
const errorResponses = require('../../../strings/errorMessages')

/* GET all */
router.get('/', async function(req, res, next) {
  try {
    res.json(await digitalPayments.getAll(req.query.page));
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

/* SEARCH by user */
router.get('/by-user/user_id=:user_id', async function(req, res, next) {
    try {
      res.json(await digitalPayments.searchByUser(req.params.user_id, req.query.page));
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

/* SEARCH by month */
router.get('/by-month/month_id=:month_id', async function(req, res, next) {
    try {
      res.json(await digitalPayments.searchByMonth(req.params.month_id, req.query.page));
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

/* SEARCH by date */
router.get('/by-date/date=:date', async function(req, res, next) {
    try {
      res.json(await digitalPayments.searchByDate(req.params.date));
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

/* SEARCH by user && date */
router.get('/by-user-date/user_id=:user_id&date=:date', async function(req, res, next) {
    try {
      res.json(await digitalPayments.searchByUserAndDate(req.params.user_id, req.params.date, req.query.page));
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

/* create digital payment */
router.post('/', async function(req, res, next) {
  try {
    res.json(await digitalPayments.createDigitalPayment(req.body));
  } catch (err) {
    next(err);
    const response = {
        status: 500,
        message: errorResponses.updatePartnerPayment,
    }
    res.status(500).json(response)
  }
});

/* edit digital payment */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await digitalPayments.updateDigitalPayment(req.params.id, req.body));
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