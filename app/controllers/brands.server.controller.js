var Brand = require('mongoose').model('Brand');

exports.create = function(req, res, next)
{
  console.log('creating brand', req.body);
  var brand = new Brand(req.body);
  brand.save(function(err)
  {
    if (err)
    {
      console.log('err', err);
      return next(err);
    }
    else
    {
      console.log('good', brand);
      res.json(brand);
    }
  });
};

exports.list = function(req, res, next)
{
    Brand.find({}, function(err, brands)
    {
        if (err)
        {
            return next(err);
        }
        else
        {
            res.json(brands);
        }
    });
};
