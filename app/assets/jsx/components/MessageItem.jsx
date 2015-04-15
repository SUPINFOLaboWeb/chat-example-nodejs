'use strict';

var MessageItem = React.createClass({
  render: function() {
  	var message = this.props.message;

    return <li className="list-group-item">
      <h4 className="list-group-item-heading">{message.author.displayName}</h4>
      <p className="list-group-item-text">{message.text}</p>
    </li>
  }
});
