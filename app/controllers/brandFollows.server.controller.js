var _ = require('underscore')._;

exports.getRankedCounts = function(Model)
{
  //console.log("getRankedCounts");

  return function(req, res, next)
  {
    console.log('getRankedCounts');//, qry, Model);

    var query = res.locals.queryToMongo();
    var query0 = _.clone(query);
    var query1 = _.clone(query);
    var query2 = _.clone(query);
    var query3 = _.clone(query);
    var query4 = _.clone(query);
    query0.rank = 0;
    query1.rank = 1;
    query2.rank = 2;
    query3.rank = 3;
    query4.rank = 4;
    console.log('query', query1, query);
    var response = {};
    // get populates
    Model.count(query0)
    //.populate(populates)
    .exec(
      function(err, counts)
      {
        if (err)
        {
          console.log('err', err);
          return next(err);
        }
        else
        {
          console.log('return0', counts);
          response.rank0 = counts;
          //res.status(200).json(models);
          Model.count(query1)
          //.populate(populates)
          .exec(
            function(err, counts)
            {
              if (err)
              {
                console.log('err', err);
                return next(err);
              }
              else
              {
                console.log('return1', counts);
                response.rank1 = counts;
                //res.status(200).json(models);
                Model.count(query2)
                //.populate(populates)
                .exec(
                  function(err, counts)
                  {
                    if (err)
                    {
                      console.log('err', err);
                      return next(err);
                    }
                    else
                    {
                      console.log('return2', counts);
                      response.rank2 = counts;
                      //res.status(200).json(models);
                      Model.count(query3)
                      //.populate(populates)
                      .exec(
                        function(err, counts)
                        {
                          if (err)
                          {
                            console.log('err', err);
                            return next(err);
                          }
                          else
                          {
                            console.log('return3', counts);
                            response.rank3 = counts;
                            Model.count(query4)
                            //.populate(populates)
                            .exec(
                              function(err, counts)
                              {
                                if (err)
                                {
                                  console.log('err', err);
                                  return next(err);
                                }
                                else
                                {
                                  console.log('return4', counts);
                                  response.rank4 = counts;
                                  return res.status(200).json(response);
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  };
};

exports.getFollowsByUser = function(Model)
{
  return function(req, res, next, id)
  {
    var query = res.locals.queryToMongo();
    console.log("getFollowsByUser", query);
    Model.find({user: id})
    .exec(
      function(err, models)
      {
        if (err) return next(err);

        //if (models != null)
        return res.status(200).json(models);
      }
    );
  };
};
