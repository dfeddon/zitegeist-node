// import libs
var ResourceProvider    = require('./models.server.controller').ResourceProvider;
// var passport            = require('passport');
// var oauth2        = require('../oauth2/oauth2');
// var config        = require('../libs/config');

//var data    = require('../prototypes/dataExport').DataExport;

///////////////////
// api's
///////////////////

// find by id
exports.findById = function(data)
{
   return function(req, res)
   {
      console.log('res locals', res.locals);
      new ResourceProvider().findById(data, req, res, function(results)
      {
         // check for compress fields
         console.log('results', results);
         res.send(results);
      });
   };
};

 // find all
exports.findAll = function(data)
{
    return function(req, res)
    {
      //   var client = res.locals.getClient(function(item)
      //   {
      //       console.log(item);
      //   });
      //   console.log("client");
      //   console.log(client);//req.body);
        //console.log('req body '+JSON.stringify(req.body));
        //var resourceProvider = new ResourceProvider();
        console.log('resourceProvider', res.locals);
        //console.log("derek " + JSON.stringify(req.query));
        new ResourceProvider().findAll(data, req, res, function(results)
        {
            // check for compress fields
            // Object.keys(req.query).forEach(function(key)
            // {
            //     val = req.param(key);
            //     //val = req.param(key);
            //     console.log("compressing " + val);
            // });
            //console.log(JSON.stringify(results));

            // if client is player, randomize metric items
            //if (res.locals.getClient() == '');
            res.send(results);
        });
    };
};

// add
exports.create = function(model)
{
   return function(req, res, next)
    {
        console.log('req body');//+JSON.stringify(req.body));
        console.log(req.body);
        //req.body = JSON.parse(req.body);
        //var resourceProvider = new ResourceProvider();
        new ResourceProvider().create(model, req, res, next, function(results)
            {
                res.send(results);
            }
        );
    };
};

// add (batch)
exports.addBatchItems = function(model)
{
   return function(req, res, next)
    {
        console.log('prebatching...');
        console.log(req.body);
        var resourceProvider = new ResourceProvider();
        resourceProvider.addBatchItems(model, req, res, next, function(results)
            {
                console.log('batch results');
                console.log(results);
                res.send(results);
            }
        );
    };
};

// add
exports.copyItem = function(data)
{
   return function(req, res, next)
    {
        //console.log('req body '+JSON.stringify(req.body));
        var resourceProvider = new ResourceProvider();
        resourceProvider.copyItem(data, req, res, next, function(results)
            {
                res.send(results);
            }
        );
    };
};


// update
exports.update = function(model)
{
    // NOTE: This update is not a full update but partial update
    // Object validation is supported
   return function(req, res)
    {
      console.log("update (globals)", req.body);
     //var resourceProvider = new ResourceProvider();
      new ResourceProvider().update(model, req, res, function(results)
      {
         res.send(results);
      }
     );
  };
};

// delete
exports.delete = function(model)
{
   return function(req, res, next)
    {
      console.log("delete (global)");
        //var resourceProvider = new ResourceProvider();
        new ResourceProvider().deleteItem(model, req, res, next, function(results)
            {
                res.send(results);
            }
        );
    };
};

// export
exports.exportSurvey = function(model)
{
    return function(req, res, next)
    {
        var resourceProvider = new ResourceProvider();
        resourceProvider.exportSurvey(model, req, res, next, function(results)
        {
            res.send(results);
        });
    };
};


///////////////////
// helper methods
///////////////////

// permissioning
exports.permissioning = function(model)
{
    return function(req, res, next)
    {
        // declarations
        var method = req.method;
        var userId = req.user._id;
        var isMatch = false;

        // get token
        /*var raw = req.headers.authorization;
        var split = raw.split(" ");
        var token = split[1];*/

        // get permissions
        //var resourceProvider = new ResourceProvider();
        new ResourceProvider().findById(model, req, res, function(results)
            {
               //console.log(JSON.stringify(results, undefined, 2));
                //res.send(results);
                // validate that results is not null AND permissions is not an empty array
                if (results && results.permissions.length > 0)
                {
                    // first, check if permissioning is global
                    //console.log("isGlobal=" + results.permissions[0].isGlobal);
                    console.log("method=" + req.method);
                    for (var i = 0; i < results.permissions[0].userPermissions.length; i++)
                    {
                        console.log(userId);
                        // HACK: converting userId from ObjectId to string -- should instead cast (or store) user as mongoose ObjectId
                        // FIX: convert string to obj id via mongoose.Types.ObjectId(string)
                        if (results.permissions[0].userPermissions[i].user == userId.toString())
                        {
                            console.log("MATCH!");
                            isMatch = true;
                        }
                       //console.log(JSON.stringify(results.permissions[0].userPermissions[i].user, undefined, 2));
                    }
                    console.log("isMatch="+isMatch);
                    if (method == "GET" && isMatch === false)
                    {
                        // set items isEditable property to 'false'
                        console.log("=== add isEditable=false virtual prop");
                    }
                    else if ((method == "PUT" || method == "DELETE") && isMatch === false)
                    {
                        // throw error
                    }
                }
            }
        );

        // response
        //console.log("data " + res);
        // if permissioning passes...
        next();
    };
};

// exports.noAuth = function()
// {
//     return function(req, res, next)
//     {
//         next();
//     }
// }
// exports.yesAuth = function()
// {
//     return passport.authenticate('bearer', { session: false});
// }
// exports.middleAuth = function()
// {
//     //return this;
// }
