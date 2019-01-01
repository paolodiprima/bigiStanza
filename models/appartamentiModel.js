const mongoose = require('mongoose');

var contract = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    holderName:     String,
    holderSurname:  String,
    holderDoB:      Date,
    holderJob:      String,
    inDate:         Date,
    outDate:        Date
});
var room = new mongoose.Schema({
    size:   Number,
    price:  Number,
    img:    [String],
    contracts: [contract]
});
var appartSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    internalName :  String,
    address :       String,
    cap :           Number,
    numRooms:       Number,
    numBathrooms:   Number,
    description:    String,
    imgAppart:      [String],
    services:       [String],
    rooms :         [room]
  },
  { collection: 'appartamenti' }
 );


 var appartModel = mongoose.model("appartamenti",appartSchema);
 module.exports = appartModel;