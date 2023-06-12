import mongoose from "mongoose";

const transferSchema = new mongoose.Schema({
    toAddress:{
        type: String,
        required: true
    },
    fromAddress:{
        type:String,
        required: true
    },
    docId:{
        type:String,
        required: true
    },
})

const transferRecords = mongoose.model("transferRecords", transferSchema)

export {transferRecords}