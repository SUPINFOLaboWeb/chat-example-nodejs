'use strict';

var MessageList = React.createClass({displayName: "MessageList",
  render: function() {
    var messages = this.props.messages.map(function(message, index) {
      return React.createElement(MessageItem, {
          author: message.author, 
          message: message})
    }.bind(this));

    return React.createElement("div", {className: "list-group"}, 
        messages
      )
  }
});
