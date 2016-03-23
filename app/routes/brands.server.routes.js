var brands = require('../../app/controllers/brands.server.controller');

module.exports = function(app)
{
  app.route('/brands').post(brands.create).get(brands.list);
};
