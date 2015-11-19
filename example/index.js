var Model = require("../");

var Mongoose = require("mongoose");

var conn  = Mongoose.createConnection("mongodb://127.0.0.1/Demo");

var ModelUser = Model.define("User",{
  uname:  { type:String, index: true, required: true },
  upass:  { type:String },
  regtime:{ type:Number }
});

var User = new ModelUser( conn );

User.pre("save",function(done){
  this.upass = this.uname+Date.now()+"pre:save";
  done();
});

User.post("save",function(){
  console.log('post:save',arguments);
});

// User.findOne(function(err,user){
//   console.log(err,user);
// });

User.create({ uname: "Date.now"+Date.now(), upass:"fffff"},console.log);
