var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function()
{
  var db = mongoose.connect(config.db);

  require('../app/models/brands.server.model');
  require('../app/models/users.server.model');
  require('../app/models/userBeacons.server.model');
  require('../app/models/campaigns.server.model');
  require('../app/models/metrics.server.model');
  require('../app/models/beacons.server.model');

  return db;
};
