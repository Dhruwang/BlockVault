const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    pin:{
        type:Number,
    },
    address:{
        type:String,
    },
    profileIsCompleted:{
        type:Boolean,
    }
});

const User = mongoose.model("User",userSchema)

export {User}