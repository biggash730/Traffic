/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	name: {
      type: 'string',
      required: true
    },
  	username: {
      type: 'string',
      required: true,
      unique: true
    },
  	password: {
      type: 'string',
      required: true,
      minLength: 6
    },
  	email:{
      type: 'email',
      required: true,
      unique: true
    },
  	created: 'datetime',
  	loggedIn:'boolean'
  	
  }
  
  /*beforeCreate: function (attrs, next) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(attrs.password, salt, function(err, hash) {
        if (err) return next(err);

        attrs.password = hash;
        next();
      });
    });
  }*/
  /*beforeCreate: function (attrs, next) {
    var passwordHash = require('password-hash');

    var hashedPassword = passwordHash.generate(attrs.password);

    attrs.password = hashedPassword;
  }*/
};
