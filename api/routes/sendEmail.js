const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/', async function(req, res) {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: "info@vonceescalada.com",
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: "info@vonceescalada.com",
        to: req.body.recipients,
        subject: req.body.subject,
        text: req.body.text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.status(500).send(error.message)
        } else {
            const response = {
                status: 200,
            }
            res.status(200).json(response)
        }
    })
});

module.exports = router;