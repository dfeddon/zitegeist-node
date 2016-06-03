(function() {'use strict';}());

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClientSchema = new Schema(
{
  name:           { type:String, unique:true, required:true },
  clientId:       { type:String, required:true },
  secret:         { type:String, required:true },
  userId:         { type:String, required:true }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

ClientSchema.methods.storeToken = function(callback)
{
  console.log("storeToken");
  var client = this;
  console.log('userid', client.user._id);
};

ClientSchema.methods.findUserOfToken = function(callback)
{
  console.log("findUserOfToken");
  var client = this;
  console.log('userid', client.user._id);
};

ClientSchema.methods.rejectToken = function(callback)
{
  console.log("rejectToken");
  var client = this;
  console.log('userid', client.user._id);
};

mongoose.model('Client', ClientSchema);
