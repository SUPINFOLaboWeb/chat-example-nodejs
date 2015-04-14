'use strict';

var MessageList = React.createClass({
  render: function() {
    console.log(this.props);
    var messages = this.props.messages.map(function(message, index) {
      return <MessageItem
          author={message.author}
          message={message} />
    }.bind(this));

    return <div className="list-group">
        {messages}
      </div>
  }
});
