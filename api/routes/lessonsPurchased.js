const express = require('express');
const router = express.Router();
const lessonsPurchased = require('../services/lessonsPurchased');

/* GET lessonsPurchased */
router.get('/', async function(req, res, next) {
  try {
    res.json(await lessonsPurchased.getAll(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the lessons data `, err.message);
    next(err);
  }
});

router.get('/week=:week', async function(req, res, next) {
    try {
      res.json(await lessonsPurchased.getByWeek(req.params.week, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

router.get('/date=:date&shift=:shift', async function(req, res, next) {
  try {
    res.json(await lessonsPurchased.getByDateAndShift(req.params.date, req.params.shift, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting search `, err.message);
    next(err);
  }
});

router.get('/partner-paid/id=:id&paid=:paid', async function(req, res, next) {
  try {
    res.json(await lessonsPurchased.getByPartnerIdAndPaid(req.params.id, req.params.paid, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting search `, err.message);
    next(err);
  }
});


router.post('/', async function(req, res, next) {
    try {
      res.json(await lessonsPurchased.createPurchase(req.body));
    } catch (err) {
      console.error(`Error while creating lesson purchase`, err.message);
      next(err);
    }
});
  
  router.put('/:id', async function(req, res, next) {
    try {
      res.json(await lessonsPurchased.updateLessonPurchase(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating product`, err.message);
      next(err);
    }
});

module.exports = router;
