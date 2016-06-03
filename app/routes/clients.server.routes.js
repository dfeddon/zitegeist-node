var controller = require('../../app/controllers/globals.server.controller');
// var userController = require('../../app/controllers/users.server.controller');
//var authController = require('../../app/controllers/auth.server.controller');
var Model = require('mongoose').model('Client');

module.exports = function(app)
{
  app.route('/api/clients')
    .post(controller.create(Model))
    .get(controller.findAll(Model))
  ;

  // app.route('/api/users/:id')
  //   .get(controller.findById(Model))
  //   .put(controller.update(Model))
  //   .delete(controller.delete(Model))
  // ;
  //
  // app.route('/users/signin').post(userController.authenticate(Model));
  // app.route('/api/users/beacons/:uid').get(userController.listById(Model));
  // app.param('uid', userController.listById(Model));
};
