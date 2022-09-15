const express = require('express');
const router = express.Router();
const clients = require('../services/clients');

/* GET partners */
router.get('/', async function(req, res, next) {
  try {
    res.json(await clients.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the clients `, err.message);
    next(err);
  }
});

/* SEARCH clients */
router.get('/:value', async function(req, res, next) {
    try {
      res.json(await clients.searchPartner(req.params.value, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

/* SEARCH students */
router.get('/students/:value', async function(req, res, next) {
  try {
    res.json(await clients.filterStudents(req.params.value, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the clients `, err.message);
    next(err);
  }
});

/* SEARCH free-pass */
router.get('/free-pass/:value', async function(req, res, next) {
  try {
    res.json(await clients.filterFreePass(req.params.value, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the clients `, err.message);
    next(err);
  }
});

/* POST clients */
router.post('/', async function(req, res, next) {
  try {
    res.json(await clients.create(req.body));
  } catch (err) {
    console.error(`Error while creating partner`, err.message);
    next(err);
  }
});

/* PUT partner */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await clients.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating partner`, err.message);
    next(err);
  }
});

/* DELETE partner */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await clients.removePartner(req.params.id));
  } catch (err) {
    console.error(`Error while deleting product`, err.message);
    next(err);
  }
});

module.exports = router;