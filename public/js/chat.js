(function(window, React, $, io) {
  'use strict';

  var socket = io();

  var handler = {
    roomCreated: function(){},
    roomsUpdated: function(){},
    message: function(){}
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
    socket.emit('new message', room, message);
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

  chat.onMessage = function(callback) {
    if (typeof callback != 'function') {
      return;
    }

    handler.message = callback;
  };

  chat.start = function() {
    socket.on('rooms', function(rooms) {
      if (typeof handler.roomsUpdated === 'function') {
        handler.roomsUpdated(rooms);
      }
    });

    socket.on('message', function(room, message) {
      if (typeof handler.message === 'function') {
        handler.message(room, message);
      }
    });

    React.render(React.createElement(ChatApp, null), document.getElementById('main'));
  };

  chat.stop = function() {};

  window.chat = chat;
} (window, React, jQuery, io));
