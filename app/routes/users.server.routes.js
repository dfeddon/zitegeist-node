var controller = require('../../app/controllers/models.server.controller');
var userController = require('../../app/controllers/users.server.controller');
var Model = require('mongoose').model('User');

module.exports = function(app)
{
  app.route('/users').post(controller.create(Model)).get(controller.list(Model));
  app.route('/users/:id').get(controller.read).put(controller.update(Model)).delete(controller.delete(Model));
  app.route('/users/signin').post(controller.authenticate(Model));
  app.route('/users/beacons/:uid').get(userController.read);

  app.param('id', controller.listById(Model));
  app.param('uid', userController.listById(Model));
};
