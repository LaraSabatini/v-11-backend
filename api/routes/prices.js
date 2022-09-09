const express = require('express');
const router = express.Router();
const prices = require('../services/prices');

/* GET prices */
router.get('/', async function(req, res, next) {
  try {
    res.json(await prices.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the prices `, err.message);
    next(err);
  }
});

/* PUT price */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await prices.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating price`, err.message);
      next(err);
    }
  });
  

module.exports = router;