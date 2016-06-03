var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    //Brand = mongoose.model("Brand"),
    Schema = mongoose.Schema;

var UserPrivatesSchema = new Schema(
{
  user:               { type:Schema.Types.ObjectId, ref:'User' },
  addressZip:         { type:String, required:false },
  addressCountry:     { type:String, enum:['us'] },
  language:           { type:String, enum:['en'] },
  email:              { type:String, unique:true, required:false },
  password:           { type:String, required:false },
  phone:              { type:String, unique:true, required:false },
});

UserPrivatesSchema.pre('save', function(next)
{
  //console.log("pre save", this, this.isModified('password'));
  var user = this;

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
  /*else if (user.isNew)
  {
    this.userBrand(function(err, brand)
    {
      next();
    });
  }*/
  else next();
});

UserPrivatesSchema.methods.comparePassword = function(attemptedPassword, callback)
{
  //console.log("comparing password", attemptedPassword, this.password);

  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch)
  {
    if (err) return callback(err);
    else callback(null, isMatch);
  });
};

mongoose.model('UserPrivates', UserPrivatesSchema);
