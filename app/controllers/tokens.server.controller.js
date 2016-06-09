exports.refreshToken = function(Model)
{
  return function(req, res, next, multi)
  {
    console.log("refreshToken", req.body);return;

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
