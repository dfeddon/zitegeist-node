(function() {'use strict';}());

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    //Brand = mongoose.model("Brand"),
    Brand = require('./brands.server.model'),
    Schema = mongoose.Schema;

var UserSchema = new Schema(
{
    displayName:        { type:String, required:false },
    username:           { type:String, unique:true, required:false },
    location:           { type:String, required:false },
    addressZip:         { type:String, required:false },
    addressCountry:     { type:String, enum:['us'] },
    language:           { type:String, enum:['en'] },
    email:              { type:String, unique:true, required:false },
    password:           { type:String, required:false },
    phone:              { type:String, unique:true, required:false },
    image:              { type:String, required:false },
    backgroundImage:    { type:String, required:false },
    brand:              { type:Schema.Types.ObjectId, ref:'Brand' },
    following:          [ { type:Schema.Types.ObjectId, ref:'BrandsFollowed' } ],
    campaignsTaken:     [ { type:Schema.Types.ObjectId, ref:'Campaign' } ],
    //campaigns:          [ { type:Schema.Types.ObjectId, ref:'Campaign' } ],
    beacons:            [ 'UserBeacon' ],
    demographics:       [ 'Demographic' ]
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

UserSchema.methods.getUserBeacons = function(callback)//("getPopulates", function()
{
  console.log("getUserBeacons");
  var user = this;
  console.log('userid', user._id);

  mongoose.model("User").findOne({_id: user._id})
  .populate(
    {
      path:"beacons.beacon",
      model:'Beacon'
    }
  )
  .exec(
    function(err, model)
    {
      console.log('::m1', model);
      //mongoose.model("UserBeacon").populate(model1, {path:'beacons.beacon'}, function(err,model)
      //mongoose.model("UserBeacon").populate(model1, {path:'beacons.beacon'}, function(err,model)
      //mongoose.model("UserBeacon").populate(model1.beacons.beacon, function(err,model)
      {


      if (err)
      {
        console.log('err', err);
        return callback(err, null); //next(err);
      }
      else
      {
        console.log('return', model.beacons);
        if (model !== null)
          return callback(null, model.beacons);
        //else next();
      }
    }
  })
};

UserSchema.pre('save', function(next)
{
  var user = this;

  //*
  if (user.isModified('password'))
  {
    bcrypt.hash(user.password, null, null, function(err, hash)
    {
      if (err)
      {
        console.log("error saving password", err);
        next();
      }
      user.password = hash;

      if (user.isNew) user.userBrand(function(err, brand)
      {
        console.log('before next', user);
        next();
      });
      else next();
    });
  }
  else//*/
  if (user.isNew)
  {
    this.userBrand(function(err, brand)
    {
      next();
    });
  }
  else next();
});

UserSchema.methods.userBrand = function(callback)
{
  var user = this;

  // create brand
  var brand = new Brand({owner: user._id});
  console.log('user id', user._id);

  brand.save(function(err, model)
  {
    if (err)
    {
      console.log('error', err);
      return callback(err, null);
    }

    console.log('brand saved', brand);
    user.brand = brand._id;

    return callback(null, brand);//.next();
  });
};

/*UserSchema.post('save', function(doc)
{
  if (doc.brand == null)
  {

  }
});*/

UserSchema.methods.comparePassword = function(attemptedPassword, callback)
{
  console.log("comparing password", attemptedPassword, this.password);

  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch)
  {
    if (err) return callback(err);
    else return callback(null, isMatch);
  });
};
// PatronSchema.virtual('fullname').set(function()
// {
//     return this.firstname + ' ' + this.lastname;
// });



mongoose.model('User', UserSchema);
