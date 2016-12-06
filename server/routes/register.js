var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('./../service/db.session.service.js');
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: false }));


router.post('/register', function(req, res) {
	console.log(req.body);
	var authSession = session.getSession();
  let mailId = req.body.email;
   authSession.run("CREATE (n:User {username:{mailId}}) return n",{mailId:mailId})
   			  .then(function(result){
   			  		console.log("user is created")
   			  })
   			  .catch(function(err){
   			  	console.log(err);
   			  })
});

 module.exports = router;

