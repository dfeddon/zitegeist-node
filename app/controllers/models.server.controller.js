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
    // get populates
    var populates = "";
    var instance = new Model();
    if (instance.getPopulates)
      populates = instance.getPopulates();

    Model.find({})
    .populate(populates)
    .exec(function(err, models)
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

    // get populates
    var populates = "";
    var instance = new Model();
    if (instance.getPopulates)
      populates = instance.getPopulates();

    // consolidate ids
    var ids = multi.split(",");
    var searchQuery = {beacons: {$in: ids}};
    // TODO: exclude inactive/completed campaigns
    //console.log("query", searchQuery);
    Model.find(searchQuery)
    .populate(populates)
    .exec(
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
      }
    );
  };
};

exports.authenticate = function(Model)
{
  return function(req, res, next)
  {
    console.log(req.body.email, req.body.password);

    Model.findOne(
    {
      email: req.body.email
    },
    function(err, model)
    {
      if (err)
        console.log('err', err);
      else
      {
        if (!model) return res.json({error: 401, message: "User not found"});

        console.log('success', model);
        model.comparePassword(req.body.password, function(err, bool)
        {
          if (err)
            console.log("err", err);
          else
          {
            if (bool === true)
              res.json(model);
            else res.json({error: 401, message: "Password mismatch"});
          }
        });
      }
    });
  };
};
