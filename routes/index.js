var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log(process.env);
  res.render('index', { title: 'Boozefund App' });
});

module.exports = router;
