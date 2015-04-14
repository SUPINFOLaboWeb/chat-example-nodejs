'use strict';

var WriteMessage = React.createClass({displayName: "WriteMessage",
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState: function() {
    return {
      message: ''
    };
  },

  handleChange: function() {

  },

  handleSubmit: function() {

  },

  render: function() {
    return React.createElement("form", {onsubmit: this.handleSubmit}, 
      React.createElement("input", {type: "text", valueLink: this.linkState('message')})
    )
  }
});
