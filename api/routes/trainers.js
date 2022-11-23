const express = require('express');

const router = express.Router();
const trainers = require('../services/trainers');

router.get('/', async (req, res, next) => {
  try {
    res.json(await trainers.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/:value', async (req, res, next) => {
  try {
    res.json(await trainers.searchTrainer(req.params.value, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await trainers.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await trainers.update(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
