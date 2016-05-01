var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BeaconSchema = new Schema(
{
    name:               { type:String, unique:true, required:false },
    fame:               { type:Number, required:false }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

mongoose.model('Beacon', BeaconSchema);
