// init
const express = require('express');
const app = new express();

// manage  Environment variables
const dotenv = require('dotenv');
dotenv.config();

//routes to view
const home = require('./routes/home');
const stanze = require('./routes/stanze');
const homeAdminAppart = require('./routes/adminApp');
const addUpdateAppart = require('./routes/adminAddUpdateAppart');
const adminImgAppart = require('./routes/adminImgAppart');
const delImgAppart = require('./routes/api/deleteImg');
const adminContracts = require('./routes/adminContracts');

//api
const appartList = require('./routes/api/appartList');
const infoRequest = require('./routes/api/insertRequestInfo');
const adminAppart = require('./routes/api/adminAppart');
const apiAddUpdateAppart = require('./routes/api/addUpdateAppart');
const apiDeleteAppart = require('./routes/api/adminDeleteAppart');
const apiComuni = require('./routes/api/adminComuni');
const apiUpload = require('./routes/api/upload');
const apiAppartNameList = require('./routes/api/appartNameList');
const apiAppartRoomsList = require('./routes/api/adminRoomsList');
const apiRoomContracts = require('./routes/api/adminRoomContract');
const apiAdminUpdateContract = require('./routes/api/adminUpdateContract');
const apiAdminInsertContract = require('./routes/api/adminInsertContract');
const apiCheckDateContract = require('./routes/checkDateContract');

//middlewere
const checkDateContract = require('./routes/checkDateContract');

const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const appartModel = require('./models/appartamentiModel');
// from git
 

//connect to db
mongoose.connect(process.env.DB_CONNECT_MIN,{useNewUrlParser:true},function(err){
                                            if (err) {
                                                console.log ('ERROR connecting to: ' + process.env.DB_CONNECT_MIN + '. ' + err);
                                            } else {
                                                console.log ('Succeeded connected to: ' + process.env.DB_CONNECT_MIN); 
                                            }
  });

// middlewere express
app.use(bodyParser.urlencoded({ extended:true})); //  put url code (query string) into req.body
app.use(express.json());                          //  take data from body json and put it in req.body
app.use(express.static('public'));                //  set public folder


// set render engine ejs
app.set('views',[path.resolve(__dirname,'views'),path.resolve(__dirname,'views/admin')]);  //setup rendering engine ejs
app.set('view engine','ejs');

app.use('/api-appartlist',appartList);   
app.use('/api-admin-appart',adminAppart);
app.use('/api-add-update-appart',apiAddUpdateAppart);
app.use('/api-upload',apiUpload);
app.use('/api/comuni',apiComuni);
app.use('/api/admin/img/delete',delImgAppart);
app.use('/api/deleteAppart',apiDeleteAppart);
app.use('/api-appartNameList',apiAppartNameList);
app.use('/api-adminRoomList',apiAppartRoomsList);
app.use('/api-roomContracts',apiRoomContracts);
app.use('/api/addUpdateContract/',apiAdminUpdateContract); // aggiungere middleware ?
app.use('/api-insertContract',apiAdminInsertContract);  // aggiungere middleware ?
app.use('/api/checkdatecontract',apiCheckDateContract);

app.use('/',home);
app.use('/stanze',stanze);
app.use('/api-insert-info',infoRequest);
app.use('/admin/appartlist',homeAdminAppart);
app.use('/admin/add-update-appart',addUpdateAppart);
app.use('/admin/imgappart',adminImgAppart);
app.use('/admin/contracts',adminContracts);


var port = process.env.PORT || 3000 ;
app.listen(port,function(){console.log(`listening at port ${port}...`)});
