'use strict';

var mongoose = require('mongoose'),
    bcrypt   = require('bcryptjs'),
    Schema   = mongoose.Schema,

    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  provider: String,
  username: String,
  password: String,
  displayName: String
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  var user = this;

  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

mongoose.model('User', UserSchema);
