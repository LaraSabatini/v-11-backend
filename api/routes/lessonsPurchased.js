const express = require('express');

const router = express.Router();
const lessonsPurchased = require('../services/lessonsPurchased');

router.get('/', async (req, res, next) => {
  try {
    res.json(await lessonsPurchased.getAll(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/week=:week', async (req, res, next) => {
  try {
    res.json(await lessonsPurchased.getByWeek(req.params.week, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/date=:date&shift=:shift', async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    res.json(await lessonsPurchased.getByDateAndShift(req.params.date, req.params.shift, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/partner-paid/id=:id&paid=:paid', async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    res.json(await lessonsPurchased.getByPartnerIdAndPaid(req.params.id, req.params.paid, req.query.page));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await lessonsPurchased.createPurchase(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await lessonsPurchased.updateLessonPurchase(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    res.json(await lessonsPurchased.removeLessonPur(req.params.id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
