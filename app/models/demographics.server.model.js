var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DemographicSchema = new Schema(
{
    name:          	    { type:String, required: false },
    description:    	{ type:String, required: false },
    status:             { type:String, enum:["active","inactive","test"], default:"active" },
    type:           	{ type:String, enum: ["gender","age","education","income","rank","country","zipcode","custom"], required: true, default: "custom" },
    metrics:          	[ 'Metric' ]
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

mongoose.model('Demographic', DemographicSchema);
