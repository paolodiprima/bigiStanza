const express = require('express');
const router = new express.Router();
const Joi = require('@hapi/joi');
const  {schemaValildationSender} = require('../../models/validationModels');
const infoRequest = require('../../models/infoRequestModel');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY =  process.env.MAILGUN_KEY;
const DOMAIN = process.env.DOMAIN;
//const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

const dataMail = {
    from: 'BGStanza User <me@samples.mailgun.org>',
    to: 'paolo.diprima@gmail.com',
    subject: 'richiesta info da BGStanza',
    text: ''
  };

router.post('/', (req,res) => {
    
    //dataMail.text = "msg from:" +req.body.email+"\n\n"+req.body.msg;
    // mailgun.messages().send(dataMail, (error, body) => {
    //     console.log(body);
    //     console.log("nel send mail addinfoRequest");
    // });

    async function addInfoRequest() {
        console.log(typeof req.body.entrata);
        const newInfoRequest = new infoRequest({
            name : req.body.name,
            surname: req.body.cognome,
            email: req.body.email,
            job: req.body.job,
            inDate: req.body.entrata,
            outDate: req.body.uscita,
            msg: req.body.msg
        });
        const result = await newInfoRequest.save();
        res.send(result);
    } 
    const resultValidation = Joi.validate(req.body,schemaValildationSender);
    if (resultValidation.error){
       // console.log(typeof req.body.entrata);
        res.status(400).send(resultValidation.error.details[0].message);
        return;
    }  
    addInfoRequest();
});


module.exports = router;

