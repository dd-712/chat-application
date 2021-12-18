const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Text = new Schema({
    userID: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ''
    }
})

const ChatSchema = new Schema({
    _ID: {
        type: String,
        required: true
    },
    Texts: [Text]
},
    {
        timestamps: true
    });

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;