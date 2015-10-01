// Load required packages
var path = require('path');
var express = require('express');
var compression = require('compression');
var secrets = require('./config/secrets');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

// Connect to the twitatron MongoDB
mongoose.connect(secrets.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('OK');
});

// Load controllers
var homeController = require('./controllers/home');
var authController = require('./controllers/auth');
var mentionController = require('./controllers/mention');

// Create our Express application
var app = express();

// Tell Express to use sessions
app.use(session({
  secret: secrets.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());

// Setup objects needed by views
//Passport automatically adds a user object to the Express request object when someone is logged in. 
//We can take advantage of this by passing it to our views. 
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

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

// Auth routes
router.get('/auth/twitter', authController.twitter);
router.get('/auth/twitter/callback', authController.twitterCallback, function(req, res) {
  res.redirect(req.session.returnTo || '/');
  });
router.get('/auth/logout', authController.logout);

router.route('/mentions')
    .get(mentionController.getMentions);
  //.post(authController.isAuthenticated, beerController.postBeers)

// Register all our routes
app.use(router);

// Start the server
app.listen(3000);