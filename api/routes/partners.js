const express = require('express');
const router = express.Router();
const partners = require('../services/partners');

/* GET partners */
router.get('/', async function(req, res, next) {
  try {
    res.json(await partners.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the partners `, err.message);
    next(err);
  }
});

/* SEARCH partners */
router.get('/:value', async function(req, res, next) {
    try {
      res.json(await partners.searchPartner(req.params.value, req.query.page));
      console.log(req);
    } catch (err) {
      console.error(`Error while getting search `, err.message);
      next(err);
    }
});

/* SEARCH partners by id */
router.get('/by-id/:value', async function(req, res, next) {
  try {
    res.json(await partners.getPartnerById(req.params.value));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting search `, err.message);
    next(err);
  }
});

/* SEARCH students */
router.get('/students/:value', async function(req, res, next) {
  try {
    res.json(await partners.filterStudents(req.params.value, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the partners `, err.message);
    next(err);
  }
});

/* SEARCH free-pass */
router.get('/free-pass/:value', async function(req, res, next) {
  try {
    res.json(await partners.filterFreePass(req.params.value, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the partners `, err.message);
    next(err);
  }
});

/* POST partners */
router.post('/', async function(req, res, next) {
  try {
    res.json(await partners.create(req.body));
  } catch (err) {
    console.error(`Error while creating partner`, err.message);
    next(err);
  }
});

/* PUT partner */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await partners.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating partner`, err.message);
    next(err);
  }
});

/* DELETE partner */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await partners.removePartner(req.params.id));
  } catch (err) {
    console.error(`Error while deleting product`, err.message);
    next(err);
  }
});

module.exports = router;