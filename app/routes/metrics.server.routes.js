var controller = require('../../app/controllers/globals.server.controller');
var Model = require('mongoose').model('Metric');

module.exports = function(app)
{
  app.route('/api/metrics')
    .post(controller.create(Model))
    .get(controller.findAll(Model))
  ;

  app.route('/api/metrics/:id')
    .get(controller.findById(Model))
    .put(controller.update(Model))
    .delete(controller.delete(Model))
  ;
  //app.route('/campaigns/beacons/search/:multi').get(controller.searchByMultiples(Model));

  //app.param('id', controller.listById(Model));
  //app.param('multi', controller.searchByMultiples(Model));
};
