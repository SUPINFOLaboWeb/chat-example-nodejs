'use strict';

var MessageItem = React.createClass({
  render: function() {
    return <li className="list-group-item">
      <h4 className="list-group-item-heading">{this.props.author.displayName}</h4>
      <p className="list-group-item-text">{this.props.message}</p>
    </li>
  }
});
