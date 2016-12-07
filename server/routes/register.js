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
   regSession.run("CREATE (n:User {username:{mailId}}) return n",{mailId:mailId})
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
let pass=req.body.Password;
  regSession.run("CREATE (n:User {Fullname:{name},Title:{title},Password:{pass}}) return n",{name:name,title:title,pass:pass})
          .then(function(result){
              console.log("details is created")
          })
          .catch(function(err){
            console.log(err);
          })
      res.send();
})


 module.exports = router;
