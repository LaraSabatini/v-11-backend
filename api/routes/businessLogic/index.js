const express = require('express');

const router = express.Router();
const businessLogic = require('../../services/businessLogic');
const errorResponses = require('../../../strings/errorMessages');

router.post('/create-partner', async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    res.json(await businessLogic.createPartner(req.body.partner, req.body.partnerPayment, req.body.boulderPayment));
  } catch (err) {
    next(err);
    const response = {
      status: 500,
      message: errorResponses.createPartner,
    };
    res.status(500).json(response);
  }
});

router.get('/finances/date=:date', async (req, res, next) => {
  try {
    res.json(await businessLogic.getDataForFinances(req.params.date, req.query.page));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
