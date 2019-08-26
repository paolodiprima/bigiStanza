const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name : {
        type : String,
        required: true,
        min: 3,
        max: 255
    },
    email : {
        type : String,
        min : 6,
        max : 255
    },
    password : {
        type: String,
        required : true,
        min : 6,
        max : 255
    },
    date : {
        type : Date,
        default: Date.now
    },
    role : {
        type: String,
        max : 255
    } 
});

module.exports = mongoose.model('User',userSchema);