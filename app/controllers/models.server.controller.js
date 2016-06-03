//var Brand = require('mongoose').model('Brand');
var ResourceProvider = function(){};

///////////////////
// constants
///////////////////
var ERROR_RESOURCE_NOT_FOUND = 'Error: Requested resource {:id} not found';

ResourceProvider.prototype.create = function(Model, req, res, next)
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
      res.status(200).json(model);
    }
  });
};

exports.list = function(Model)
{
  return function(req, res, next)
  {
    console.log('list');
    console.log(Model);
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
            res.status(200).json(models);
        }
    });
  };
};

ResourceProvider.prototype.findAll = function(model, req, res, callback)
{
  console.log('findall');//, res.locals);//, model, req, res, callback);
  // get size of querystring (if any)
  //size = res.locals.getQuerySize();

  //console.log('req: ' + JSON.stringify(req));

  // search querystring
  var query = res.locals.queryToMongo();
  //var query = {};

  // implement permissioning (in query)
  console.log("+++++++++++++query");
  console.log(query);
  // console.log(req.query);
  // get all items
  //data['model']
  model
  .find(query)
  //.populate(data['populate'])
  .exec (function (err,items)
  {
      if (err)
        return callback(err);
      else callback(items);
  });
};

ResourceProvider.prototype.findById = function(model, req, res, callback)
{
  console.log('findbyid');
  console.log('res.locals', res.locals);
    var id = req.params.id;

    model//data['model']
    .findById(id)
    //.populate(data['populate'])//'userPermissions')
    .exec (function(err, item)
    {
        if (err)
        {
       	    callback(err);
        }
        else
        {
            callback(item);
        }
    });
};
// The read() method just responds with a JSON
// representation of the req.user object.
exports.read = function(req, res)
{
  console.log("read", req.body);
  res.status(200).json(req.model);
};

exports.listById = function(Model)
{
  return function(req, res, next, id)
  {
    //console.log(Model);
    console.log("listById", id, req.params.id);

    Model.findById(id)
    .exec(
    function(err, model)
    {
      if (err)
      {
        console.log('error', err);
        //return next(err);
        return (err);
      }
      else
      {
        console.log('model', model);
        //req.model = model;
        if (model != null)
          res.status(200).json(model);
        else res.status(204).json(model);
        //next();
      }
    });
  };
};

ResourceProvider.prototype.update = function(model, req, res, callback)//Model)
{
  //return function(req, res, next)
  //{
    console.log("update (provider)", req.params);
    model.findByIdAndUpdate(req.params.id, { $set: req.body },
    function(err, model)
    {
      if (err)
      {
        return callback(err);
      }
      if (model == null) return callback(ERROR_RESOURCE_NOT_FOUND);
      else
      {
        return callback(res.status(200).json(model));
      }
    });
  //};
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
        res.status(200).json(req.model);
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
        res.status(200).json(models);
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
          res.status(200).json(models);
          //return models;
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
              res.status(200).json(model);
            else res.status(401).json({error: 401, message: "Password mismatch"});
          }
        });
      }
    });
  };
};

module.exports.ResourceProvider = ResourceProvider;
