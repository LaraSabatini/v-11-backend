const express = require('express');
const router = express.Router();
const users = require('../services/users');

/* GET users */
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`Error while getting the users `, err.message);
    next(err);
  }
});

/* SEARCH users */
router.get('/:name/:password', async function(req, res, next) {
  try {
    res.json(await users.searchUser(req.params.name, req.params.password, req.query.page));
    console.log(req);
  } catch (err) {
    console.error(`The user data is wrong `, err.message);
    next(err);
  }
});

module.exports = router;