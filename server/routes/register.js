var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var session = require('./../service/db.session.service.js');
router.use(bodyParser.json());
var sendMail=require('../service/sendmail');
//router.use(bodyParser.urlencoded({ extended: false }));


router.post('/register', function(req, res) {
  var code='';
	console.log(req.body);
	var regSession = session.getSession();
  var mailId = req.body.email;

  var code=Math.floor((Math.random()*10))+""+Math.floor((Math.random()*10))+""+Math.floor((Math.random()*10))+""+Math.floor((Math.random()*10))+""+Math.floor((Math.random()*10))+""+Math.floor((Math.random()*10));
  sendMail(mailId,code);

  regSession.run("CREATE (u:User {username:{mailId},confirmationCode:{confirmationCode}}) return u",{mailId:mailId,confirmationCode:code})
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

