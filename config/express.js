var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser');

module.exports = function()
{
    var app = express();

    app.use(bodyParser.urlencoded(
    {
        extended: true
    }));

    app.use(bodyParser.json());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/brands.server.routes.js')(app);
    require('../app/routes/patrons.server.routes.js')(app);
    require('../app/routes/campaigns.server.routes.js')(app);
    require('../app/routes/beacons.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};
