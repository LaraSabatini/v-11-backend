const express = require('express');

const router = express.Router();
const workingHours = require('../services/workingHours');

/* GET workingHours */
router.get('/', async (req, res, next) => {
  try {
    res.json(await workingHours.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

/* SEARCH partners */
router.get('/weekId=:weekId', async (req, res, next) => {
  try {
    res.json(await workingHours.getByWeek(req.params.weekId, req.query.page));
  } catch (err) {
    next(err);
  }
});

/* POST products */
router.post('/', async (req, res, next) => {
  try {
    res.json(await workingHours.create(req.body));
  } catch (err) {
    next(err);
  }
});

/* PUT product */
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
