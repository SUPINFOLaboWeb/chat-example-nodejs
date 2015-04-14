'use strict';

var RoomFormModal = React.createClass({displayName: "RoomFormModal",
  render: function() {
    return React.createElement("div", {className: "modal fade", id: "roomFormModal", tabindex: "-1", role: "dialog", "aria-labelledby": "roomFormModal", "aria-hidden": "true"}, 
      React.createElement("div", {className: "modal-dialog"}, 
        React.createElement("div", {className: "modal-content"}, 
          React.createElement("div", {className: "modal-header"}, 
            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
            React.createElement("h4", {className: "modal-title", id: "roomFormModal"}, "New room")
          ), 
          React.createElement("div", {className: "modal-body"}, 
            React.createElement("form", {method: "post", action: "/room/create"}, 
              React.createElement("div", {className: "form-group"}, 
                React.createElement("label", {for: "name", className: "control-label"}, "Name :"), 
                React.createElement("input", {type: "text", className: "form-control", name: "name", id: "name", valueLink: this.props.name})
              ), 
              React.createElement("div", {className: "modal-footer"}, 
                React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Create")
              )
            )
          )
        )
      )
    );
  }
});
