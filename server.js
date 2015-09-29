// Load required packages
var express = require('express');
var compression = require('compression');
var path = require('path');

// Load controllers
var homeController = require('./controllers/home');

// Create our Express application
var app = express();

// Load required packages
// defaults the bytes threshold to 1024
app.use(compression()); 

// Add static middleware
var oneDay = 86400000;
//app.use(express.static(__dirname + '/public', { maxAge: oneDay }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));

// Add jade view engine
//app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Create our Express router
var router = express.Router();

// Landing page route
//router.get('/', function(req, res) {
//    res.locals.ip = req.ip;
//    res.render('home');
//});
router.get('/', homeController.index);

// Register all our routes
app.use(router);

// Start the server
app.listen(3000);