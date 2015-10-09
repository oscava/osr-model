var OSRModel = require("../");
require("./mongodb");
var Demo = OSRModel.model({
	name: "Demo",
	schema:{
		name:		{ type: String, index: true, required: true, unique: true },
		time:		{ type: Number },
	}
});

var demo  = new Demo({ name: "demo", time: Date.now() });

demo.save( function( err, obj ){
	demo.findOne( { name: obj.name }, function( err, obj ){
		console.log( err, obj );
	})
});

// Demo.findOne({ name:"hello"}, function( err, one ){
	// console.log(err, one);
// })