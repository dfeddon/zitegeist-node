exports.authByPassword = function(Model)
{
  return function(req, res, next)//, id)
  {
    console.log('body', req.body);
    Model.findOne(
    {
      username: req.body.username
    },
    function(err, model)
    {
      if (err)
      {
          return next(err);
      }
      else
      {
        console.log("got it!", model);
        model.comparePassword(req.body.password, function(results, err)
        {
          if (err)
            console.log("error", err);
          else
          {
            console.log("results", results);
            if (results === true)
            {
              console.log("login success!");
              res.json(model);
            }
            else
            {
              console.log("login failed");
              var error = {error: "loginFailed"};
              res.json(error);
            }
          }
        });
          //req.model = model;
          //next();
      }
    });
  };
};
