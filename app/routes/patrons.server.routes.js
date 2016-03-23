var patrons = require('../../app/controllers/patrons.server.controller');

module.exports = function(app)
{
  app.route('/patrons').post(patrons.create).get(patrons.list);
};
