var controller = require('../../app/controllers/globals.server.controller');
var beaconsController = require('../../app/controllers/models.server.controller');

var Model = require('mongoose').model('Beacon');

module.exports = function(app)
{
  app.route('/api/beacons')
    .post(controller.create(Model))
    .get(controller.findAll(Model));

  app.route('/api/beacons/:id')
    .get(controller.findById(Model))
    .put(controller.update(Model))
    .delete(controller.delete(Model));

  app.route('/api/beacons/search/:qry')
    .get(beaconsController.searchByName(Model));
  //app.param('id', controller.listById(Model));
  app.param('qry', beaconsController.searchByName(Model));
};
