var passportService = require('./services/passport.js');
var passport = require('passport');
var auth = require('./controllers/auth.js');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSingin = passport.authenticate('local', {session: false});

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({hi: 'there'});
  })
  app.post('/signin', requireSingin, auth.signin)
  app.post('/signup', auth.signup);
}
