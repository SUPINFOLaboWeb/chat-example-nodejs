'use strict';

var express      = require('express'),
    session      = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    flash        = require('connect-flash'),
    jade         = require('jade');

module.exports = function(app, config) {
  app.use(express.static(config.root + '/public'));

  app.use(cookieParser());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(session({
    name: 'sid',
    cookie: config.cookie,
    secret: 'key',
    saveUninitialized: true
  }));

  app.use(flash());

  app.set('view engine', 'jade');
  app.set('views', config.root + '/app/views');
};
