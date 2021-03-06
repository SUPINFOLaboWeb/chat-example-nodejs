'use strict';

var mongoose = require('mongoose'),
    crypto   = require('crypto'),
    Schema   = mongoose.Schema,

    generateToken = function() {
      return crypto.createHash('md5')
                  .update( Date.now() + Math.random().toString() )
                  .digest('hex');
    };

var RoomSchema = new Schema({
  name: { type: String, default: null },
  token: { type: String, index: { unique: true }, default: generateToken },
  master: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

RoomSchema.statics.findAllByUser = function(ref, callback) {
  this.find({ users: ref }, callback);
};

mongoose.model('Room', RoomSchema);
