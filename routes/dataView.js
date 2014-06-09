var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../database.js');

var allData = {};


/* GET page with data */
router.get('/', function(req, res) {
  async.series([
  	
	//get users
	function (callback) {
		db(function(err, connection) {
	        if (err) {
	          console.log(err);
	          return;
	        }
	        connection.query("SELECT user_name,tab FROM users", function(err, rows) {
	          if (err) {
	            console.log(err);
	            return;
	          }
	          
	          allData.users = rows;
	          callback(null,null);
	        });
	    });
	},
	//get groups
	function (callback) {
		db(function(err, connection) {
	        if (err) {
	          console.log(err);
	          return;
	        }
	        connection.query("SELECT name,owner,description FROM groups", function(err, rows) {
	          if (err) {
	            console.log(err);
	            return;
	          }
	          
	          allData.groups = rows;
	          callback(null,null);

	        });
	    });
	},
	//get group members
	function (callback) {
			db(function(err, connection) {
	        if (err) {
	          console.log(err);
	          return;
	        }
	        connection.query("SELECT users.user_name,groups.name FROM (users INNER JOIN members on users.user_ID = members.users_user_ID INNER JOIN groups on members.groups_group_ID = groups.group_ID)", function(err, rows) {
	          if (err) {
	            console.log(err);
	            return;
	          }
	          
	          allData.members = rows;
	          callback(null,null);

	        });
	    });
	},
	//get booze
	function (callback) {
			db(function(err, connection) {
	        if (err) {
	          console.log(err);
	          return;
	        }
	        connection.query("SELECT name,size,price,type FROM booze", function(err, rows) {
	          if (err) {
	            console.log(err);
	            return;
	          }
	          
	          allData.booze = rows;
	          callback(null,null);

	        });
	    });	
	},
	//get wants
	function (callback) {
			db(function(err, connection) {
	        if (err) {
	          console.log(err);
	          return;
	        }
	        connection.query("SELECT groups.name AS `group`,booze.name AS `booze`,wants.upvotes AS `upvotes` FROM (groups INNER JOIN wants ON groups.group_ID = wants.groups_group_ID INNER JOIN booze ON wants.booze_booze_ID = booze.booze_ID)", function(err, rows) {
	          if (err) {
	            console.log(err);
	            return;
	          }
	          
	          allData.wants = rows;
	          callback(null,null);
	        });
	    });	
	},
	//get votes
	function (callback) {
			db(function(err, connection) {
	        if (err) {
	          console.log(err);
	          return;
	        }
	        connection.query("SELECT users.user_name AS `user`,groups.name AS `from`, booze.name AS `voted` FROM (users INNER JOIN votes ON users.user_ID = votes.users_user_ID INNER JOIN wants on (votes.wants_groups_group_ID,votes.wants_booze_booze_id) = (wants.groups_group_ID,wants.booze_booze_ID) INNER JOIN groups ON wants.groups_group_ID = groups.group_ID INNER JOIN booze ON wants.booze_booze_ID = booze.booze_ID)", function(err, rows) {
	          if (err) {
	            console.log(err);
	            return;
	          }
	          
	          allData.votes = rows;
	          callback(null,null);
	        });
	    });	
	},
	//get purchases
	function (callback) {
			db(function(err, connection) {
	        if (err) {
	          console.log(err);
	          return;
	        }
	        connection.query("SELECT groups.name AS `group`, booze.name AS `purchase` FROM (groups INNER JOIN is_purchased ON groups.group_ID = is_purchased.groups_group_ID INNER JOIN booze ON is_purchased.booze_booze_ID = booze.booze_ID)", function(err, rows) {
	          if (err) {
	            console.log(err);
	            return;
	          }
	          
	          allData.purchases = rows;
	          callback(null,null);
	        });
	    });	
	}
	],
	function(err,results) {
	  	res.render('dataView',{data: allData});
	  });
 });

module.exports = router;