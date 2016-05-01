var controller = require('../../app/controllers/models.server.controller');
var Model = require('mongoose').model('UserBeacon');

module.exports = function(app)
{
  app.route('/userBeacons').post(controller.create(Model)).get(controller.list(Model));
  app.route('/userBeacons/:id').get(controller.read).put(controller.update(Model)).delete(controller.delete(Model));
  app.route('/userBeacons/search/:qry').get(controller.searchByName(Model));
  app.param('id', controller.listById(Model));
  //app.param('qry', controller.searchByName(Model));
};
