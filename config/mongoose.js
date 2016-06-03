var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function()
{
  var db = mongoose.connect(config.db);

  require('../app/models/brands.server.model');
  require('../app/models/brandFollows.server.model');
  require('../app/models/users.server.model');
  require('../app/models/userPrivates.server.model');
  require('../app/models/userBeacons.server.model');
  require('../app/models/campaigns.server.model');
  require('../app/models/metrics.server.model');
  require('../app/models/beacons.server.model');
  require('../app/models/campaignSuggested.server.model');
  require('../app/models/clients.server.model');
  require('../app/models/accessTokens.server.model');
  require('../app/models/refreshTokens.server.model');
  //require('../app/models/codes.server.model');

  return db;
};
