const express = require('express');

const router = express.Router();
const digitalPayments = require('../services/digitalPayments');
const errorResponses = require('../../strings/errorMessages');

const errorResSearch = {
  status: 500,
  message: errorResponses.search,
};

const errorResPayment = {
  status: 500,
  message: errorResponses.updatePartnerPayment,
};

router.get('/', async (req, res, next) => {
  try {
    res.json(await digitalPayments.getAll(req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/by-user/user_id=:userId', async (req, res, next) => {
  try {
    res.json(await digitalPayments.searchByUser(req.params.userId, req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/by-month/month_id=:monthId', async (req, res, next) => {
  try {
    res.json(await digitalPayments.searchByMonth(req.params.monthId, req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/by-date/date=:date', async (req, res, next) => {
  try {
    res.json(await digitalPayments.searchByDate(req.params.date));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/by-user-date/user_id=:userId&date=:date', async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    res.json(await digitalPayments.searchByUserAndDate(req.params.userId, req.params.date, req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await digitalPayments.createDigitalPayment(req.body));
  } catch (err) {
    next(err);
    res.status(500).json(errorResPayment);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await digitalPayments.updateDigitalPayment(req.params.id, req.body));
  } catch (err) {
    next(err);
    res.status(500).json(errorResPayment);
  }
});

module.exports = router;
