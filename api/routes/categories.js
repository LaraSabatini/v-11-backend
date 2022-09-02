const express = require('express');
const router = express.Router();
const categories = require('../services/categories');

/* GET users */
router.get('/', async function(req, res, next) {
  try {
    res.json(await categories.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the users `, err.message);
    next(err);
  }
});

module.exports = router;