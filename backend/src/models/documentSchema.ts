const mongoose = require('mongoose');
const User = require('./userSchema');

const docSchema = new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    docName:{
        type: String,
        required: true
    },
    docSize:{
        type: Number,
        required: true
    },
    docType:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
})

const document = mongoose.model("docModel",docSchema);

export {document}