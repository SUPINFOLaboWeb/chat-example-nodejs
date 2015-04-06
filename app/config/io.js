'use strict';

var socket = require('socket.io'),
    cookie = require('cookie'),

    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(server, sessionStore, config) {
  var io = socket(server);

  var _user = {},
      _room = {};

  io.on('connection', function(socket) {
    _user[socket.id] = {
      id: null,
      u: null,
      room: {}
    };

    var cookies = socket.request.headers.cookie;
    if(cookies) {
      var sessionId = cookie.parse(cookies)['sid'];

      if(sessionId) {
        sessionId = sessionId.slice(2, sessionId.lastIndexOf('.'));

        sessionStore.get(sessionId, function(err, session) {
          if(session) {
            _user[socket.id].id = session.passport.user;

            User.findById(_user[socket.id].id, function(err, user) {
              if(err) { return; }

              _user[socket.id].u = user;
            });
          }
        });
      }
    }

    //only if socket.io server is not attached to webserver
    io.on('authenticate', function(token) {
      User.findByToken(token, function(err, user) {
        if(err) { return; }

        _user[socket.id].id = user;
      });
    });
  });
};
