'use strict';

var RoomList = React.createClass({
  handleClick: function(token) {
    this.props.changeRoomHandler(token);
  },

  render: function() {
    var rooms = [];

    for(var index in this.props.rooms) {
      var room = this.props.rooms[index];

      rooms.push(<RoomItem
        onClick={this.handleClick.bind(this, room.token)}
        name={room.name} />);
    }

    return <div className="list-group">
        <button className="btn"><span className="glyphicon glyphicon-plus" data-toggle="modal" data-target="#roomFormModal"></span></button>
        <RoomFormModal />
        {rooms}
      </div>
  }
});


