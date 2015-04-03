'use strict';

var path     = require('path'),
    fs       = require('fs'),
    mongoose = require('mongoose');

module.exports = function(config){
  var modelsPath = config.root + '/app/models', db;

  mongoose.connect(config.db);
  db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database');
  });

  // Load all database models
  fs.readdirSync(modelsPath).forEach(function (filename) {
    if (path.extname(filename) === '.js') {
      require(path.join(modelsPath, filename));
    }
  });
};
