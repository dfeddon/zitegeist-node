var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignEngagementSchema = new Schema(
{
  type:               { type:String, enum:["beacons", "ranked", "friends", "global"], default:"beacons" },
  ranks:              { type:Array, default:[] },
  beacons:            [ { type:Schema.Types.ObjectId, ref:'Beacon' } ],
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

mongoose.model('CampaignEngagement', CampaignEngagementSchema);
