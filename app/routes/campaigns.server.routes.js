var campaigns = require('../../app/controllers/campaigns.server.controller');

module.exports = function(app)
{
  app.route('/campaigns').post(campaigns.create).get(campaigns.list);
};
