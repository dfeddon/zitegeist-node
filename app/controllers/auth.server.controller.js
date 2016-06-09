var config                  = require('../../config/config');
var passport                = require('passport');
//var refresh                 = require('passport-oauth2-refresh');
var BasicStrategy           = require('passport-http').BasicStrategy;
var ClientPasswordStrategy  = require('passport-oauth2-client-password').Strategy;
var BearerStrategy          = require('passport-http-bearer').Strategy;
var PasswordGrantStrategy   = require('passport-oauth2-password-grant');
var User                    = require('mongoose').model('User');
var Client                  = require('mongoose').model('Client');
var AccessToken             = require('mongoose').model('AccessToken');
var RefreshToken            = require('mongoose').model('RefreshToken');

passport.use(new BasicStrategy(
    function(username, password, done) {console.log("HIHIHIHIHIHI2");
        Client.findOne({ clientId: username }, function(err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret != password) { return done(null, false); }

            return done(null, client);
        });
    }
));

passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done)
    {
        console.log("ClientPasswordStrategy: "+clientId, clientSecret);
        Client.findOne({ clientId: clientId }, function(err, client)
        {
            console.log(client);
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.secret != clientSecret) { return done(null, false); }

            return done(null, client);
        });
    }
));

passport.use(new
 BearerStrategy(
    function(accessToken, done)
    {
        console.log("BearerStrategy", accessToken);
        AccessToken.findOne({ token: accessToken }, function(err, token)
        {
            console.log("token "+accessToken+"/"+config.tokenTime, token);
            if (err) console.log("error", err);
            if (err) { return done(err); }
            if (!token) { return done(null, false); }
            console.log("token valid, checking expiration...");
            if( Math.round((Date.now()-token.dateCreated)/1000) > config.tokenTime )
            {
                AccessToken.remove({ token: accessToken }, function (err)
                {
                    if (err) return done(err);
                });
                return done(null, false, { message: 'Token expired' });
            }

            User.findById(token.userId, function(err, user) {
                //console.log("ccccc")
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user' }); }

                var info = { scope: '*' };
                done(null, user, info);
            });
        });
    }
));

passport.use(new PasswordGrantStrategy(
{
    tokenURL: 'http://localhost/oauth2/refreshToken',
    clientID: "this_is_my_id"
},
function(accessToken, refreshToken, profile, done)
{
    console.log('PasswordGrantStrategy');
    done(null, profile);
}));
