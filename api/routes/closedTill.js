const express = require('express');
const router = express.Router();
const closedTill = require('../services/closedTill');

router.get('/', async function(req, res, next) {
    try {
      res.json(await closedTill.getMultiple(req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting the closedTill `, err.message);
      next(err);
    }
});

router.get('/date=:date', async function(req, res, next) {
  try {
    res.json(await closedTill.getByDate(req.params.date, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the closedTill `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
      res.json(await closedTill.create(req.body));
    } catch (err) {
      console.error(`Error while creating till closure`, err.message);
      next(err);
    }
});

router.put('/:id', async function(req, res, next) {
    try {
      res.json(await closedTill.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating till`, err.message);
      next(err);
    }
});

router.get('/boulder-earnings/date=:date', async function(req, res, next) {
  try {
    res.json(await closedTill.getEarningsBoulder(req.params.date, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the boulder earnings `, err.message);
    next(err);
  }
});

module.exports = router;