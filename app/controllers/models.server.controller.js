//var Brand = require('mongoose').model('Brand');

exports.create = function(Model)
{
  return function(req, res, next)
  {
    var model = new Model(req.body);
    model.save(function(err)
    {
      if (err)
      {
        console.log('err', err);
        return next(err);
      }
      else
      {
        res.json(model);
      }
    });
  };
};

exports.list = function(Model)
{
  return function(req, res, next)
  {
    Model.find({}, function(err, models)
    {
        if (err)
        {
            return next(err);
        }
        else
        {
            res.json(models);
        }
    });
  };
};

// The read() method just responds with a JSON
// representation of the req.user object.
exports.read = function(req, res)
{
    res.json(req.model);
};

exports.listById = function(Model)
{
  return function(req, res, next, id)
  {
    Model.findOne(
    {
      _id: id
    },
    function(err, model)
    {
      if (err)
      {
          return next(err);
      }
      else
      {
          req.model = model;
          next();
      }
    });
  };
};

exports.update = function(Model)
{
  return function(req, res, next)
  {
    Model.findByIdAndUpdate(req.model.id, req.body, function(err, model)
    {
      if (err)
      {
        return next(err);
      }
      else
      {
        res.json(model);
      }
    });
  };
};

exports.delete = function(Model)
{
  return function(req, res, next)
  {
    req.model.remove(function(err)
    {
      if (err)
      {
        return next(err);
      }
      else
      {
        res.json(req.model);
      }
    });
  };
};
