const express = require('express');
const app = new express();
const appartList = require('./routes/appartList');
const infoRequest = require('./routes/insertRequestInfo');
const home = require('./routes/home');
const stanze = require('./routes/stanze');
const bodyParser = require('body-parser');
//const Joi = require('joi');
const path = require('path');
const mongoose = require('mongoose');
const appartModel = require('./models/appartamentiModel');

app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.json());  //adding middlewere (provided by Express)
app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'views'));  //setup rendering engine ejs

// const moviesGenres = [
//      {id:1, genres:"action"},
//     {id:2, genres:"dramma"},
//     {id:3, genres:"thriller"}
//     ];

app.use('/api-appartlist',appartList);   
app.use('/',home);
app.use('/stanze',stanze);
app.use('/api-insert-info',infoRequest);


var port = process.env.PORT || 3000 ;
app.listen(port,function(){console.log(`listening at port ${port}...`)});