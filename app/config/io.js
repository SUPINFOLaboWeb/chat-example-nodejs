'use strict';

var socket = require('socket.io'),
    cookie = require('cookie'),

    mongoose = require('mongoose'),

    User = mongoose.model('User'),
    Room = mongoose.model('Room'),
    Message = mongoose.model('Message');

module.exports = function(server, sessionStore, config) {
  var io = socket(server);

  var _user = {};

  io.on('connection', function(socket) {
    _user[socket.id] = {
      id: null,
      u: null,
      rooms: []
    };

    var cookies = socket.request.headers.cookie;
    if (cookies) {
      var sessionId = cookie.parse(cookies)['sid'];

      if (sessionId) {
        sessionId = sessionId.slice(2, sessionId.lastIndexOf('.'));

        sessionStore.get(sessionId, function(err, session) {
          if (session) {
            _user[socket.id].id = session.passport.user;

            User.findById(_user[socket.id].id, function(err, user) {
              if (err) { return; }

              _user[socket.id].u = user;

              Room.findAllByUser(user._id, function(err, rooms) {
                if (err) { return; }

                _user[socket.id].rooms = rooms;
              });
            });
          }
        });
      }
    }

    socket.on('get rooms', function() {
      socket.emit('rooms', { rooms: _user[socket.id].rooms });
    });

    socket.on('previous messages', function(room, page) {
      
    });

    //only if socket.io server is not attached to webserver
    socket.on('authenticate', function(token) {
      User.findByToken(token, function(err, user) {
        if (err) { return; }

        _user[socket.id].id = user;
      });
    });

    socket.on('join room', function(roomToken) {

    });

    socket.on('new message', function(room, message) {

    });

    socket.on('start typing', function() {

    });

    socket.on('stop typing', function() {
      
    });
  });
};
