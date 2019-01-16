const express = require('express');
const app = new express();

//routes to view
const home = require('./routes/home');
const stanze = require('./routes/stanze');
const homeAdminAppart = require('./routes/adminApp');
const addUpdateAppart = require('./routes/adminAddUpdateAppart');

//api
const appartList = require('./routes/api/appartList');
const infoRequest = require('./routes/api/insertRequestInfo');
const adminAppart = require('./routes/api/adminAppart');
const bodyParser = require('body-parser');

const path = require('path');
const mongoose = require('mongoose');
const appartModel = require('./models/appartamentiModel');
//const Joi = require('joi');

app.use(bodyParser.urlencoded({ extended:true})); // put url code into req.body
app.use(express.json());  //adding middlewere (provided by Express) convert body-> json
app.use(express.static('public'));

// app.set('view engine','ejs');
app.set('views',[path.resolve(__dirname,'views'),path.resolve(__dirname,'views/admin')]);  //setup rendering engine ejs
app.set('view engine','ejs');


app.use('/api-appartlist',appartList);   
app.use('/',home);
app.use('/stanze',stanze);
app.use('/api-insert-info',infoRequest);
app.use('/api-admin-appart',adminAppart);
app.use('/admin/appartlist',homeAdminAppart);
app.use('/admin/add-update-appart',addUpdateAppart);

var port = process.env.PORT || 3000 ;
app.listen(port,function(){console.log(`listening at port ${port}...`)});