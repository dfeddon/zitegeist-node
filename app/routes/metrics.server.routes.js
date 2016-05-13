var controller = require('../../app/controllers/models.server.controller');
var Model = require('mongoose').model('Metric');

module.exports = function(app)
{
  app.route('/metrics').post(controller.create(Model)).get(controller.list(Model));
  app.route('/metrics/:id').get(controller.read).put(controller.update(Model)).delete(controller.delete(Model));
  //app.route('/campaigns/beacons/search/:multi').get(controller.searchByMultiples(Model));

  app.param('id', controller.listById(Model));
  //app.param('multi', controller.searchByMultiples(Model));
};
