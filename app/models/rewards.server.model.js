var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RewardSchema = new Schema(
{
  type:           	{ type:String, enum: ["gender","age","education","income","rank","country","zipcode","custom"], required: true, default: "custom" },
  credits:          { type:Number, default:0, required: false },
  couponText:       { type:String, required: false },
  couponCode:       { type:String, required: false },
  couponPrefix:     { type:String, required: false }
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

mongoose.model('Reward', RewardSchema);
