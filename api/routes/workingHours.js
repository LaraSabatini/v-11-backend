const express = require('express');

const router = express.Router();
const workingHours = require('../services/workingHours');

router.get('/', async (req, res, next) => {
  try {
    res.json(await workingHours.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/weekId=:weekId', async (req, res, next) => {
  try {
    res.json(await workingHours.getByWeek(req.params.weekId, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await workingHours.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await workingHours.update(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    res.json(await workingHours.removeWorking(req.params.id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
