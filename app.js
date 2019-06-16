const express = require('express');
const app = new express();

//routes to view
const home = require('./routes/home');
const stanze = require('./routes/stanze');
const homeAdminAppart = require('./routes/adminApp');
const addUpdateAppart = require('./routes/adminAddUpdateAppart');
const adminImgAppart = require('./routes/adminImgAppart');
const delImgAppart = require('./routes/api/deleteImg');

//api
const appartList = require('./routes/api/appartList');
const infoRequest = require('./routes/api/insertRequestInfo');
const adminAppart = require('./routes/api/adminAppart');
const apiAaddUpdateAppart = require('./routes/api/addUpdateAppart');
const apiUpload = require('./routes/api/upload');

const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const appartModel = require('./models/appartamentiModel');
//const Joi = require('joi');

//connect to db
var uri = "mongodb://paoloDemoAtlas:***REMOVED***@cluster0-shard-00-00-0ega5.azure.mongodb.net:27017,cluster0-shard-00-01-0ega5.azure.mongodb.net:27017,cluster0-shard-00-02-0ega5.azure.mongodb.net:27017/BGStanza?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
mongoose.connect(uri,{useNewUrlParser:true},function(err){
                                            if (err) {
                                                console.log ('ERROR connecting to: ' + uri + '. ' + err);
                                            } else {
                                                console.log ('Succeeded connected to: ' + uri); 
                                            }
  });

app.use(bodyParser.urlencoded({ extended:true})); // put url code into req.body
app.use(express.json());                          // adding middlewere (provided by Express) convert body-> json
app.use(express.static('public'));                // set public folder

// set render engine ejs
app.set('views',[path.resolve(__dirname,'views'),path.resolve(__dirname,'views/admin')]);  //setup rendering engine ejs
app.set('view engine','ejs');

app.use('/api-appartlist',appartList);   
app.use('/api-admin-appart',adminAppart);
app.use('/api-insert-info',infoRequest);
app.use('/api-add-update-appart',apiAaddUpdateAppart);
app.use('/api-upload',apiUpload);
app.use('/api/admin/img/delete',delImgAppart);


app.use('/',home);
app.use('/stanze',stanze);
app.use('/admin/appartlist',homeAdminAppart);
app.use('/admin/add-update-appart',addUpdateAppart);
app.use('/admin/imgappart',adminImgAppart);


var port = process.env.PORT || 3000 ;
app.listen(port,function(){console.log(`listening at port ${port}...`)});