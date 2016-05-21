var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandSchema = new Schema(
{
    campaigns:          [ { type:Schema.Types.ObjectId, ref:'Campaign' } ],
    userPermissions:    [ { type:Schema.Types.ObjectId, ref:'User' } ],
    owner:              { type:Schema.Types.ObjectId, ref:'User' }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

BrandSchema.methods.getFollowers = function(callback)
{
    return BrandFollowed.find({ brand: this.model("Brand")._id });
};

mongoose.model('Brand', BrandSchema);
