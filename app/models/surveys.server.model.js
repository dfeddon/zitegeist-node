var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SurveySchema = new Schema(
{
    name:          	    { type:String, required: false },
    description:    	{ type:String, required: false },
    status:             { type:String, enum:["active","inactive","test"], default:"active" },
    type:           	{ type:String, enum: ["single","multiple","demographic"], required: true, default: "single" },
    isTemplate:    		{ type:Boolean, required: false, default: false },
    presetLabel:   	    { type:String, required: false },
    randomize:      	{ type:Boolean, required: false, default: false },
    reverse:        	{ type:Boolean, required: false, default: false },
    randomizeItems: 	{ type:Boolean, required: false, default: false },
    scale:          	{ type:Number, required: false, default: null},
    demographics:       [ 'Demographic' ],
    metrics:          	[ 'Metric' ]
    //permissions:    	[ 'Permissions' ]
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

mongoose.model('Survey', SurveySchema);
