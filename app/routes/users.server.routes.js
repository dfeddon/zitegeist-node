var controller = require('../../app/controllers/globals.server.controller');
var userController = require('../../app/controllers/users.server.controller');
//var authController = require('../../app/controllers/auth.server.controller');
var Model = require('mongoose').model('User');
//var Model = require('../../app/models/users.server.model');
module.exports = function(app)
{
  app.route('/api/users')
    .post(controller.create(Model))
    .get(controller.findAll(Model))
  ;

  app.route('/api/users/:id')
    .get(controller.findById(Model))
    .put(controller.update(Model))
    .delete(controller.delete(Model))
  ;

  app.route('/api/users/signin').post(userController.authenticate(Model));
  app.route('/api/users/beacons/:uid').get(userController.listById(Model));
  app.param('uid', userController.listById(Model));
};



// var controller = require('../../app/controllers/models.server.controller');
// var userController = require('../../app/controllers/users.server.controller');
// var Model = require('mongoose').model('User');
//
// module.exports = function(app)
// {
//   app.route('/users').post(controller.create(Model)).get(controller.list(Model));
//   app.route('/users/:id').get(controller.read).put(controller.update(Model)).delete(controller.delete(Model));
//   app.route('/users/signin').post(controller.authenticate(Model));
//   app.route('/users/beacons/:uid').get(userController.read);
//
//   app.param('id', controller.listById(Model));
//   app.param('uid', userController.listById(Model));
// };
