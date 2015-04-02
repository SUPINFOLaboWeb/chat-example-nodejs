'use strict';

var passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy;

module.exports = function(app, config) {
  passport.use(new LocalStrategy(function(username, password, done) {

  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {

  });

  app.use(passport.initialize());
  app.use(passport.session());
};
