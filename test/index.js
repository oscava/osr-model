var Mongoose = require("mongoose");

var Model = require("../");

var conn = Mongoose.createConnection("mongodb://127.0.0.1/Demo");

var User = Model.define("User",{
	uname:{ type:String, index: true },
	upass:{ type:String, index: true }
});
User.pre("save",function(next,done){
	console.log(arguments);
	this.upass = this.uname+"Hello:password";
	done("你好，不小心报错了");
});

User.post("save",function(){
	console.log("post:save",arguments);
});

var ModelUser = new User(conn);

ModelUser.create({
	uname:"DemoName"
},function(err,usr){
	console.log(err,usr);
});
