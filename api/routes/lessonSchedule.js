const express = require('express');

const router = express.Router();
const errorResponses = require('../../strings/errorMessages');
const lessonsSchedule = require('../services/lessonSchedule');

const errorResSearch = {
  status: 500,
  message: errorResponses.search,
};

router.get('/schedule', async (req, res, next) => {
  try {
    res.json(await lessonsSchedule.getLessonScheduleByDay(req.query.day));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/schedule/by_week_id', async (req, res, next) => {
  try {
    res.json(await lessonsSchedule.getLessonScheduleByWeekId(req.query.weekId));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/purchases', async (req, res, next) => {
  try {
    res.json(await lessonsSchedule.getByPurchaseId(req.query.id));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.post('/schedule', async (req, res, next) => {
  try {
    res.json(await lessonsSchedule.createLessonSchedule(req.body));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.put('/schedule', async (req, res, next) => {
  try {
    res.json(await lessonsSchedule.updateSchedule(req.body));
  } catch (err) {
    next(err);
    res.status(500).json({ ...errorResSearch, err });
  }
});

router.post('/purchases', async (req, res, next) => {
  try {
    res.json(await lessonsSchedule.createLessonPurchase(req.body));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.post('/type', async (req, res, next) => {
  try {
    res.json(await lessonsSchedule.createLessonType(req.body));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/type', async (_req, res, next) => {
  try {
    res.json(await lessonsSchedule.getLessonTypes());
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.put('/type/edit', async (req, res, next) => {
  try {
    res.json(await lessonsSchedule.updateLessonType(req.body));
  } catch (err) {
    next(err);
    res.status(500);
  }
});

router.put('/students', async (req, res, next) => {
  try {
    res.json(await lessonsSchedule.getPartnersByPurchases(req.body));
  } catch (err) {
    next(err);
    res.status(500);
  }
});

module.exports = router;
