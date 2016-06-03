// The read() method just responds with a JSON
// representation of the req.user object.
exports.read = function(req, res)
{
  console.log("userController read", req.body);
  res.json(req.model);
};

exports.listById = function(Model)
{
  return function(req, res, next, uid)
  {
    console.log("userController listById", uid);//, Model);
    Model.findOne(
    {
      _id: uid
    },
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
          {
            model.getUserBeacons(function(err, result)
            {
              if (err)
                return res.json(err);
              else return res.status(200).json(result);
            });
          }
          else next();
      }
    });
  };
};

exports.authenticate = function(Model)
{
  return function(req, res, next)
  {
    //console.log('header', req.headers);
    //console.log(req.body.email, req.body.password, req.body);

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
            {
              // get users brandFollows
              res.status(200).json(model);
            }
            else res.status(401).json({error: 401, message: "Password mismatch"});
          }
        });
      }
    });
  };
};
