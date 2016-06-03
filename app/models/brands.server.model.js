var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandSchema = new Schema(
{
    //campaigns:          [ { type:Schema.Types.ObjectId, ref:'Campaign' } ],
    //userPermissions:    [ 'UserPermissions' ],
    owner:              { type:Schema.Types.ObjectId, ref:'User' }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

BrandSchema.methods.getPopulates = function()
{
    return "owner";
};

BrandSchema.methods.getFollows = function(callback)
{
    return BrandFollow.find({ brand: this.model("Brand")._id });
};

mongoose.model('Brand', BrandSchema);
