var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignSchema = new Schema(
{
    name:               { type:String, required:false },
    teaser:             { type:String, required:false },
    featuredType:       { type:Number, enum:[0,1,2,3,4,5], default:0 },
    demographic:        { type:Schema.Types.ObjectId, ref:'Demographics' },
    schedule:           { type:Schema.Types.ObjectId, ref:'Schedules' },
    reports:            [ 'Reports' ],
    metric:             [ 'Metrics' ],
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

mongoose.model('Campaign', CampaignSchema);
