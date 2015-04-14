(function(window, React, $, io) {
  'use strict';

  var socket = io();

  var handler = {
    rooms: []
  };

  var chat = {};

  chat.authenticate = function(key) {
    socket.emit('authenticate', key);
  };

  chat.createRooms = function(name) {
    $.post('/room/create', {
      name: name
    }).done(function(data) {
      if (typeof handler.roomCreated === 'function') {
        handler.roomCreated(data);
      }
    });
  };

  chat.getRooms = function(callback) {
    this.onRoomsUpdated(callback);

    socket.emit('get rooms');
  };

  chat.message = function(room, message) {
    
  };

  chat.onRoomCreated = function(callback) {
    if (typeof callback != 'function') {
      return;
    }

    handler.roomCreated = callback;
  };

  chat.onRoomsUpdated = function(callback) {
    if (typeof callback != 'function') {
      return;
    }

    handler.roomsUpdated = callback;
  };

  chat.onMessage = function(room, callback) {
    if (typeof callback != 'function' || !handler.rooms[room]) {
      return;
    }

    handler.rooms[room].message = callback;
  };

  chat.onUserJoined = function(room, callback) {
    if (typeof callback != 'function' || !handler.rooms[room]) {
      return;
    }

    handler.rooms[room].userJoined = callback;
  };

  chat.onUserLeft = function(room, callback) {
    if (typeof callback != 'function' || !handler.rooms[room]) {
      return;
    }

    handler.rooms[room].userLeft = callback;
  };

  chat.start = function() {
    socket.on('rooms', function(rooms) {
      rooms = rooms.rooms;

      for (var room in rooms) {
        handler.rooms[room] = handler.rooms[room] | {};
      }

      if (typeof handler.roomsUpdated === 'function') {
        handler.roomsUpdated(rooms);
      }
    });

    socket.on('message', handler.message);
    socket.on('user join', handler.joinedUser);
    socket.on('user left', handler.leftUser);

    React.render(React.createElement(ChatApp, null), document.getElementById('main'));
  };

  chat.stop = function() {};

  window.chat = chat;
} (window, React, jQuery, io));
