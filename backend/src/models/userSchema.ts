const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    pin:{
        type:Number,
    },
    address:{
        type:String,
        unique:true,
    },
    isProfileCompleted:{
        type:Boolean,
        default:false
    }
});

const User = mongoose.model("User",userSchema)

export {User}