const mongoose = require('mongoose');

var comuniSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    Comune:     String,
    cap:  String,
    sigla:    String,
  
},
{ collection: 'comuni' }
);


 
 var comuniModel = mongoose.model("comuni",comuniSchema);
 module.exports = comuniModel;