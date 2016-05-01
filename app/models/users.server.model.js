var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var UserSchema = new Schema(
{
    displayName:        { type:String, required:false },
    username:           { type:String, unique:true, required:false },
    email:              { type:String, unique:true, required:false },
    password:           { type:String, required:false },
    phone:              { type:String, unique:true, required:false },
    addressZip:         { type:String, required:false },
    addressCountry:     { type:String, enum:['us'] },
    language:           { type:String, enum:['en'] },
    beacons:            [ 'UserBeacons' ]
},
{
    timestamps:
    {
        createdAt:'dateCreated',
        updatedAt:'dateEdited'
    }
});

UserSchema.pre('save', function(next)
{
  console.log("pre save", this, this.isModified('password'));
  var user = this;

  if(user.isModified('password'))
  {
    bcrypt.hash(user.password, null, null, function(err, hash)
    {
      if (err)
      {
        console.log("error saving password", err);
        next();
      }
      console.log("pass hashed!", hash);
      user.password = hash;
      console.log('user.pass', user.password);
      next();
    });
  }
  else next();
});

UserSchema.methods.comparePassword = function(attemptedPassword, callback)
{
  console.log("comparing password", attemptedPassword);
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch)
  {
    console.log("isMatch", isMatch);
    callback(isMatch);
  });
};
// PatronSchema.virtual('fullname').set(function()
// {
//     return this.firstname + ' ' + this.lastname;
// });



mongoose.model('User', UserSchema);
