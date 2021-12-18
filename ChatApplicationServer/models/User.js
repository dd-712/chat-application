const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    Connections_Id: [{
        type: String,
        default: ''
    }],
    admin: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);