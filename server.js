process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Mongoose configuration file has to be loaded before
// any other configuration in the server.js file
// (except the config module) because any module that is
// loaded after this module will be able to use its models without
// loading it by itself.
var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    express = require('./config/express');

var db = mongoose(),
    app = express();//,
    //passport = passport();

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);
