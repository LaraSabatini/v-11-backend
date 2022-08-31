const express = require('express');
const router = express.Router();
const trainers = require('../services/trainers');

/* GET trainers */
router.get('/', async function(req, res, next) {
  try {
    res.json(await trainers.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the trainers `, err.message);
    next(err);
  }
});

/* SEARCH trainers */
router.get('/:value', async function(req, res, next) {
    try {
      res.json(await trainers.searchTrainer(req.params.value, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

/* POST trainers */
router.post('/', async function(req, res, next) {
  try {
    res.json(await trainers.create(req.body));
  } catch (err) {
    console.error(`Error while creating trainer`, err.message);
    next(err);
  }
});

/* PUT trainer */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await trainers.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating trainer`, err.message);
    next(err);
  }
});

module.exports = router;