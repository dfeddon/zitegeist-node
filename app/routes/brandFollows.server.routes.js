var controller = require('../../app/controllers/globals.server.controller');
var brandFollowController = require('../../app/controllers/brandFollows.server.controller');
var Model = require('mongoose').model('BrandFollow');

module.exports = function(app)
{
  app.route('/api/brandfollows')
    .post(controller.create(Model))
    .get(controller.findAll(Model))
  ;

  app.route('/api/brandfollows/:id')
    .get(controller.findById(Model))
    .put(controller.update(Model))
    .delete(controller.delete(Model))
  ;

  app.route('/api/brandfollows/ranked/counts')
    .get(brandFollowController.getRankedCounts(Model))
  ;

  app.route('/api/brandfollows/user/:brandfollowsuserid')
    .get(brandFollowController.getFollowsByUser(Model))
  ;
  app.param('brandfollowsuserid', brandFollowController.getFollowsByUser(Model));
};



// var controller = require('../../app/controllers/models.server.controller');
// //var controller = require('../../app/controllers/globals.server.controller');
// var Model = require('mongoose').model('BrandFollow');
//
// module.exports = function(app)
// {
//   app.route('/brandfollows').post(controller.create(Model)).get(controller.list(Model));
//   app.route('/brandfollows/:id').get(controller.read).put(controller.update(Model)).delete(controller.delete(Model));
//
//   app.param('id', controller.listById(Model));
// };
