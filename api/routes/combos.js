const express = require('express');
const router = express.Router();
const combos = require('../services/combos');

/* GET combos */
router.get('/', async function(req, res, next) {
  try {
    res.json(await combos.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the combos `, err.message);
    next(err);
  }
});

/* PUT combo */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await combos.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating price`, err.message);
      next(err);
    }
  });
  

module.exports = router;