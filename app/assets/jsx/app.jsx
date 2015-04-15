'use strict';

var ChatApp = React.createClass({
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

  joinRoomHandler: function(room, username) {

  },

  leftRoomHandler: function(room, username) {

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

    return <div className="row">
      <div className="col-md-4">
        <div className="container-fluid">
          <div className="panel panel-default">
            <div className="panel-heading">Rooms</div>
            <RoomList rooms={this.state.rooms} changeRoomHandler={this.changeRoomHandler} />
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="container-fluid">
          <MessageList messages={messages} />
          <WriteMessage writeMessageHandler={this.writeMessageHandler} />
        </div>
      </div>
    </div>
  }
});
