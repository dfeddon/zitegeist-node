var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserBeaconSchema = new Schema(
{
    beacon:             { type:Schema.Types.ObjectId, ref:'Beacon' },
    //age:                { type:Number, required:false, default:0 },
    archived:           { type:Boolean, required:false, default:false }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

UserBeaconSchema.methods.getPopulates = function()//("getPopulates", function()
{
    return "beacon";
};

mongoose.model('UserBeacon', UserBeaconSchema);
