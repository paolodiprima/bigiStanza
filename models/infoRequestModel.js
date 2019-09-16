const mongoose = require('mongoose');

var infoRequestSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    name:     String,
    surname:  String,
    dob:      Date,
    email:    String,
    number:   String,
    job:      String,
    inDate:   Date,
    outDate:  Date,
    msg :     String,
    date : {
        type : Date,
        default: Date.now
    }
},
{ collection: 'infoRequests' }
);


 
 var inforRequestModel = mongoose.model("infoRequest",infoRequestSchema);
 module.exports = inforRequestModel;