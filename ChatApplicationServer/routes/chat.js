const express = require('express');
const bodyParser = require('body-parser');
const Chat = require('../models/Chat');
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const authenticate = require('../authenticate');
const cors = require('./cors');
require('dotenv').config();

const router = express.Router();

function encryptMessage(text) {
    let message = CryptoJS.AES.encrypt(text, process.env.secretKey).toString();
    return message;
}

function decryptMessage(text) {
    let message = CryptoJS.AES.decrypt(text, process.env.secretKey).toString(CryptoJS.enc.Utf8);
    return message;
}

router.get(("/getChat"), cors.corsWithOptions, (req, res) => {
    Chat.find({
        $or: [
            { $and: [{ sender: req.body.sender }, { receiver: req.body.receiver }] },
            { $and: [{ sender: req.body.receiver }, { receiver: req.body.sender }] }
        ]
    }, (err, messages) => {
        const chats = {
            chat: []
        };
        console.log(messages);
        for (let i = 0; i < messages.length; i++) {
            chats.chat.push({
                sender: messages[i].sender,
                receiver: messages[i].receicer,
                text: decryptMessage(messages[i].message),
                time: messages[i].createdAt
            });
        }

        res.statusCode = 200;
        res.json(chats);
    })
})

router.post(("/addChat"), cors.corsWithOptions, (req, res) => {
    const encrypt = encryptMessage(req.body.message);

    const chat = new Chat({
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: encrypt
    })
    chat.save();

    res.statusCode = 200;
    res.json({ status: "Saved" });
})

router.delete(("/deleteChat"), cors.corsWithOptions, (req, res) => {
    Chat.findByIdAndDelete(req.body.id, (err) => {
        console.log(err);
    });
    res.statusCode = 200;
    res.json({ status: "Deleted" });
})

module.exports = router;