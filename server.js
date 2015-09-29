// Load required packages
var express = require('express');
var compression = require('compression');

// Create our Express application
var app = express();

// Load required packages
// defaults the bytes threshold to 1024
app.use(compression()); 

// Add static middleware
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

// Add jade view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
router.get('/', function(req, res) {
  res.end('Twitatron');
});

// Register all our routes
app.use(router);

// Start the server
app.listen(3000);