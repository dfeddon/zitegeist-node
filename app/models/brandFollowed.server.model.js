var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandFollowedSchema = new Schema(
{
    brand:              { type:Schema.Types.ObjectId, ref:'Brand' },
    user:               { type:Schema.Types.ObjectId, ref:'User' },
    campaignsCompleted: { type:Number, default:0 },
    alignment:          { type:Number, default:0 },
    vestment:           { type:Number, default:0},
    suggestions:        [ { type:Schema.Types.ObjectId, ref:'Campaign' } ],
    archived:           { type:Boolean, required:false, default:false }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

mongoose.model('BrandFollowed', BrandFollowedSchema);
