
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var session = require('./../service/db.session.service.js');
var nodemailer = require('nodemailer');
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: false }));

router.post('/register', function(req, res) {
	console.log(req.body);
	var regSession = session.getSession();
  var mailId = req.body.email;
   regSession.run("CREATE (u:User {username:{mailId}}) return u",{mailId:mailId})
   			  .then(function(result){
   			  		console.log("user is created")
   			  })
   			  .catch(function(err){
   			  	console.log(err);
   			  })
      res.send();
});

router.post('/profileDetails',function(req,res){
var regSession = session.getSession();
let name=req.body.FullName;
let title=req.body.ProjectTitle;
let mail=req.body.Email;
let pass=req.body.Password;
  regSession.run("Match (u:User {username:{mail}}) set u.fullName={name},u.password={pass},u.title={title}",{mail:mail,name:name,pass:pass,title:title})
          .then(function(){
              console.log("details is created")
          })
          .catch(function(err){
            console.log(err);
          })
      res.send();
})


 module.exports = router;

