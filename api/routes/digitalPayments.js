const express = require('express');

const router = express.Router();
const digitalPayments = require('../services/digitalPayments');
const errorResponses = require('../../strings/errorMessages');

/* GET all */
router.get('/', async (req, res, next) => {
  try {
    res.json(await digitalPayments.getAll(req.query.page));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.search,
    };
    res.status(500).json(response);
  }
});

/* SEARCH by user */
router.get('/by-user/user_id=:userId', async (req, res, next) => {
  try {
    res.json(await digitalPayments.searchByUser(req.params.userId, req.query.page));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.search,
    };
    res.status(500).json(response);
  }
});

/* SEARCH by month */
router.get('/by-month/month_id=:monthId', async (req, res, next) => {
  try {
    res.json(await digitalPayments.searchByMonth(req.params.monthId, req.query.page));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.search,
    };
    res.status(500).json(response);
  }
});

/* SEARCH by date */
router.get('/by-date/date=:date', async (req, res, next) => {
  try {
    res.json(await digitalPayments.searchByDate(req.params.date));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.search,
    };
    res.status(500).json(response);
  }
});

/* SEARCH by user && date */
router.get('/by-user-date/user_id=:userId&date=:date', async (req, res, next) => {
  try {
    res.json(await digitalPayments.searchByUserAndDate(req.params.userId, req.params.date, req.query.page));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.search,
    };
    res.status(500).json(response);
  }
});

/* create digital payment */
router.post('/', async (req, res, next) => {
  try {
    res.json(await digitalPayments.createDigitalPayment(req.body));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.updatePartnerPayment,
    };
    res.status(500).json(response);
  }
});

/* edit digital payment */
router.put('/:id', async (req, res, next) => {
  try {
    res.json(await digitalPayments.updateDigitalPayment(req.params.id, req.body));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.updatePartnerPayment,
    };
    res.status(500).json(response);
  }
});

module.exports = router;
