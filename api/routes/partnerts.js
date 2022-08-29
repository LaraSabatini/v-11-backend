const express = require('express');
const router = express.Router();
const partners = require('../services/partners');

/* GET partners */
router.get('/', async function(req, res, next) {
  try {
    res.json(await partners.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the partners `, err.message);
    next(err);
  }
});

/* SEARCH partners */
// router.get('/:value', async function(req, res, next) {
//     try {
//       res.json(await partners.searchPartner(req.params.value, req.query.page));
//       console.log(req);
//     } catch (err) {
//       console.error(`Error while getting search `, err.message);
//       next(err);
//     }
// });

// /* POST partners */
// router.post('/', async function(req, res, next) {
//   try {
//     res.json(await partners.create(req.body));
//   } catch (err) {
//     console.error(`Error while creating partner`, err.message);
//     next(err);
//   }
// });

module.exports = router;