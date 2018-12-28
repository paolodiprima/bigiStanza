const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
//const Joi = require('joi');
const path = require('path');
const mongoose = require('mongoose');

app.use(express.json());  //adding middlewere (provided by Express)
app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'views'));  //setup rendering engine ejs

const moviesGenres = [
    {id:1, genres:"action"},
    {id:2, genres:"dramma"},
    {id:3, genres:"thriller"}
    ];
app.get('/', (req,res) => {
    res.render('index',{}); //passare oggetto lista appartamenti
});

//app.get()

var port = process.env.PORT || 3000 ;
app.listen(port,function(){console.log(`listening at port ${port}...`)});