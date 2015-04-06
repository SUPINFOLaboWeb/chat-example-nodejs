'use strict';

var passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,

    mongoose       = require('mongoose'),
    User           = mongoose.model('User');

module.exports = function(app, config) {
  passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { error: 'Incorrect username.' });
      }

      user.comparePassword(password, function(err, isMatch) {
        if (!isMatch) {
          return done(null, false, { error: 'Incorrect password.' });
        }

        done(null, user);
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
