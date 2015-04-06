'use strict';

var express = require('express'),
    app = express(),
    MemoryStore = require('express-session').MemoryStore,

    config = require('./app/config/config');

var sessionStore = new MemoryStore();

require(config.root + '/app/config/database')(config);
require(config.root + '/app/config/express')(app, sessionStore, config);
require(config.root + '/app/config/passport')(app, config);
require(config.root + '/app/routes')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;

  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
// (requires all 4 arguments to be considered an error handler)
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });

    console.error(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });

  console.error(err.message);
});

app.set('port', process.env.PORT || config.port);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port', server.address().port);
});

require(config.root + '/app/config/io')(server, sessionStore, config);
