const express = require('express');

const router = express.Router();
const students = require('../services/lessonStudents');
const errorResponses = require('../../strings/errorMessages');

const errorResSearch = {
  status: 500,
  message: errorResponses.search,
};

router.get('/', async (req, res, next) => {
  try {
    res.json(await students.getStudentPurchases(req.query.id));
  } catch (err) {
    next(err);
    res.status(500).json(errorResSearch);
  }
});

module.exports = router;
