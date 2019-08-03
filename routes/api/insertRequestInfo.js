const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const infoRequest = require('../../models/infoRequestModel');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY =  process.env.MAILGUN_KEY;
const DOMAIN = '***REMOVED***';
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

const dataMail = {
    from: 'BGStanza User <me@samples.mailgun.org>',
    to: 'paolo.diprima@gmail.com',
    subject: 'richiesta info da BGStanza',
    text: ''
  };



router.post('/', (req,res) => {
    dataMail.text = "msg from:" +req.body.email+"\n\n"+req.body.msg;
    mailgun.messages().send(dataMail, (error, body) => {
        console.log(body);
    });
    async function addInfoRequest() {
        const newInfoRequest = new infoRequest({
            name : req.body.name,
            surname: req.body.cognome,
          //  dob: new Date(1975,10,11),
            email: req.body.email,
            job: req.body.job,
            inDate: req.body.entrata,
            outDate: req.body.uscita,
            msg: req.body.msg
        });
        const result = await newInfoRequest.save();
        res.send(result);
    }   
    addInfoRequest();
});
module.exports = router;