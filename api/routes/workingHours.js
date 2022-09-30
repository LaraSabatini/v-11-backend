const express = require('express');
const router = express.Router();
const workingHours = require('../services/workingHours');

/* GET workingHours */
router.get('/', async function(req, res, next) {
  try {
    res.json(await workingHours.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the working hours data `, err.message);
    next(err);
  }
});

/* SEARCH partners */
router.get('/weekId=:weekId', async function(req, res, next) {
    try {
      res.json(await workingHours.getByWeek(req.params.weekId, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

/* POST products */
router.post('/', async function(req, res, next) {
  try {
    res.json(await products.create(req.body));
  } catch (err) {
    console.error(`Error while creating working hours`, err.message);
    next(err);
  }
});

/* PUT product */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await products.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating working hours`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await partners.removeWorking(req.params.id));
    } catch (err) {
      console.error(`Error while deleting working hours`, err.message);
      next(err);
    }
});

module.exports = router;