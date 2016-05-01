var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MetricSchema = new Schema(
{
    label:          	{ type:String, required: false },
    index:  		 	{ type:Number, required: false},
    //description:    	{ type:String, required: false },
    //isEditable:         { type:Boolean, default:false},
    variable:       	{ type:String, required: false },
    //variableAuto:       { type:Boolean, required: false, default:false},
    stem:           	{ type:String, required: false },
    instructions:   	{ type:String, required: false },
    response:       	{ type:Array, required: false },
    type:           	{ type:String, enum: ["radio","checkbox","dropdown","text","essay","likert","semantic differential"], required: false },
    layout:         	{ type:String, enum:["horizontal","vertical"], required: false, default: "vertical" },
    isPreset:    		{ type:Boolean, required: false, default: false },
    presetLabel:   	    { type:String, required: false },
    required:       	{ type:Boolean, required: false, default: false },
    randomize:      	{ type:Boolean, required: false, default: false },
    reverse:        	{ type:Boolean, required: false, default: false },
    //visible:        	{ type:Boolean, required: false, default: true },
    //remove:         	{ type:Number, required: false, default: 0 },
    randomizeItems: 	{ type:Boolean, required: false, default: false },
    //conditions:     	{ type:Array, required: false },
    scale:          	{ type:Number, required: false, default: null},
    //libraryType:    	{ type:String, enum:["none","single","group"], default: "none"},
    //libraryLabel:		{ type:String, required:false},
    //libraryDescription: { type:String, required:false},
    //piping:         	[ 'Piping' ],
    items:          	[ 'MetricItems' ],
    //tableItems:     	[ 'TableItems' ],
    //metricLogic:        [ 'Logic' ],
    //permissions:    	[ 'Permissions' ]
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

mongoose.model('Metric', MetricSchema);
