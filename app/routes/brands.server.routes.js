var controller = require('../../app/controllers/models.server.controller');
var Model = require('mongoose').model('Brand');

module.exports = function(app)
{
  app.route('/brands').post(controller.create(Model)).get(controller.list(Model));
  app.route('/brands/:id').get(controller.read).put(controller.update(Model)).delete(controller.delete(Model));

  app.param('id', controller.listById(Model));
};
