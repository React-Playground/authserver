var passport = require('passport');
var User = require('../models/user');
var config = require('../config.js');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt
var LocalStrategy = require('passport-local');


//create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  //verify this user name and passord
   User.findOne({email: email}, function(err, user) {
     console.log(user, '&&&&&&&&&&&&&&&&&&&&');
     if (err) {
       return done(err);
     }
     if (!user) {
       return done(null, false);
     }

     user.comparePassword(password, function(err, isMatch) {
       if (err) {
         return done(err)
       }
       if (!isMatch) {
         return done(null, false);
       }


       console.log("*******************", user);
       return done(null, user);
     });

   });
});



//Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID int the payload exist in the database
  // if it does call done with that other
  // otherwise call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user)
    } else {
      done(null, false);
    }
  })
});


//Tell passport to this strategy
passport.use(jwtLogin);
passport.use(localLogin);
