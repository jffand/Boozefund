/* Route to handle all POST requests to database*/

var express = require('express');
var router = express.Router();
var db = require('../database.js');
var hash = require('../pass.js').hash;

//add a user
router.post('/userAdd', function(req, res) {
		function addUser(callback) {
			console.log(req.body);
			 //hash user a fake password when test user added
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
		res.json(200,{success:"did it"});
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
		console.log("A user has been removed!");
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
		console.log("A membership has been added!");
		res.send(200,{success:"did it"});
		}
	});
});

//remove a member
router.post('/memberDelete', function(req, res) {

	function deleteMember(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("DELETE FROM members WHERE users_user_ID = (SELECT user_ID FROM users WHERE user_name = ?) AND groups_group_ID= (SELECT group_ID FROM groups WHERE name = ?)",[req.body.user,req.body.group], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	deleteMember(function(err,rows){
		if(err) {
			console.log(err);
			res.send(500,{error:"database error"});
		} else {
		console.log("A membership has been removed!");
		res.send(200,{success:"did it"});
		}
	});
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

	function updateGroup(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("UPDATE groups SET description= ? WHERE name = ?",[req.body.description,req.body.name], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	updateGroup(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A group has been added!");
		res.send(200,{success:"did it"});
		}
	});
});

//delete a group
router.post('/groupDelete', function(req, res) {

	function deleteGroup(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("DELETE FROM groups WHERE name = ?",[req.body.name], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	deleteGroup(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A group has been added!");
		res.send(200,{success:"did it"});
		}
	});
});

//add a booze
router.post('/boozeAdd', function(req, res) {

	function addBooze(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("INSERT INTO booze (name,type,price,size) VALUES (?,?,?,?)",[req.body.name,req.body.type,req.body.price,req.body.size], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	addBooze(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A booze has been added!");
		res.send(200,{success:"did it"});
		}
	});
});
//update booze info
router.post('/boozeUpdate', function(req, res) {

	function updateBooze(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("UPDATE booze SET size = ?, price = ?, type = ? WHERE name = ?",[req.body.size,req.body.price,req.body.type,req.body.name], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	updateBooze(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A booze has been updated!");
		res.send(200,{success:"did it"});
		}
	});
});
//delete a booze
router.post('/boozeDelete', function(req, res) {
	function deleteBooze(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("DELETE FROM booze WHERE name = ?",[req.body.name], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	deleteBooze(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A booze has been removed!");
		res.send(200,{success:"did it"});
		}
	});
});

//add a vote --be sure to add to upvote as well
router.post('/voteAdd', function(req, res) {

	function addVote(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("INSERT INTO votes (users_user_ID,wants_groups_group_ID,wants_booze_booze_ID) SELECT user_ID,group_ID,booze_ID FROM users,groups,booze WHERE users.user_name =? AND groups.name= ? AND booze.name = ?",[req.body.user,req.body.group,req.body.booze], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }

		          	db(function(err, connection) {
						console.log(req.body);
						     if (err) {
					         console.log(err);
					          res.send(500,{error:"database error"});
						          return;
		  			        }
					        connection.query("UPDATE wants SET upvotes = upvotes+1 WHERE groups_group_ID = (SELECT group_ID FROM groups WHERE name=?) AND booze_booze_ID = (SELECT booze_ID FROM booze WHERE name = ?)",[req.body.group,req.body.booze], function(err, rows) {
							          if (err) {
							            console.log(err);
							            res.send(500,{error:"database error"});
							            return;
							          }
			          
	         			 callback(err,rows);
	         		});
		        });
			});
		});
	}

	addVote(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A vote has been added!");
		res.send(200,{success:"did it"});
		}
	});
});

//delete a vote
router.post('/voteDelete', function(req, res) {

	function deleteVote(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("DELETE FROM votes WHERE users_user_ID = (SELECT user_ID FROM users WHERE users.user_name = ?) AND wants_groups_group_ID =(SELECT group_ID FROM groups WHERE groups.name=?) AND wants_booze_booze_ID= (SELECT booze_ID FROM booze WHERE booze.name = ?)",[req.body.user,req.body.group,req.body.booze], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	deleteVote(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A vote has been removed!");
		res.send(200,{success:"did it"});
		}
	});
});

//add a want
router.post('/wantAdd', function(req, res) {
	function addWant(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("INSERT INTO wants (groups_group_ID,booze_booze_ID,upvotes) VALUES((SELECT group_ID FROM groups WHERE groups.name = ?),(SELECT booze_ID FROM booze WHERE booze.name = ?),?)",[req.body.group,req.body.booze,req.body.upvote], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	addWant(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A want has been added!");
		res.send(200,{success:"did it"});
		}
	});
});

//update a want (upvote count)
router.post('/wantUpdate', function(req, res) {

	function updateWant(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("UPDATE wants SET upvotes = ? WHERE groups_group_ID = (SELECT group_ID FROM groups WHERE groups.name=?) AND booze_booze_ID = (SELECT booze_ID FROM booze WHERE booze.name = ?)",[req.body.upvote,req.body.group,req.body.booze], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	updateWant(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A want has been updated!");
		res.send(200,{success:"did it"});
		}
	});
});

//delete a want
router.post('/wantDelete', function(req, res) {

	function deleteWant(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("DELETE FROM wants WHERE groups_group_ID = (SELECT group_ID FROM groups WHERE name=?) AND booze_booze_ID = (SELECT booze_ID FROM booze WHERE name = ?)",[req.body.group,req.body.booze], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	deleteWant(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A want has been removed!");
		res.send(200,{success:"did it"});
		}
	});
});

//add a purchase
router.post('/purchaseAdd', function(req, res) {

	function addPurchase(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("INSERT INTO is_purchased (groups_group_ID,booze_booze_ID) VALUES((SELECT group_ID FROM groups WHERE groups.name = ?),(SELECT booze_ID FROM booze WHERE booze.name = ?))",[req.body.group, req.body.booze], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	addPurchase(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A purchase has been added!");
		res.send(200,{success:"did it"});
		}
	});
});

//delete a purchase
router.post('/purchaseDelete', function(req, res) {

	function deletePurchase(callback) {
		db(function(err, connection) {
		console.log(req.body);
		       if (err) {
	           console.log(err);
	           res.send(500,{error:"database error"});
		          return;
		        }
		        connection.query("DELETE FROM is_purchased WHERE groups_group_ID = (SELECT group_ID FROM groups WHERE groups.name = ?) AND booze_booze_ID=(SELECT booze_ID FROM booze WHERE booze.name = ?)",[req.body.group,req.body.booze], function(err, rows) {
		          if (err) {
		            console.log(err);
		            res.send(500,{error:"database error"});
		            return;
		          }
			          
	          callback(err,rows);
		        });
			});
	}

	deletePurchase(function(err,rows){
		if(err) {
			console.log(err);
		} else {
		console.log("A purchase has been removed!");
		res.send(200,{success:"did it"});
		}
	});
});


module.exports = router;