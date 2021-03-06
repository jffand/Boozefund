/* Boozefund main app file */

//required modules
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var async = require('async');
var RedisStore = require("connect-redis")(session);

//route aliases
var routes = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var user = require('./routes/user');
var dataView = require('./routes/dataView');
var data = require('./routes/data');
var config = require('./config.json');

var app = express();

//environmental vars
process.env.NODE_ENV = config.environment;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: "you don't know me"
}));

app.use(express.static(path.join(__dirname, 'public')));

//application routes
app.use('/',routes);
app.use('/login',login);
app.use('/register',register);
app.use('/user',user);
app.use('/dataView',dataView);
app.use('/data',data);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
