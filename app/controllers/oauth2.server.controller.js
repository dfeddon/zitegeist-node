/*jshint esversion: 6 */

// Load required packages
const config = require('../../config/config');
const oauth2orize = require('oauth2orize');
const passport = require('passport');
const crypto = require('crypto');
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
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, callback) {

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
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {//console.log("HIHIHIHIHIHI")
    RefreshTokenModel.findOne({ token: refreshToken }, function(err, token) {
        if (err) { return done(err); }
        if (!token) { return done(null, false); }
        if (!token) { return done(null, false); }

        UserModel.findById(token.userId, function(err, user) {
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

// token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];
