const express = require('express');

const router = express.Router();
const brands = require('../services/brands');
const errorResponses = require('../../strings/errorMessages');

router.get('/', async (req, res, next) => {
  try {
    res.json(await brands.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await brands.create(req.body));
  } catch (err) {
    next(err);
    res.status(500).json(errorResponses.createBrand);
  }
});

module.exports = router;
