'use strict';

var socket = require('socket.io'),
    cookie = require('cookie'),

    mongoose = require('mongoose'),

    User = mongoose.model('User'),
    Room = mongoose.model('Room'),
    Message = mongoose.model('Message');

function in_array(needle, haystack) {
  var key = '';

  for (key in haystack) {
    if (haystack[key] === needle) {
      return true;
    }
  }

  return false;
}

module.exports = function(server, sessionStore, config) {
  var io = socket(server);

  var _user = {},
      _room = {};

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

                var roomToken = null;

                _user[socket.id].rooms = [];

                for(var room in rooms) {
                  roomToken = rooms[room].token;

                  if(!_room[roomToken]) {
                    _room[roomToken] = rooms[room];
                  }

                  _user[socket.id].rooms.push(roomToken);

                  socket.join(roomToken);
                }
              });
            });
          }
        });
      }
    }

    socket.on('get rooms', function() {
      var rooms = [], roomToken = null;

      for(var i = 0, j = _user[socket.id].rooms.length; i < j; i += 1) {
        roomToken = _user[socket.id].rooms[i];

        rooms.push(_room[roomToken]);
      }

      socket.emit('rooms', rooms);
    });

    //only if socket.io server is not attached to webserver
    socket.on('authenticate', function(token) {
      User.findByToken(token, function(err, user) {
        if (err) { return; }

        _user[socket.id].id = user;
      });
    });

    socket.on('new message', function(roomToken, text) {
      if(!in_array(roomToken, _user[socket.id].rooms)) { return; }

      var room = _room[roomToken];

      var message = new Message();
        message.text = text;
        message.room = room;
        message.author = _user[socket.id].u;

      message.save();

      io.sockets.to(roomToken).emit('message', roomToken, message);
    });
  });
};
