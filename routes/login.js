var express = require('express');
var router = express.Router();
var hash = require('../pass.js').hash;
var db = require('../database.js');

var user = {};

//kinda callbackhell but whatever
function authUser(name,pass,callback) {
	db(function(err, connection) {
        if (err) {
          console.log(err);
          return;
        }
        connection.query("SELECT * FROM users WHERE user_name=?",name, function(err, rows) {
          if (err) {
            console.log(err);
            return;
          }

          if(rows.length == 0)
          {
          	console.log("user not found!");
          	return;
          }

        	hash(pass, rows[0].user_salt, function(err, hash){
    			if (err) return fn(err);
    			else if (hash == rows[0].user_pass_hash) success(rows);
   				else console.log('invalid password');
			});


        });
    });
};

function success(data) {

console.log("woohoo!");
	//set user data
	user.name = data[0].user_name;
	user.hash = data[0].user_pass_hash;
	user.salt = data[0].user_salt;
	user.ID = data[0].user_ID;

		console.log(user);	
};


//hacked up to be removed!
//From Express.js Auth API https://github.com/visionmedia/express/blob/master/examples/auth/app.js
function authenticate(userObj,name,pass, fn) {

  if (!module.parent) console.log('authenticating %s:%s', name, pass);

 if (!userObj.name) return fn(new Error('cannot find user'));
 
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', function(req, res){

	authUser(req.body.username,req.body.pass, success);
});

module.exports = router;