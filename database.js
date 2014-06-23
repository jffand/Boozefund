//database configuration and general query function fof Boozefund app
var mysql = require('mysql');
var config = require('./config.json');

var mysqlpool = mysql.createPool({
	host     : config.DB_HOST,
	user     : config.DB_USER,
	password : config.DB_PASS,
	database : config.DB_DATABASE
});

module.exports = function(callback) {
  mysqlpool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    callback(err, connection);
    connection.release();
  });
};