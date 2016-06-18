var mongoose = require('mongoose');
exports.searchByMultiples = function(Model)
{
  //console.log("searchByMultiples");
  return function(req, res, next, multi)
  {
    console.log('search by multiples', multi);//, qry, Model);

    // get populates
    //var populates = "";
    // var instance = new Model();
    // if (instance.getPopulates)
    //   populates = instance.getPopulates();

    // consolidate ids
    var ids = multi.split(",");
    //ids = [mongoose.Types.ObjectId("5709236964c0c51739826745")];
    var searchQuery = {beacons: {$in: ids}};
    // TODO: exclude inactive/completed campaigns
    console.log("query", searchQuery);
    Model.find(searchQuery)
    .populate
    (
      {
      	path:     'brand',
      	populate:
        {
          path:  'owner',
		      model: 'User'
        }
      }
    )
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

exports.searchByBrandId = function(Model)
{
  return function(req, res, next, brandId)
  {
    console.log('search by brandId', brandId);//, qry, Model);

    // get populates
    var populates = "";
    var instance = new Model();
    if (instance.getPopulates)
      populates = instance.getPopulates();

    // consolidate ids
    //var ids = multi.split(",");
    var searchQuery = {brand: brandId};
    // TODO: exclude inactive/completed campaigns
    //console.log("query", searchQuery);
    Model.find(searchQuery)
    .populate
    (
      {
      	path:     'brand',
      	populate:
        {
          path:  'owner',
		      model: 'User'
        }
      }
    )
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
