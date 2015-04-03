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
  description: { type: String},
  token: { type: String, index: { unique: true }, default: generateToken },
  master: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Room', RoomSchema);
