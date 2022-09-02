const express = require('express');
const router = express.Router();
const brands = require('../services/brands');

/* GET brands */
router.get('/', async function(req, res, next) {
  try {
    res.json(await brands.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the brands `, err.message);
    next(err);
  }
});

module.exports = router;