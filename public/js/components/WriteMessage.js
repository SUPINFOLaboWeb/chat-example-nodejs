'use strict';

var WriteMessage = React.createClass({displayName: "WriteMessage",
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState: function() {
    return {
      message: ''
    };
  },

  handleSubmit: function() {
    this.props.writeMessageHandler(this.state.message);

    this.setState({
      message: ''
    });

    return false;
  },

  render: function() {
    return React.createElement("form", {role: "form", onSubmit: this.handleSubmit}, 
      React.createElement("input", {type: "text", valueLink: this.linkState('message')})
    )
  }
});
