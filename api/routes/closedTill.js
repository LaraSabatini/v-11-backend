const express = require('express');

const router = express.Router();
const closedTill = require('../services/closedTill');

router.get('/', async (req, res, next) => {
  try {
    res.json(await closedTill.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/date=:date', async (req, res, next) => {
  try {
    res.json(await closedTill.getByDate(req.params.date, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await closedTill.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await closedTill.update(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

router.get('/boulder-earnings/date=:date', async (req, res, next) => {
  try {
    res.json(await closedTill.getEarningsBoulder(req.params.date, req.query.page));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
