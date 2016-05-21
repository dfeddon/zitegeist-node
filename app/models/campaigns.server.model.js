var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignSchema = new Schema(
{
    name:               { type:String, required:false },
    teaser:             { type:String, required:false },
    featuredType:       { type:Number, enum:[0,1,2,3,4,5], default:0 },
    sample:             { type:Number, default:0 },
    //audience: public, ranked, suggested
    //demographics:        { type:Schema.Types.ObjectId, ref:'Demographic' },
    //schedule:           { type:Schema.Types.ObjectId, ref:'Schedule' },
    isActive:           { type:Boolean, default:false },
    isComplete:         { type:Boolean, default:false },
    isPrivate:          { type:Boolean, default:false },
    //isSuggested:        { type:Boolean, default:false },
    owner:              { type:Schema.Types.ObjectId, ref:'User' },
    suggested:          [ 'CampaignSuggested' ],
    //reports:            [ 'Reports' ],
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
