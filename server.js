/*jshint esversion: 6 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

////////////////////////////////////
// configuration
////////////////////////////////////

////////////////////////////////////
// modules
////////////////////////////////////
// Mongoose configuration file has to be loaded before
// any other configuration in the server.js file
// (except the config module) because any module that is
// loaded after this module will be able to use its models without
// loading it by itself.
const config = require('./config/config');
const mongoose = require('./config/mongoose');
const bodyParser = require('body-parser');
const express = require('./config/express');
const passport = require('./config/passport');

const db = mongoose();
const app = express();//,
    //passport = passport();

//logger.debug("Overriding Express logger");
app.listen(config.port);

// local scope helpers
// app.use(function(req, res, next)
// {
//     console.log('%s %s', req.method, req.url);
//     next();
// });

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
