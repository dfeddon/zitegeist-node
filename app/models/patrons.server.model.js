var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PatronSchema = new Schema(
{
    firstname:          { type:String, required:false },
    lastname:           { type:String, required:false },
    email:              { type:String, required:false },
    addressZip:         { type:String, required:false },
    addressCountry:     { type:String, enum:['us'] },
    language:           { type:String, enum:['en'] },
    beacons:            [ 'Beacons' ]
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

mongoose.model('Patron', PatronSchema);
