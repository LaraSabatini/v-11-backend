const express = require('express');
const errorResponses = require('../../strings/errorMessages');

const router = express.Router();
const categories = require('../services/categories');

router.get('/', async (req, res, next) => {
  try {
    res.json(await categories.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await categories.create(req.body));
  } catch (err) {
    next(err);
    res.status(500).json(errorResponses.createCategory);
  }
});

module.exports = router;
