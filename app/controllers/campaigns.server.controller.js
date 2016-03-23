var Campaign = require('mongoose').model('Campaign');

exports.create = function(req, res, next)
{
  console.log('creating campaign', req.body);
  var campaign = new Campaign(req.body);
  campaign.save(function(err)
  {
    if (err)
    {
      console.log('err', err);
      return next(err);
    }
    else
    {
      console.log('good', campaign);
      res.json(campaign);
    }
  });
};

exports.list = function(req, res, next)
{
    Campaign.find({}, function(err, campaigns)
    {
        if (err)
        {
            return next(err);
        }
        else
        {
            res.json(campaigns);
        }
    });
};
