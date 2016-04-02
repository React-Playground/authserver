var mongoose = require('mongoose');
var Schema = mongoose.Shema;


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
const ModelClass = mongoose.model('user', userSchema);

//export model
module.exports = ModelClass;
