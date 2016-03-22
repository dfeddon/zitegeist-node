module.exports = function(app)
{
    // required our index controller...
    var index = require('../controllers/index.server.controller');
    // ...and used its render() method as a middleware to GET requests 
    // made to the root path
    app.get('/', index.render);
};
