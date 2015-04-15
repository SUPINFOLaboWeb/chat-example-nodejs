'use strict';

var RoomList = React.createClass({displayName: "RoomList",
  handleClick: function(token) {
    this.props.changeRoomHandler(token);
  },

  render: function() {
    var rooms = [];

    for(var index in this.props.rooms) {
      var room = this.props.rooms[index];

      rooms.push(React.createElement(RoomItem, {
        onClick: this.handleClick.bind(this, room.token), 
        name: room.name}));
    }

    return React.createElement("div", {className: "list-group"}, 
        React.createElement("button", {className: "btn"}, React.createElement("span", {className: "glyphicon glyphicon-plus", "data-toggle": "modal", "data-target": "#roomFormModal"})), 
        React.createElement(RoomFormModal, null), 
        rooms
      )
  }
});


