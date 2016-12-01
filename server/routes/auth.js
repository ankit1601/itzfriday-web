var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

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
console.log("in auth.js");
router.post('/login', function(req, res) {
  let email = req.body.email;
  let i = 0;
  console.log("In router for Auth");
  console.log(req.body);
  for (i; i < users.length; i++) {
    if (users[i].email === email) {
      if (req.body.password === users[i].password) {
        res.status(200).json({
          message: "You are Authorized",
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