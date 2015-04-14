'use strict';

var RoomList = React.createClass({
  render: function() {
    var rooms = [];

    for(var index in this.props.rooms) {
      var room = this.props.rooms[index];

      rooms.push(<RoomItem
        onclick={this.props.changeRoomHandler.bind(this, index)}
        name={room.name} />);
    }

    return <div className="list-group">
        <button className="btn"><span className="glyphicon glyphicon-plus" data-toggle="modal" data-target="#roomFormModal"></span></button>
        <RoomFormModal />
        {rooms}
      </div>
  }
});


