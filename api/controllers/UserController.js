/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 module.exports = {

 	login: function (req, res) {
 		User.findByUsername({username: req.body.username}).done(function (err, user) {
 			if (err) res.json({data: err, message: "Db Error on findByUsername", success: false, total: 0});
 			else if (user) {
 				var hasher = require("password-hash");
 				console.log(JSON.stringify(req.body.password));
 				console.log(hasher.verify(req.body.password, user.password));
 				
 				if (hasher.verify(req.body.password, user.password)) {
 					req.session.user = user;
 					res.json({data: user, message: "Login Successfully", success: true, total: 1});
 				} 
 				else res.json({data: req.body, message: "Password Mismatch", success: false, total: 0});
 			} 
 			else {
            	// invalid password
            	if (req.session.user) req.session.user = null;
            	res.json({data: null, message: "Invalid Password on login", success: false, total: 0});
        	}
    	});
 	},

 	signup: function (req, res) {
 		User.findByUsername({username: req.body.username}).done(function (err, usr) {
 			if (err) res.json({data: err, message: "Db Error on findOneByUsername", success: false, total: 0});
 			else if(usr) res.json({data: usr.username, message: "Username already Taken", success: false, total: 0});
 			else {

 				User.findOneByEmail({email: req.body.email})
 				.done(function (emailErr, emailUsr) {
 					if (emailErr) res.json({data: emailErr, message: "Db Error on findOneByEmail", success: false, total: 0});
 					else if(emailUsr) res.json({data: emailUsr.email, message: "Email already Taken", success: false, total: 0});
 					else {
 						var passwordHash = require('password-hash');
 						var hashedPassword = passwordHash.generate(req.body.password);
 						User.create({ name: req.body.name, username: req.body.username, password: hashedPassword, email: req.body.email})
 						.done(function(error, user) {
 							if (error) res.json({data: error, message: "Db Error on create", success: false, total: 0});
 							else {
 								req.session.user = user;
 								res.json({data: user, message: "Created Successfully", success: true, total: 1});
 							}
 						});
 					}
 				});
 			}
 		});
},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
   _config: {}


};
