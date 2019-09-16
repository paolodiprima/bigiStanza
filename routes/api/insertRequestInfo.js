const express = require('express');
const router = new express.Router();
const Joi = require('@hapi/joi');
const  {schemaValildationSender} = require('../../models/validationModels');
const infoRequest = require('../../models/infoRequestModel');
//const mailgun = require('mailgun-js');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY =  process.env.MAILGUN_KEY;
const DOMAIN = process.env.DOMAIN;
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

const dataMail = {
    from: '',
    to: 'paolo.diprima@gmail.com',
    subject: 'richiesta info per BGStanza',
    text: ''
  };

router.post('/', (req,res) => {
    

    async function addInfoRequest() {

        // input validation
        const resultValidation = Joi.validate(req.body,schemaValildationSender);
        if (resultValidation.error){
            res.status(400).send(resultValidation.error.details[0].message);
            return;
        }  

        // send email
        dataMail.text = "msg from:" +req.body.name+"\n\n"+req.body.msg;
        dataMail.from = req.body.email;
        mailgun.messages().send(dataMail, (error, body) => {
            if (error) throw error;
           
        });

        
        // save msg into db
        const newInfoRequest = new infoRequest({
            name : req.body.name,
            email: req.body.email,
            // job: req.body.job,
            // inDate: req.body.entrata,
            // outDate: req.body.uscita,
            msg: req.body.msg
        });
        const result = await newInfoRequest.save();
        res.send(result);
    } 
    // call async function
    addInfoRequest();

});

router.post('/:idAppart', (req,res) => {

        // dataMail.text = "msg from:" +req.body.email+"\n\n"+req.body.msg+"\n\n check-in"+req.body.entrata+"--check-out"+req.body.uscita;
        // mailgun.messages().send(dataMail, (error, body) => {
        //     console.log(body);
        //     console.log("nel send mail addinfoRequest");
        // });

        async function addInfoRequest() {


        // input validation
        const resultValidation = Joi.validate(req.body,schemaValildationSender);
        if (resultValidation.error){
            res.status(400).send(resultValidation.error.details[0].message);
            return;
        }  
        
        // save msg into db
        const newInfoRequest = new infoRequest({
            name : req.body.name,
            email: req.body.email,
            // job: req.body.job,
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

