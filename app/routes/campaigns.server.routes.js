var controller = require('../../app/controllers/globals.server.controller');
var campaignController = require('../../app/controllers/campaigns.server.controller');
var Model = require('mongoose').model('Campaign');

module.exports = function(app)
{
  app.route('/api/campaigns')
    .post(controller.create(Model))
    .get(controller.findAll(Model))
  ;

  app.route('/api/api/campaigns/:id')
    .get(controller.findById(Model))
    .put(controller.update(Model))
    .delete(controller.delete(Model))
  ;

  app.route('/api/campaigns/beacons/search/:multi')
    .get(campaignController.searchByMultiples(Model));
  app.param('multi', campaignController.searchByMultiples(Model));
};



// var controller = require('../../app/controllers/models.server.controller');
// var Model = require('mongoose').model('Campaign');
//
// module.exports = function(app)
// {
//   app.route('/campaigns').post(controller.create(Model)).get(controller.list(Model));
//   app.route('/campaigns/:id').get(controller.read).put(controller.update(Model)).delete(controller.delete(Model));
//   app.route('/campaigns/beacons/search/:multi').get(controller.searchByMultiples(Model));
//
//   app.param('id', controller.listById(Model));
//   app.param('multi', controller.searchByMultiples(Model));
// };
