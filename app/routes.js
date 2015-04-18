'use strict';

var passport = require('passport'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut,

    mongoose = require('mongoose'),

    User = mongoose.model('User'),
    Room = mongoose.model('Room');

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('home');
  });

  app.get('/register',
    ensureLoggedOut('/chat'),
    function(req, res) {
      res.render('register');
    }
  );

  app.post('/register',
    ensureLoggedOut('/chat'),
    function(req, res) {
      var error = null;

      if (!req.params.username) {
        error = 'The username field is required.';
      } else if (!req.params.password) {
        error = 'The password field is required.';
      } else if (req.params.password != req.params.password_confirmation) {
        error = 'The password confirmation does not match.';
      }

      if (error !== null) {
        return res.render('register', { error: error });
      }

      var user = new User();
        user.username    = req.params.username;
        user.displayName = user.username;
        user.password    = req.params.password;

      user.save(function(err) {
        if (err) {
          return res.render('register', { error: 'An unknown error occured.' });
        }

        res.redirect('/login');
      });
    }
  );

  app.get('/login',
    ensureLoggedOut('/chat'),
    function(req, res) {
      res.render('login');
    }
  );

  app.post('/login',
    ensureLoggedOut('/chat'),
    passport.authenticate('local', {
      successRedirect: '/chat',
      failureRedirect: '/login'
    })
  );

  app.get('/logout',
    ensureLoggedIn('/login'),
    function(req, res) {
      req.logout();
      res.redirect('/');
    });

  app.post('/room/create',
    ensureLoggedIn('/login'),
    function(req, res) {
      var error = null;

      if (!req.body.name) {
        error = 'The room name field is required.';
      }

      if (error !== null) {
        return res.redirect('/chat');
      }

      var room = new Room();
        room.name = req.body.name;
        room.master = req.user;
        room.users = [req.user];

      room.save(function(err) {
        return res.redirect('/chat');
      });

    }
  );

  app.post('/room/member/add',
    ensureLoggedIn('/login'),
    function(req, res) {
      var error = null;

      if (!req.params.username) {
        error = 'The username field is required.';
      }

      
    }
  );

  app.get('/chat',
    ensureLoggedIn('/login'),
    function(req, res) {
      req.user.token = req.user.generateToken();
      req.user.save();

      res.render('chat', { token: req.user.token });
    }
  );
};
