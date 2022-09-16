const express = require('express');
const router = express.Router();
const boulderPurchases = require('../services/boulder');

/* GET purchases */
router.get('/', async function(req, res, next) {
  try {
    res.json(await boulderPurchases.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting payments `, err.message);
    next(err);
  }
});

/* POST purchase */
router.post('/', async function(req, res, next) {
  try {
    res.json(await boulderPurchases.create(req.body));
  } catch (err) {
    console.error(`Error while creating payment`, err.message);
    next(err);
  }
});

module.exports = router;