var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../config');
var session = require('./../service/db.session.service.js');
var authenticateToken = "";
router.use(bodyParser.json());
const users = [{
  name: "Ankit",
  email: "ankit.agg3@gmail.com",
  password: "abcdefgh"
},
  {
    name: "Vikram",
    email: "vikram.singh24772@gmail.com",
    password: "abcdefgh"
  },
  {
    name: "Bhutpurv",
    email: "apt.sharp@gmail.com",
    password: "abcdefgh"
  },
  {
    name: "Cuty Suggi",
    email: "suganyagopal94@gmail.com",
    password: "abcdefgh"
  },
  {
    name: "Dayan",
    email: "ruchikasaklani07@gmail.com",
    password: "abcdefgh"
  },
  {
    name: "Gobinda",
    email: "gobinda.thakur@gmail.com",
    password: "abcdefgh"
  }]
router.use(bodyParser.urlencoded({ extended: false }));
// router.post('/login', function(req, res) {
//   let email = req.body.email;
//   let i = 0;
//   for (i; i < users.length; i++) {
//     if (users[i].email === email) {
//       if (req.body.password === users[i].password) {
//       	authenticateToken=jwt.sign({user:email, name:users[i].name,sub:'friday',admin:true}, config.jwtSecret)
//         res.status(200).json({
//           message: authenticateToken,
//           error: false
//         });
//       } else {
//         res.status(401).json({
//           message: "username/password is incorrect",
//           error: true
//         });
//       }
//       break;
//     }
//   }
//   if (i === users.length) {
//     res.status(401).json({
//       message: "username/password is incorrect",
//       error: true
//     });
//   }

// });

router.post('/login', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  var authSession = session.getSession();
  authSession.run("MATCH (n:User {username:{email},password:{password}}) return (n)",{email:email,password:password})
         .then(function(result){
              console.log(result.records[0]._fields[0].properties.fullName);
             authenticateToken=jwt.sign({user:email,name:result.records[0]._fields[0].properties.fullName,sub:'friday',admin:true}, config.jwtSecret) 
             res.status(200).json({
             message:authenticateToken,
             error:false
          });
          authSession.close(); 
        })
        .catch(function(err){
            console.log(err);
            res.status(401).json({
              message:"user/password not found",
              error:true
            });
            authSession.close();
         }) 
  });
module.exports = router;