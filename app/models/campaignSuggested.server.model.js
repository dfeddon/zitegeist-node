var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignSuggestedSchema = new Schema(
{
    status:                     { type:Number, enum:[0,1,2,3], default:0 }, // 0=false, 1=true, 2=accepted, 3=denined
    votesYes:                   [ { type:Schema.Types.ObjectId, ref:'User' } ],
    votesNo:                    [ { type:Schema.Types.ObjectId, ref:'User' } ],
    suggestedBy:                { type:Schema.Types.ObjectId, ref:'User' }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

CampaignSuggestedSchema.methods.getPopulates = function()//("getPopulates", function()
{
    return "suggestedBy";
};

mongoose.model('CampaignSuggested', CampaignSuggestedSchema);
