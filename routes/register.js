var express = require('express');
var router = express.Router();
var db = require('../database.js');
var hash = require('../pass.js').hash;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req,res) {

  var userData= {};
  var username = req.param('username');
  var pass = req.param('pass');

  //check user input
  req.assert('username', 'Username required').notEmpty();
  req.assert('pass', 'Password must be 6 to 20 characters').len(6, 20);
  req.assert('pass_rep', 'Passwords must match').equals(req.body.pass);
  req.assert('over21', 'Must be 21 or over to use this app').equals('checked');

  var mappedErrors = req.validationErrors(true);

  //display errors if they exist
  if (mappedErrors) {
      res.render('register', {
        message: 'uh oh!',
        errors: mappedErrors
      });
    } else {

  //save username and password if no errors in input

  //hash password
  hash(pass, function(err, salt, hash){
    if (err) throw err;

    userData.salt = salt;
    userData.hash = hash;

    //store pass hash and salt in database
    db(function(err, connection) {
        if (err) {
          console.log(err);
          return;
        }
        connection.query("INSERT INTO users (user_pass_hash, user_salt, user_name) VALUES (?,?,?)",[userData.hash,userData.salt,username], function(err, rows) {
          if (err) {
            console.log(err);
            return;
          }
          console.log('success!');
        });
    });

  });
  
//re-render page
    res.render('register', {
      message: 'success!',
      errors: {}
    });
    };
});

module.exports = router;