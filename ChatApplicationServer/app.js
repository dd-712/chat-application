var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var passport = require('passport');
const multer = require('multer');
const saltedMd5 = require('salted-md5');
const cors = require('./routes/cors');
const authenticate = require('./authenticate');
const Chat = require('./models/Chat');

const upload = multer({ storage: multer.memoryStorage() })
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');

const url = config.mongoUrl;
const connect = mongoose.connect(process.env.mongoUrl,
  {
    config: { autoIndex: false },
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
connect.then((db) => {
  console.log('Database connected!');
}, (err) => { console.log(err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);

var admin = require("firebase-admin");
const serviceAccount = require('./File wich contains private key of firebase database');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "Your database Url goes here",
  storageBucket: process.env.bucket_url
});


app.locals.bucket = admin.storage().bucket()
app.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
app.post('/UploadFile', cors.corsWithOptions, upload.single('File'), async (req, res) => {
  const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
  const fileName = name + path.extname(req.file.originalname);
  await app.locals.bucket.file(fileName).createWriteStream().end(req.file.buffer);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ 'file': fileName });
});

app.get('/UploadFile/download/:filename', cors.cors, authenticate.verifyUser, async (req, res, next) => {
  try {
    const fileRef = admin.storage().bucket().file(req.params.filename);
    const hash = await fileRef.download();
    res.contentType(fileRef.metadata.contentType);
    res.statusCode = 200;
    res.end(hash[0], 'binary');
  } catch (err) {
    res.send(err);
  }

});

app.delete(("/UploadFile/delete"), authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
  Chat.findById(req.body._Id)
    .then((chat) => {
      if (req.user._id != chat.sender && req.user._id != chat.receiver) {
        err = new Error('You are not allowed to delete this post');
        err.status = 403;
        return next(err);
      }
      else {
        if (chat.data == 0) {
          const fileRef = admin.storage().bucket().file(chat.File.filename);
          fileRef.delete().then(function () {
            var k = 1;
          }).catch(function (error) {
            console.log(error.message);
          });
        }
        Chat.deleteOne(chat)
          .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
          }, (err) => next(err))
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
