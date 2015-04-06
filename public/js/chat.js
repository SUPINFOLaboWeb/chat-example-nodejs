(function(window, $, io) {
  'use strict';

  var socket = io();

  var chat = {};

  chat.authenticate = function(key) {
    socket.emit('authenticate', key);
  };

  chat.handler = {};

  chat.handler.message = function(message) {};
  chat.handler.joinedUser = function(username) {};
  chat.handler.leftUser = function(username) {};

  chat.start = function() {
    var self = this;

    socket.on('message', self.handler.message);
    socket.on('user join', self.handler.joinedUser);
    socket.on('user left', self.handler.leftUser);
  };

  chat.stop = function() {};

  window.chat = chat;
} (window, jQuery, io));