'use strict';

/*jshint maxlen: 1000 */

var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env      = process.env.NODE_ENV || 'development';

var config = {
  env: env,
  root: rootPath,
  app: {
    name: 'chat',
  },
  db: 'mongodb://localhost/chat',
  cookie: { 
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 3600000
  },
  port: 3000
};

module.exports = config;
