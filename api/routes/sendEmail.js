const express = require('express');
const router = express.Router();
const emailer = require('../../emailer')

router.post('/send-email', async function(req, res, next) {
    try {
        emailer.sendMail(req.body.recipients, req.body.subject, req.body.text, req.body.category)
         res.send({ 
             info: "Mail sent successfully",
         })
    } catch (err) {
      console.error(`Error while sending email`, err.message);
      next(err);
    }
  });

module.exports = router;
