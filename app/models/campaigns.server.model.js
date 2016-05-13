var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignSchema = new Schema(
{
    name:               { type:String, required:false },
    teaser:             { type:String, required:false },
    featuredType:       { type:Number, enum:[0,1,2,3,4,5], default:0 },
    owner:              { type:Schema.Types.ObjectId, ref:'User' },
    demographic:        { type:Schema.Types.ObjectId, ref:'Demographic' },
    schedule:           { type:Schema.Types.ObjectId, ref:'Schedule' },
    reports:            [ 'Reports' ],
    metrics:            [ 'Metrics' ],
    beacons:            [ 'Beacons'],
    userPermissions:    [ 'UserPermissions' ]
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

CampaignSchema.methods.getPopulates = function()//("getPopulates", function()
{
    return "owner";
};

mongoose.model('Campaign', CampaignSchema);
