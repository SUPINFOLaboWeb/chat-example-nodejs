'use strict';

var ChatApp = React.createClass({
  getInitialState: function() {
    chat.getRooms(this.roomsHandler);

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

  changeRoomHandler: function(room) {
    this.setState({
      currentRoom: room
    });
  },

  writeMessageHandler: function(message) {
    chat.message(currentRoom, message);
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

    return <div className="row">
      <div className="col-md-4">
        <RoomList rooms={this.state.rooms} changeRoomHandler={this.changeRoomHandler} />
      </div>
      <div className="col-md-8">
        <MessageList messages={messages} />
        <WriteMessage  />
      </div>
    </div>
  }
});
