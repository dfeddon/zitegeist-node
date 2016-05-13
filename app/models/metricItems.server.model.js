var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MetricItemSchema = new Schema(
{
    index:              { type:Number, required:false },
    value:              { type:String, required:false },
    label:              { type:String, required:false }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

mongoose.model('MetricItem', MetricItemSchema);
