var mysql = require('mysql');


var mysqlpool = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'admin',
	database : 'boozefund_test'

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