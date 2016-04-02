var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//define model
const userSchema = new Schema({
  email: {
   type: String,
   unique: true,
   lowercase: true
  },
  password: String
});
//create model

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      console.log(hash);
      user.password = hash;
      next();
    });
  });
});

const ModelClass = mongoose.model('user', userSchema);

//export model
module.exports = ModelClass;
