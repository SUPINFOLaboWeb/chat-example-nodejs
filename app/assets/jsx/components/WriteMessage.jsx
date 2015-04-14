'use strict';

var WriteMessage = React.createClass({
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
    return <form onsubmit={this.handleSubmit}>
      <input type="text" valueLink={this.linkState('message')} />
    </form>
  }
});
