var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandSchema = new Schema(
{
    name:               { type:String, unique:true, required:false },
    users:              [ 'Users' ],
    campaigns:          [ 'Campaigns' ],
    admin:              { type:Schema.Types.ObjectId, ref:'Users' }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

// BrandSchema.set('validateBeforeSave', true);
// BrandSchema.path('dateCreated').validate(function(value)
// {
//     Ti.API.info('validating...');
//     if (value===null)
//     {
//         value = date.now;
//     }
//     return value;
// });

mongoose.model('Brand', BrandSchema);
