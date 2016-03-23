var Patron = require('mongoose').model('Patron');

exports.create = function(req, res, next)
{
  console.log('creating patron', req.body);
  var patron = new Patron(req.body);
  patron.save(function(err)
  {
    if (err)
    {
      console.log('err', err);
      return next(err);
    }
    else
    {
      console.log('good', patron);
      res.json(patron);
    }
  });
};

exports.list = function(req, res, next)
{
    Patron.find({}, function(err, patrons)
    {
        if (err)
        {
            return next(err);
        }
        else
        {
            res.json(patrons);
        }
    });
};
