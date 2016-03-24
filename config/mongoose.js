var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function()
{
  var db = mongoose.connect(config.db);

  require('../app/models/brands.server.model');
  require('../app/models/patrons.server.model');
  require('../app/models/campaigns.server.model');
  require('../app/models/beacons.server.model');

  return db;
};
