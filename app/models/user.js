'use strict';

var mongoose = require('mongoose'),
    crypto   = require('crypto'),
    bcrypt   = require('bcryptjs'),
    Schema   = mongoose.Schema,

    SALT_WORK_FACTOR = 10,

    generateToken = function() {
      return crypto.createHash('md5')
                  .update( Date.now() + Math.random().toString() )
                  .digest('hex');
    }

var UserSchema = new Schema({
  provider: String,
  username: String,
  password: String,
  displayName: String,
  token: String
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

UserSchema.statics.findByToken = function(token, callback) {
  return this.find({ token: token }, callback);
}

UserSchema.methods.generateToken = function() {
  return (generateToken());
};

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  var user = this;

  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

mongoose.model('User', UserSchema);
