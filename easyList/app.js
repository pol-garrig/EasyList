// Init modules
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8080;
var database = require('./config/database');
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Connect App to our local mongoDB installation
mongoose.connect(database.url);

// Init Express
app.use(express.static(__dirname + '/public'));

// Log request
app.use(morgan('dev'));

// Set request header
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// Set routes
require('./app/routes.js')(app);

// Startb node server
app.listen(port);
console.log("App listening on port " + port);
