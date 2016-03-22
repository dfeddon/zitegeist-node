var User = require('mongoose').model('User');

exports.create = function(req, res, next)
{
  console.log('creating user', req.body);
  var user = new User(req.body);
  user.save(function(err)
  {
    if (err)
    {
      console.log('err', err);
      return next(err);
    }
    else
    {
      console.log('good', user);
      res.json(user);
    }
  });
};

exports.list = function(req, res, next)
{
    User.find({}, function(err, users)
    {
        if (err)
        {
            return next(err);
        }
        else 
        {
            res.json(users);
        }
    });
};
