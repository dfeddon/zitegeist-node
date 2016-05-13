var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport');

module.exports = function()
{
    var app = express();

    app.use(bodyParser.urlencoded(
    {
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/brands.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/userBeacons.server.routes.js')(app);
    require('../app/routes/campaigns.server.routes.js')(app);
    require('../app/routes/beacons.server.routes.js')(app);
    require('../app/routes/auth.server.routes.js')(app);
    require('../app/routes/metrics.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};
