'use strict';

var RoomItem = React.createClass({displayName: "RoomItem",
  render: function() {
    return React.createElement("a", {href: "#", onclick: "{this.props.onclick}", className: "list-group-item"}, this.props.name)
  }
});
