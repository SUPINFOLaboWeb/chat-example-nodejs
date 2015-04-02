'use strict';

var passport = require('passport');

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('home');
  });

  app.get('/register', function(req, res) {
    if(req.user) { return res.redirect(301, '/chat'); }

    res.render('register');
  });

  app.post('/register', function(req, res) {
    var user = new User();
      user.username    = req.param('username');
      user.displayName = user.username;
      user.password    = req.param('password');

  })

  app.get('/login', function(req, res) {
    if(req.user) { return res.redirect(301, '/chat'); }

    res.render('login');
  })

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/chat',
    failureRedirect: '/login'
  }));

  app.get('/chat', function(req, res) {
    res.render('chat');
  });
};
