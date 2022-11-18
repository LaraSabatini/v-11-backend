const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const path = require('path')
require('dotenv').config();

router.post('/close-till', async function(req, res) {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: "info@vonceescalada.com",
            pass: process.env.MAIL_PASS
        }
    });

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('../../views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    };

    transporter.use('compile', hbs(handlebarOptions))

    const mailOptions = {
        from: '"V11 - Club de Escalada" <info@vonceescalada.com>',
        to: req.body.recipients,
        subject: req.body.subject,
        template: 'closeTill',
        context:{
            date: req.body.data.date,
            tillSoftwareCash: req.body.data.till.software.cash,
            tillSoftwareMp: req.body.data.till.software.mp,
            tillSoftwareTotal: req.body.data.till.software.cash + req.body.data.till.software.mp,
            tillRealCash: req.body.data.till.real.cash,
            tillRealMp: req.body.data.till.real.mp,
            tillRealTotal: req.body.data.till.real.cash + req.body.data.till.real.mp,
            earningsBoulderCash: req.body.data.earningsBoulder.cash,
            earningsBoulderMp: req.body.data.earningsBoulder.mp,
            earningsBoulderTotal: req.body.data.earningsBoulder.cash + req.body.data.earningsBoulder.mp,
            earningsStoreCash: req.body.data.earningsStore.cash,
            earningsStoreMp: req.body.data.earningsStore.mp,
            earningsStoreTotal: req.body.data.earningsStore.cash + req.body.data.earningsStore.mp,
            freePassIndividual: req.body.data.freePass.individual,
            freePassFourPack: req.body.data.freePass.fourPack,
            freePassEightPack: req.body.data.freePass.eightPack,
            freePassTotal: req.body.data.freePass.total,
            lessonsIndividual: req.body.data.lessons.individual,
            lessonsFourPack: req.body.data.lessons.fourPack,
            lessonsEightPack: req.body.data.lessons.eightPack,
            lessonsTotal: req.body.data.lessons.total,
            month: req.body.data.month,
            amountOfPeople: req.body.data.amountOfPeople,
            user: req.body.data.user,
            hours: req.body.data.hour,
        }
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