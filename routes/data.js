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
			          res.send(500,{error:"database error"});
			          return;
			        }
			        connection.query("INSERT INTO users (user_name,user_pass_hash,user_salt,tab) VALUES (?,?,?,?)",[req.body.username,fakePass,fakeSalt,req.body.tab], function(err, rows) {
			          if (err) {
			            console.log(err);
			            res.send(500,{error:"database error"});
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
			res.send(500,{error:"database error"});
		} else {
		console.log("A user added!");
		res.send(200,{success:"did it"});
		}
	});
});

//update a user
router.post('/userUpdate', function(req, res) {

	function updateUser(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("UPDATE users SET tab=? WHERE user_name= ?",[req.body.tab,req.body.username], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	updateUser(function(err,rows){
		if(err) {
			console.log(err);
			res.send(500,{error:"database error"});
		} else {
		console.log("A user has been updated!");
		res.send(200,{success:"did it"});
		}
	});
});

//delete a user
router.post('/userDelete', function(req, res) {

	function deleteUser(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("DELETE FROM users WHERE user_name = ?",[req.body.username], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	deleteUser(function(err,rows){
		if(err) {
			console.log(err);
			res.send(500,{error:"database error"});
		} else {
		console.log("A user has been updated!");
		res.send(200,{success:"did it"});
		}
	});
});

//add a member
router.post('/memberAdd', function(req, res) {

	function addMember(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("INSERT INTO members (users_user_ID, groups_group_ID) VALUES((SELECT user_ID FROM users WHERE users.user_name = ?),(SELECT group_ID FROM groups WHERE groups.name=?))",[req.body.user,req.body.group], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	addMember(function(err,rows){
		if(err) {
			console.log(err);
			res.send(500,{error:"database error"});
		} else {
		console.log("A group has been added!");
		res.send(200,{success:"did it"});
		}
	});
});
//remove a member
router.post('/memberDelete', function(req, res) {
  console.log("An add!");
});
//add a group
router.post('/groupAdd', function(req, res) {

	function addGroup(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("INSERT INTO groups (name,description,owner) VALUES (?,?,?)",[req.body.name,req.body.description,1], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	addGroup(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A group has been added!");
		res.send(200,{success:"did it"});
		}
	});

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