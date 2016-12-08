var express = require('express');
var userRouter = express.Router();
var jwt = require('jsonwebtoken');
var appConst = require('../../config/config.js');
var sendMail=require('./../../service/sendmail');


var userAccount = require('./user.account.js');

userRouter.post('/login', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let authenticateToken = '';
  userAccount.findOne({ username: email}, function(err, user) {
  	if (err) {
  		res.status(401).json({
            message:"user/password not found"
        });
  	}
  	console.log(user);
  	if(user) {
  		if(user.checkPassword(password)){
  			authenticateToken=jwt.sign({user:email,name:user.firstName,sub:'friday',admin:true}, appConst.jwtSecret);
  			res.status(200).json({
             	message:authenticateToken
        		});
  			}
  		}else {
  		// create a user a new user
			var testUser = new userAccount({
    			username: 'gobinda.thakur@gmail.com',
    			password: 'abcdefgh',
    			role: 'Admin'
			});
			testUser.save(function(err, user) {
				if(err){
					res.status(401).json({
            		message:"user/password not found"
        		  });
				}
				authenticateToken=jwt.sign({user:email,name:user.firstName,sub:'friday',admin:true}, appConst.jwtSecret);
  				res.status(200).json({
             	message:authenticateToken
        		});
			});
  		}
  	});
});



module.exports = userRouter;