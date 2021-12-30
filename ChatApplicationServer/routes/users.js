var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
const authenticate = require('../authenticate');
const cors = require('./cors');

var router = express.Router();
router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); });
router.use(bodyParser.json());
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
  User.find(req.require)
    .then((us) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(us);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/signup', cors.corsWithOptions, function (req, res, next) {
  //console.log(req.body.username.firstname);
  User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        // console.log(err.message);
        err = new Error(err.message)
        err.status = 500;
        return next(err);
      }
      else {

        if (req.body.firstname)
          user.firstname = req.body.firstname;
        if (req.body.lastname)
          user.lastname = req.body.lastname;
        user.admin = true
        user.save((err, user) => {
          if (err) {
            err = new Error(err.message)
            err.status = 500;
            return next(err);
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    }, (err) => next(err));
}, (err) => next(err));

router.post('/login', cors.cors, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Login Unsuccessful!', err: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Login Unsuccessful!', err: 'Could not login user' });
      }
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, token: token, status: 'You are successfully logged In' });
    })
  })(req, res, next);
});


router.post('/changeUsername', authenticate.verifyUser, cors.corsWithOptions, function (req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      var newUsername = req.body.username;
      user.username = "";
      User.findOne({ username: newUsername })
        .then((userFound) => {
          if (userFound == null) {
            user.username = newUsername;
            user.save()
              .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ 'statusValue': 'Username changed succesfully' });
              }, (err) => next(err))
              .catch((err) => next(err));
          }
          else {
            user.username = req.user.username;
            user.save();
            err = new Error('Username already taken by someone');
            err.status = 400;
            return next(err);
          }
        }, (err) => next(err))
    }, (err) => next(err))
    .catch((err) => next(err));
}, (err) => next(err));

router.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Login Unsuccessful!', err: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Login Unsuccessful!', err: 'Could not login user' });
      }
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, token: token, status: 'You are successfully logged In' });
    })
  })(req, res, next);
});

router.get('/logout', cors.corsWithOptions, (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.route('/connections')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
    User.findById(req.user._id)
      .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user.Connections_Id);
        console.log(res);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        var ind = -1, c = 0;
        for (var i = 0; i < user.Connections_Id.length; i++) {
          var ob = user.Connections_Id[i];
          //console.log(ob);
          if (ob.username == req.body.username) {
            ind = c;
            req.body._id = ob._id;
            break;
          }
          c++;
        }
        if (ind != -1) {
          err = new Error('Person alread exist in list of connections');
          err.status = 403;
          return next(err);
        }
        else {
          //console.log(req.body.username);
          //console.log(typeof(req.body.username));
          User.find({ 'username': new RegExp(req.body.username, 'i') }, function (err, person) {
            if (err) {
              err = new Error('Person not Found!!!');
              err.status = 404;
              return next(err);
            }
            else {
              //console.log(person);
              var found = -1;
              for (var i = 0; i < person.length; i++) {
                if (person[i].username == req.body.username) {
                  found = i;
                  break;
                }
              }
              if (found == -1) {
                err = new Error('Person not Found!!!');
                err.status = 404;
                return next(err);
              }
              req.body._id = person[i]._id;
              user.Connections_Id.push(req.body);
              user.save()
                .then((connections) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(connections);
                }, (err) => next(err))
                .catch((err) => next(err));
            }
          }, (err) => next(err));
        }
      }, (err) => next(err))
      .catch((err) => { console.log(err); next(err) });
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /user/connections');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        var ind = -1, c = 0;
        for (var i = 0; i < user.Connections_Id.length; i++) {
          var ob = user.Connections_Id[i];
          //console.log(ob);
          if (ob._id == req.body._id) {
            ind = c;
            break;
          }
          c++;
        }
        if (ind > -1) {
          user.Connections_Id.splice(ind, 1);
          user.save()
            .then((resp) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else {
          err = new Error('Id not found in list of connections');
          err.status = 403;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  });

router.get('/checkJWTToken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'JWT invalid!', success: false, err: info });
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'JWT valid!', success: true, user: user });
    }
  })(req, res);
});



module.exports = router;