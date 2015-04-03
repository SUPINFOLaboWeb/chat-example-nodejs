'use strict';

var mongoose = require('mongoose'),
    crypto   = require('crypto'),
    Schema   = mongoose.Schema,

    generateToken = function() {
      return crypto.createHash('md5')
                  .update( Date.now() + Math.random().toString() )
                  .digest('hex');
    };

var MessageSchema = new Schema({
  text: { type: String },
  token: { type: String, index: { unique: true }, default: generateToken },
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Message', MessageSchema);
