const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// referece format for file not used this using directly as object
const FileDisc={
    filename:{
        type:String,
    },
    title:{
        type:String,
    }
};

const ChatSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    data:{
        type:Number,
        default:1
    },
    File:{
        type:Object,
        default:{'filename':'Not a file','title':'No file'}
    }
},
    {
        timestamps: true
    });

ChatSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Chat', ChatSchema);
