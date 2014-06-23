/*Route to handle POST requests from login page*/

var express = require('express');
var router = express.Router();
var hash = require('../pass.js').hash;
var db = require('../database.js');

var user = {};

/* GET login page. Or direct to secret page */
router.get('/', function(req, res) {
  if(req.session.user) {
    res.redirect("/dataView");
  } else {
    res.render('login');
  }
});

router.post('/', function(req, res){
    //validate username
      db(function(err, connection) {
        if (err) {
          res.send(500,{error:err});
          return;
        }
        connection.query("SELECT * FROM users WHERE user_name=?",req.body.username, function(err, rows) {
          if (err) {
            res.send(500,{error:err});
            return
          }

          if(rows.length == 0)
          {
            res.send(500,{error:err});
            return
          }

          console.log(rows);
          //validate password
          hash(req.body.pass, rows[0].user_salt, function(err, hash){
            if (err) res.send(500,{error:err});
             else if (hash !== rows[0].user_pass_hash) {
                res.send(500,{error:'invalid password'});
                return
             } else {
                  //success
                  console.log("woohoo!");
                  //set user data
                  user.name = rows[0].user_name;
                  user.hash = rows[0].user_pass_hash;
                  user.salt = rows[0].user_salt;
                  user.ID = rows[0].user_ID;

                  //set session
                  req.session.regenerate( function() {
                  req.session.user = user;
                  res.send(200,{success:'woohoo!'});
                  });
                }

          });
      });
   });

});

module.exports = router;