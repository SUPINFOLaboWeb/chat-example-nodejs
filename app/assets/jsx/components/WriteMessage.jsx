'use strict';

var WriteMessage = React.createClass({
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
    return <form role="form" onSubmit={this.handleSubmit}>
      <input type="text" valueLink={this.linkState('message')} />
    </form>
  }
});
