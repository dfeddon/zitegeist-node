var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MetricSchema = new Schema(
{
    name:          	    { type:String, required: false },
    index:  		 	{ type:Number, required: false},
    //description:    	{ type:String, required: false },
    //isEditable:         { type:Boolean, default:false},
    variable:       	{ type:String, required: false },
    //variableAuto:       { type:Boolean, required: false, default:false},
    //stem:           	{ type:String, required: false },
    multiples:          { type:Boolean, required: false, default: false },
    indexStyle:         { type:String, enum: ["numeric","alpha","custom","none"], default:"numeric" },
    question:          	{ type:String, required: false },
    response:       	{ type:Array, required: false },
    type:           	{ type:String, enum: ["single","multiple","text","essay"], required: false, default: "single" },
    layout:         	{ type:String, enum: ["horizontal","vertical"], required: false, default: "vertical" },
    isPreset:    		{ type:Boolean, required: false, default: false },
    presetLabel:   	    { type:String, required: false },
    required:       	{ type:Boolean, required: false, default: true },
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
    //items:          	[ { type:Schema.Types.ObjectId, ref:'MetricItem' } ]
    items:          	[ 'MetricItem' ]
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
