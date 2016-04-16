var jwt = require('jwt-simple');
var config = require('../config.js');
var User = require('../models/user.js');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({token: tokenForUser(req.user)});
}

exports.signup = function(req, res, next) {
  // see if a user with the given email exist
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email}, function(err, existingUser){

    if (err) {
      return next(err);
    }

    //if a user with eamil does exist return error
    if (existingUser) {
      return res.status(422).send({error: 'Email in use'});
    }

    if (!email || !password) {
      return res.status(422).send({error: 'Must provide email and password'})
    }

    const user = new User({
      email: email,
      password: password
    })

    user.save(function(err) {
      if (err) {
        return next(err)
      }

      res.json({token: tokenForUser(user)});
    });


  })


  //if a user does not exists create and save password

  //Respond with status
}

