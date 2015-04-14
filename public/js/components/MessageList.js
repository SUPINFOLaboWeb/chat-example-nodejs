'use strict';

var MessageList = React.createClass({displayName: "MessageList",
  render: function() {
    console.log(this.props);
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
