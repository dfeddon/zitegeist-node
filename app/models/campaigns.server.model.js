var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignSchema = new Schema(
{
    name:               { type:String, required:false },
    teaser:             { type:String, required:false },
    featuredType:       { type:Number, enum:[0,1,2,3,4,5], default:0 },
    sample:             { type:Number, default:0 },
    engagementType:     { type:String, enum:["beacons", "ranked", "friends", "global"], default:"beacons" },
    targetRanks:        { type:Array, default:[] },
    demographics:       { type:Schema.Types.ObjectId, ref:'Demographic' },
    schedule:           { type:Schema.Types.ObjectId, ref:'Schedule' },
    isActive:           { type:Boolean, default:false },
    isComplete:         { type:Boolean, default:false },
    isPrivate:          { type:Boolean, default:false },
    isSuggested:        { type:Boolean, default:false },
    brand:              { type:Schema.Types.ObjectId, ref:'Brand' },
    suggested:          [ 'CampaignSuggested' ],
    reports:            [ 'Reports' ],
    metrics:            [ 'Metrics' ],
    beacons:            [ { type:Schema.Types.ObjectId, ref:'Beacon' } ],
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
    return "brand beacons";
};

mongoose.model('Campaign', CampaignSchema);
