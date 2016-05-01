//var Brand = require('mongoose').model('Brand');

exports.create = function(Model)
{
  return function(req, res, next)
  {
    console.log("posting", req.body);
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
    console.log("list", req.body);
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
  console.log("read", req.body);
  res.json(req.model);
};

exports.listById = function(Model)
{
  return function(req, res, next, id)
  {
    console.log("listById", req.body);
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
    console.log("update", req.body, req.params);
    Model.findByIdAndUpdate(req.params.id, req.body, function(err, model)
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
    console.log("delete", req.body);
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

exports.searchByName = function(Model)
{
  return function(req, res, next, qry)
  {
    console.log('search');//, qry, Model);
    Model.find(
    {
      name: new RegExp(qry, 'i')
    },
    function(err, models)
    {
      if (err)
      {
        console.log('err', err);
        return next(err);
      }
      else
      {
        console.log('return', models);
        res.json(models);
      }
    });
  };
};

exports.searchByMultiples = function(Model)
{
  return function(req, res, next, multi)
  {
    console.log('search by multiples', multi);//, qry, Model);
    var ids = multi.split(",");
    var searchQuery = {beacons: {$in: ids}};
    // TODO: exclude inactive/completed campaigns
    //console.log("query", searchQuery);
    Model.find(
    //{
      searchQuery,//beacons: new RegExp(multi, 'i')
    //},
    function(err, models)
    {
      if (err)
      {
        console.log('err', err);
        return next(err);
      }
      else
      {
        console.log('return', models);
        res.json(models);
      }
    });
  };
};
