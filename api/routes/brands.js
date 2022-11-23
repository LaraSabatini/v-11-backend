const express = require('express');

const router = express.Router();
const brands = require('../services/brands');

router.get('/', async (req, res, next) => {
  try {
    res.json(await brands.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
