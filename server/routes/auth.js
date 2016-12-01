var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../config');
var authenticateToken = "";
router.use(bodyParser.json());
const users = [{
  email: "ankit.agg3@gmail.com",
  password: "abcdefgh"
},
  {
    email: "vikram.singh24772@gmail.com",
    password: "abcdefgh"
  },
  {
    email: "apt.sharp@gmail.com",
    password: "abcdefgh"
  },
  {
    email: "suganyagopal94@gmail.com",
    password: "abcdefgh"
  },
  {
    email: "ruchikasaklani07@gmail.com",
    password: "abcdefgh"
  },
  {
    email: "gobinda.thakur@gmail.com",
    password: "abcdefgh"
  }]
//router.use(bodyParser.urlencoded({ extended: false }));
router.post('/login', function(req, res) {
  let email = req.body.email;
  let i = 0;
  for (i; i < users.length; i++) {
    if (users[i].email === email) {
      if (req.body.password === users[i].password) {
      	authenticateToken=jwt.sign({user:email,sub:'friday',admin:true}, config.jwtSecret)
        res.status(200).json({
          message: authenticateToken,
          error: false
        });
      } else {
        res.status(401).json({
          message: "username/password is incorrect",
          error: true
        });
      }
      break;
    }
  }
  if (i === users.length) {
    res.status(401).json({
      message: "username/password is incorrect",
      error: true
    });
  }

});
module.exports = router;