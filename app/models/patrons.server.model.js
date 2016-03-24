var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PatronSchema = new Schema(
{
    firstname:          { type:String, required:false },
    lastname:           { type:String, required:false },
    email:              { type:String, unique:true, required:false },
    addressZip:         { type:String, required:false },
    addressCountry:     { type:String, enum:['us'] },
    language:           { type:String, enum:['en'] },
    beacons:            { type:Schema.Types.ObjectId, ref:'Beacons' }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

// PatronSchema.virtual('fullname').set(function()
// {
//     return this.firstname + ' ' + this.lastname;
// });

mongoose.model('Patron', PatronSchema);
