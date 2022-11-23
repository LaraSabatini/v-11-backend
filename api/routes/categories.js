const express = require('express');

const router = express.Router();
const categories = require('../services/categories');

router.get('/', async (req, res, next) => {
  try {
    res.json(await categories.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
