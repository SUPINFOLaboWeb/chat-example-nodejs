'use strict';

var MessageItem = React.createClass({displayName: "MessageItem",
  render: function() {
  	var message = this.props.message;

    return React.createElement("li", {className: "list-group-item"}, 
      React.createElement("h4", {className: "list-group-item-heading"}, message.author.displayName), 
      React.createElement("p", {className: "list-group-item-text"}, message.text)
    )
  }
});
