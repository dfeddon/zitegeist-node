var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BeaconSchema = new Schema(
{
    name:               { type:String, required:false },
    brandScore:         { type:Number, required:false, default:0 },
    archived:           { type:Boolean, required:false, default:false }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

mongoose.model('Beacon', BeaconSchema);
