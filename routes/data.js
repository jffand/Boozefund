var express = require('express');
var router = express.Router();
var db = require('../database.js');
var hash = require('../pass.js').hash;

//add a user
router.post('/userAdd', function(req, res) {
		function addUser(callback) {
			console.log(req.body);
			 //hash password a fake password
			hash('faker', function(err, salt, hash){
		    	if (err) throw err;
		    		var fakeSalt = salt;
		    		var fakePass = hash;

			db(function(err, connection) {
			        if (err) {
			          console.log(err);
			          return;
			        }
			        connection.query("INSERT INTO users (user_name,user_pass_hash,user_salt,tab) VALUES (?,?,?,?)",[req.body.name,fakePass,fakeSalt,req.body.tab], function(err, rows) {
			          if (err) {
			            console.log(err);
			            return;
			          }
			          
			          callback(err,rows);
			        });
			});
		});
	}

	addUser(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A user added!");
		}
	});
});

//update a user
router.post('/userUpdate', function(req, res) {
  console.log("An add!");
});
//delete a user
router.post('/userDelete', function(req, res) {
  console.log("An add!");
});
//add a member
router.post('/memberAdd', function(req, res) {
  console.log("An add!");
});
//remove a member
router.post('/memberDelete', function(req, res) {
  console.log("An add!");
});
//add a group
router.post('/groupAdd', function(req, res) {
  console.log("An add!");
});
//update group info
router.post('/groupUpdate', function(req, res) {
  console.log("An add!");
});
//delete a group
router.post('/groupDelete', function(req, res) {
  console.log("An add!");
});
//add a booze
router.post('/boozeAdd', function(req, res) {
  console.log("An add!");
});
//update booze info
router.post('/boozeUpdate', function(req, res) {
  console.log("An add!");
});
//delete a booze
router.post('/boozeDelete', function(req, res) {
  console.log("An add!");
});
//add a vote --be sure to add to upvote as well
router.post('/voteAdd', function(req, res) {
  console.log("An add!");
});
//delete a vote
router.post('/voteDelete', function(req, res) {
  console.log("An add!");
});
//add a want
router.post('/wantAdd', function(req, res) {
  console.log("An add!");
});
//delete a want
router.post('/wantDelete', function(req, res) {
  console.log("An add!");
});

module.exports = router;