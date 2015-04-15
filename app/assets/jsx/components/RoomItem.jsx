'use strict';

var RoomItem = React.createClass({
  render: function() {
    return <a href="#" onClick={this.props.onClick} className="list-group-item">{this.props.name}</a>
  }
});
