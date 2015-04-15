'use strict';

var RoomItem = React.createClass({displayName: "RoomItem",
  render: function() {
    return React.createElement("a", {href: "#", onClick: this.props.onClick, className: "list-group-item"}, this.props.name)
  }
});
