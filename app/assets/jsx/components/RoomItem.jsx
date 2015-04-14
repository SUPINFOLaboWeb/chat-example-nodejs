'use strict';

var RoomItem = React.createClass({
  render: function() {
    return <a href="#" onclick="{this.props.onclick}" className="list-group-item">{this.props.name}</a>
  }
});
