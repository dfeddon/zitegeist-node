// Load required packages
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Define our token schema
var AccessTokenSchema = new mongoose.Schema(
{
  userId:       { type:String, required:true },
  clientId:     { type:String, required:true },
  token:        { type:String, required:true, unique:true }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('AccessToken', AccessTokenSchema);
