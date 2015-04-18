'use strict';

var ChatApp = React.createClass({displayName: "ChatApp",
  getInitialState: function() {
    chat.getRooms(this.roomsHandler);

    chat.onMessage(this.messageHandler);

    return {
      rooms: [],
      messages: [],
      currentRoom: null
    };
  },

  addRoom: function(room) {
    var rooms = this.state.rooms,
        messages = this.state.messages;

    rooms[room.token] = room;
    messages[room.token] = [];

    this.setState({
      rooms: rooms,
      messages: messages
    });
  },

  removeRoom: function(room) {
    var rooms = this.state.rooms,
        messages = this.state.rooms;

    rooms[room] = null;
    messages[room] = null;

    this.setState({
      rooms: rooms,
      messages: messages
    });
  },

  addMessage: function(room, message) {
    var messages = this.state.messages;
    messages[room].push(message);

    this.setState({
      messages: messages
    });
  },

  messageHandler: function(room, message) {
    var messages = this.state.messages;

    messages[room].push(message);

    this.setState({
      messages: messages
    });
  },

  changeRoomHandler: function(room) {
    this.setState({
      currentRoom: room
    });
  },

  writeMessageHandler: function(message) {
    chat.message(this.state.currentRoom, message);
  },

  roomsHandler: function(rooms) {
    for(var room in rooms) {
      if(!this.state.rooms[rooms[room].token]) {
        this.addRoom(rooms[room]);
      }
    }
  },

  render: function() {
    var messages = this.state.messages[this.state.currentRoom] || [];

    return React.createElement("div", {className: "row"}, 
      React.createElement("div", {className: "col-md-4"}, 
        React.createElement("div", {className: "container-fluid"}, 
          React.createElement("div", {className: "panel panel-default"}, 
            React.createElement("div", {className: "panel-heading"}, "Rooms"), 
            React.createElement(RoomList, {rooms: this.state.rooms, changeRoomHandler: this.changeRoomHandler})
          )
        )
      ), 
      React.createElement("div", {className: "col-md-8"}, 
        React.createElement("div", {className: "container-fluid"}, 
          React.createElement(MessageList, {messages: messages}), 
          React.createElement(WriteMessage, {writeMessageHandler: this.writeMessageHandler})
        )
      )
    )
  }
});
