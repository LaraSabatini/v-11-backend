const express = require('express');

const router = express.Router();
const users = require('../services/users');

router.get('/', async (req, res, next) => {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    next(err);
  }
});

router.get('/name=:name&password=:password', async (req, res, next) => {
  try {
    res.json(await users.searchUser(req.params.name, req.params.password, req.query.page));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
