const express = require('express');

const router = express.Router();
const partners = require('../services/partners');
const errorResponses = require('../../strings/errorMessages');

const errorResSearch = {
  status: 500,
  message: errorResponses.search,
};

router.get('/', async (req, res, next) => {
  try {
    res.json(await partners.getMultiple(req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/:value', async (req, res, next) => {
  try {
    res.json(await partners.searchPartner(req.params.value, req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/by-id/:value', async (req, res, next) => {
  try {
    res.json(await partners.getPartnerById(req.params.value));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/students/:value', async (req, res, next) => {
  try {
    res.json(await partners.filterStudents(req.params.value, req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.get('/free-pass/:value', async (req, res, next) => {
  try {
    res.json(await partners.filterFreePass(req.params.value, req.query.page));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await partners.create(req.body));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.createPartner,
    };
    res.status(500).json(response);
  }
});

/* PUT partner */
router.put('/:id', async (req, res, next) => {
  try {
    res.json(await partners.update(req.params.id, req.body));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.editPartner,
    };
    res.status(500).json(response);
  }
});

/* DELETE partner */
router.delete('/:id', async (req, res, next) => {
  try {
    res.json(await partners.removePartner(req.params.id));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.deletePartner,
    };
    res.status(500).json(response);
  }
});

module.exports = router;
