/*jshint esversion: 6 */

// Load required packages
const config = require('../../config/config');
const oauth2orize = require('oauth2orize');
const passport = require('passport');
const crypto = require('crypto');
const refresh = require('passport-oauth2-refresh');
//const login = require('connect-ensure-login');
const User = require('mongoose').model('User');
const Client = require('mongoose').model('Client');
const AccessToken = require('mongoose').model('AccessToken');
const RefreshToken = require('mongoose').model('RefreshToken');
//const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
//const Token = require('mongoose').model('Token');
//const Code = require('mongoose').model('Code');
//var BasicStrategy = require('passport-http').BasicStrategy;
//var BearerStrategy = require('passport-http-bearer').Strategy;

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, callback)
{

    console.log(".password######", username, password, client, scope, callback);

    User.findOne({ email: username }, function(err, user)
    {
        if (err) { return callback(err); }
        if (!user) { return callback(null, false); }

        console.log('user', user._id);
        //var userId = user.
        //console.log("***************** "+user.comparePassword(password, null));
        //if (user.comparePassword(password) === false) { return callback(null, false); }
        user.comparePassword(password, function(err, result)
        {
            console.log('got compare', result);

            if (err) return callback(err);
            if (result === false)
            {
                console.log('password failed');
                return callback();
            }

            console.log('removing RefreshToken', user._id, client.clientId);
            RefreshToken.remove({ userId: user._id, clientId: client.clientId }, function (err, result)
            {
                if (err) console.log('refreshToken error', err);
                else console.log('refreshToken success');
                if (err) return callback(err);
            });
            console.log('removing AccessToken');//, AccessToken.remove({}));
            AccessToken.remove({ userId: user._id, clientId: client.clientId }, function (err, result)
            {
                if (err) console.log('accessToken error', err);
                else console.log('accessToken success');
                if (err) return callback(err);
            });
            console.log("tokens done!");
            var tokenValue = crypto.randomBytes(32).toString('base64');
            var refreshTokenValue = crypto.randomBytes(32).toString('base64');
            var token = new AccessToken({ token: tokenValue, clientId: client.clientId, userId: user._id });
            var refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: client.clientId, userId: user._id });
            refreshToken.save(function (err) {
                if (err) { return callback(err); }
            });
            var info = { scope: '*' };
            token.save(function (err, token) {
                if (err) { return callback(err); }
                //console.log("token life " + client);
                //done(null, tokenValue, refreshTokenValue, { 'expires_in': 120 });
                callback(null, tokenValue, refreshTokenValue, { 'expires_in': config.tokenTime });
            });
        }); // end passwordCompare
    }); // end findOne
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done)
{
    console.log("REFRESH TOKEN");

    RefreshToken.findOne({ token: refreshToken }, function(err, token)
    {
        if (err) { return done(err); }
        if (!token) { return done(null, false); }
        if (!token) { return done(null, false); }

        User.findById(token.userId, function(err, user)
        {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            RefreshToken.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
                if (err) return done(err);
            });
            AccessToken.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
                if (err) return done(err);
            });

            var tokenValue = crypto.randomBytes(32).toString('base64');
            var refreshTokenValue = crypto.randomBytes(32).toString('base64');
            var token = new AccessToken({ token: tokenValue, clientId: client.clientId, userId: user.userId });
            var refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
            refreshToken.save(function (err)
            {
                if (err) { return done(err); }
            });
            var info = { scope: '*' };
            token.save(function (err, token)
            {
                if (err) { return done(err); }
                //done(null, tokenValue, refreshTokenValue, { 'expires_in': 120 });
                //done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
                done(null, tokenValue, refreshTokenValue, { 'expires_in': config.tokenTime });
            });
        });
    });
}));

/*passport.use(new ClientPasswordStrategy(
  function(clientId, clientSecret, done)
  {
      console.log('client pass strat', clientId, clientSecret);
    Client.findOne({ clientId: clientId }, function (err, client)
    {
        console.log(client);
      if (err) { return done(err); }
      if (!client) { return done(null, false); }
      if (client.clientSecret != clientSecret) { return done(null, false); }
      return done(null, client);
    });
  }
));*/

// exports.decision = [
//     login.ensureLoggedIn(),
//     server.decision()
// ]
// token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];

/*exports.refreshTokenOff = [//function(req,res)
//{
    console.log("refreshToken"),
    //this.refreshToken(function(err, tok){console.log("Derek");});
        refresh.requestNewAccessToken("passport-oauth2-password-grant", "myrefreshtoken", function(err, accessToken, refreshToken)
        {
            console.log("HERE@", err, accessToken, refreshToken);
            //passport.authenticate(['basic', 'oauth2-client-password'], { session: false })
        })
//};
];*/

exports.refreshToken = function(req, res, next)
{
    console.log("REFRESH TOKEN", req.body.refreshToken, req.body.clientId);
    var refreshToken = req.body.refreshToken;
    var clientId = req.body.clientId;

    RefreshToken.findOne({ token: refreshToken }, function(err, token)
    {
        console.log(token);
        if (err) { return res.status(200).json(err, null); }
        if (!token) { return res.status(200).json(null, false); }
        if (!token) { return res.status(200).json(null, false); }

        User.findById(token.userId, function(err, user)
        {
            console.log(user);
            if (err) { return res.status(200).json(err); }
            if (!user) { return res.status(200).json(null, false); }

            RefreshToken.remove({ userId: user._id, clientId: clientId }, function (err) {
                if (err) return res.status(200).json(err);
            });
            AccessToken.remove({ userId: user._id, clientId: clientId }, function (err) {
                if (err) return res.status(200).json(err);
            });

            var tokenValue = crypto.randomBytes(32).toString('base64');
            var refreshTokenValue = crypto.randomBytes(32).toString('base64');
            console.log(tokenValue,refreshTokenValue);
            var token = new AccessToken({ token: tokenValue, clientId: clientId, userId: user._id });
            var refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: clientId, userId: user._id });
            refreshToken.save(function (err)
            {
                if (err) console.log('refresh save error', err);
                if (err) { return res.status(200).json(err); }
            });
            var info = { scope: '*' };
            token.save(function (err, token)
            {
                if (err) console.log('token save err', err);
                if (err) { return res.status(200).json(err); }

                console.log('success', tokenValue, refreshTokenValue);
                //done(null, tokenValue, refreshTokenValue, { 'expires_in': 120 });
                //done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
                res.status(200).json({token:tokenValue, refreshToken:refreshTokenValue, expires_in: config.tokenTime });
            });
        });
    });
};
// exports.refreshToken = [
//     passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
//     refresh.requestNewAccessToken('oauth2-client-password', "x", function(err, accessToken, refreshToken)
//     {
//         console.log("HERE@", err, accessToken, refreshToken);
//     }),
//     //server.token(),
//     server.errorHandler()
// ];

// return function refreshToken(req, res, next)
// {
//     if (!req.body)
// }
