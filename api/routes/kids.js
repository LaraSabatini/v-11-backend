const express = require('express');

const router = express.Router();
const kids = require('../services/kids');
const errorResponses = require('../../strings/errorMessages');

// getMultiple,
// searchPartner,
// create,
// update,
const errorResSearch = {
  status: 500,
  message: errorResponses.search,
};

router.get('/', async (req, res, next) => {
  try {
    res.json(await kids.getMultiple(req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/:value', async (req, res, next) => {
  try {
    res.json(await kids.searchPartner(req.params.value, req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await kids.create(req.body));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.createPartner,
    };
    res.status(500).json(response);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await kids.update(req.params.id, req.body));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.editPartner,
    };
    res.status(500).json(response);
  }
});

router.get('/by-id/:value', async (req, res, next) => {
  try {
    res.json(await kids.getKidById(req.params.value));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

module.exports = router;
