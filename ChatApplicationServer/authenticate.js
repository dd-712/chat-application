var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/User');
var JwtStrategy=require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;
var jwt=require('jsonwebtoken');
require('dotenv').config();
//var FacebookTokenStrategy=require('passport-facebook-token');

var config=require('./config');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken=function(user){
    return jwt.sign(user,process.env.secretKey,{expiresIn:3600});
};

var opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=process.env.secretKey;
exports.jwtPassport=passport.use(new JwtStrategy(opts,
    (jwt_payload,done)=>{
        User.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err)
            {
                return done(err,false);
            }
            else if(user)
            {
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        });
    }));
exports.verifyAdmin=function(req,res,next)
{
    if(req.user.admin)
    return next();
    else
    {
        var err=new Error('You are not authorized to perform this operation');
        err.status=403;
        return next(err);
    }
}
exports.verifyUser=passport.authenticate('jwt',{session:false});
