/*jshint esversion: 6 */

////////////////////////////////////
// modules
////////////////////////////////////
const config = require('./config');
const express = require('express');
const session = require('express-session');
//const expressJwt = require('express-jwt');
//const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
//const methodOverride = require('method-override'),
const logger = require('./logger');
const winston = require('winston');
const morgan = require('morgan');
const passport = require('passport');
const ejs = require('ejs');
//const awssdk = require('./aws');
//const AWS = require('aws-sdk');
//const authController = require('../app/controllers/auth.server.controller')
//const Strategy = require('passport-local');

module.exports = function()
{
    const app = express();
    //console.log(process.env['HOME']);

    ////////////////////////////////////
    // passport
    ////////////////////////////////////
    app.use(passport.initialize());
    app.use(session(
    {
        secret: 'Super Secret Session Key',
        saveUninitialized: true,
        resave: true
    }));

    ////////////////////////////
    // local scope helpers
    ////////////////////////////
    app.use(function(req, res, next)
    {
        // return size (no. name-value pairs) of query string
        res.locals.getQuerySize = function() {
            //var obj = req.query;
            var size = 0,
                key;
            for (key in req.query) {
                if (req.query.hasOwnProperty(key)) size++;
            }
            return size;
        };

        // converts querystring to mongo criteria (eg: search)
        res.locals.queryToMongo = function()
        {
            var query = {};
            var val;
            console.log("query2mongo");
            console.log(req.query);
            Object.keys(req.query).forEach(function(key)
            {
                //val = req.param(key);
                val = req.query[key];

                // value type conversions
                if (val == "true") val = true;
                if (val == "false") val = false;
                if (val === parseInt(val)) val = parseInt(val);

                // build Mongo query object
                query[key] = val;
                console.log(query[key], val);
            });
            console.log('query');
            console.log(query);
            return query;
        };

        // build item properties
        res.locals.buildItem = function(model) {
            var item = req.body;

            // compress array of objects to array of objectId's
            // var casted = item.pages.map(function( page )
            // {
            //   return mongoose.Types.ObjectId(page);
            // });
            //
            //var readyItem = model.preSave(item);
            for (var name in item) {
                console.log(name + " / " + item[name], name);
                if (model.schema.paths.hasOwnProperty(name)) {
                    //console.log("VALID!");
                    model[name] = item[name];
                } else // might be a virtual property
                {
                    console.log("INVALID property", name, item[name]);
                    console.log("checking for virtual");
                    // append data IF property is a 'virtual'
                    if (model.schema.virtuals.hasOwnProperty([name])) {
                        console.log("IS a virtual, so adding it!");
                        model[name] = item[name];
                    }

                }
            }
            return model;
        };

        // find item by id
        res.locals.getById = function(coll, id) {
            db.collection(coll, function(err, collection) {
                collection.findOne({
                        '_id': new BSON.ObjectID(id)
                    },
                    function(err, item) {
                        if (err) console.log("ERROR " + err);
                        console.log("item = " + item.name);
                        return item;
                    }
                );
            });

        };

        res.locals.getClient = function(callback) {
            console.log("getting client");
            console.log(req.user);
            //console.log(oauth2.token);

            mongoose.AccessToken
                .findOne({
                    'userId': req.user._id
                })
                .exec(function(err, item) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("item");
                        console.log(item);
                        callback(item);
                    }
                });
            //return res.passport;//.clientId;
        };

        // res.locals.middleAuth=function(fnc)
        // {
        //   if (!fnc)
        //     fnc = middleware.yesAuth;
        //   return middleware.middleAuth;
        // }

        // generate a GUID
        res.locals.createGUID = function() {
            // http://guid.us/GUID/JavaScript
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            // then to call it, plus stitch in '4' in the third group
            guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
            //alert(guid);
            return guid;
        };

        // console logging
        console.log('%s %s', req.method, req.url);

        // required
        next();
    });
    // body parser
    // app.use(bodyParser.urlencoded({
    //     extended: true
    // }));
    //app.use(bodyParser.json());
    //app.use(express.logger('dev'));

    //logging
    /*winston.emitErrs = true;
    var logger = new winston.Logger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: './logs/all-logs.log',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            }),
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: false
    });

    module.exports = logger;

    module.exports.stream = {
        write: function(message, encoding) {
            logger.info(message);
        }
    };*/

    app.use(require("morgan")("combined", {
        "stream": logger.stream
    }));


    app.use(bodyParser.urlencoded(
    {
        extended: true
    }));

    //app.user(express.favicon());
    app.use(bodyParser.json());
    //app.use(methodOverride);

    // log requests to console
    app.use(morgan('dev'));

    const oauth2Controller = require('../app/controllers/oauth2.server.controller');
    require('../app/controllers/auth.server.controller');
    //const auth = passport.authenticate('basic', { session : false });
    const auth = passport.authenticate('bearer', { session : false });

    // Create endpoint handlers for oauth2 token
    app.route('/oauth2/token')
      .post(oauth2Controller.token);

    app.route('/oauth2/refreshToken')
        .post(oauth2Controller.refreshToken);

    // globally set auth middlewares
    /*
    app.get('/api/*', auth);
    app.put('/api/*', auth);
    app.post('/api/*', auth);
    app.delete('/api/*', auth);
    //*/

    app.set('view engine', 'ejs');

    // routes
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/brands.server.routes.js')(app);
    require('../app/routes/brandFollows.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/userBeacons.server.routes.js')(app);
    require('../app/routes/campaigns.server.routes.js')(app);
    require('../app/routes/beacons.server.routes.js')(app);
    //require('../app/routes/auth.server.routes.js')(app);
    require('../app/routes/metrics.server.routes.js')(app);
    require('../app/routes/clients.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};
