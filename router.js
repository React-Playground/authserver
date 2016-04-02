var auth = require('./controllers/auth.js');
module.exports = function(app) {
  app.post('/signup', auth.signup);
}
