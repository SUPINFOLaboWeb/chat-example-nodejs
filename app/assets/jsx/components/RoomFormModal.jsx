'use strict';

var RoomFormModal = React.createClass({
  render: function() {
    return <div className="modal fade" id="roomFormModal" tabindex="-1" role="dialog" aria-labelledby="roomFormModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="roomFormModal">New room</h4>
          </div>
          <div className="modal-body">
            <form method="post" action="/room/create">
              <div className="form-group">
                <label for="name" className="control-label">Name :</label>
                <input type="text" className="form-control" name="name" id="name" valueLink={this.props.name} />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
  }
});
