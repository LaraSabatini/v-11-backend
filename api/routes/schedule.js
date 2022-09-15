const express = require('express');
const router = express.Router();
const schedule = require('../services/schedule');

/* GET schedule */
router.get('/', async function(req, res, next) {
  try {
    res.json(await schedule.getSchedule(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the schedule `, err.message);
    next(err);
  }
});

/* POST schedule */
router.post('/', async function(req, res, next) {
  try {
    res.json(await schedule.createSchedule(req.body));
  } catch (err) {
    console.error(`Error while creating trainer`, err.message);
    next(err);
  }
});

/* PUT schedule */
router.put('/schedule/:id', async function(req, res, next) {
  try {
    res.json(await schedule.updateSchedule(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating schedule`, err.message);
    next(err);
  }
});

module.exports = router;