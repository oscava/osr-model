var OSRModel = require("../");

var Class = require("osr-class");

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Mongodb = Class.extends({
	$:function( config ){
		this.conn = mongoose.createConnection( config.url );
	},
	model:function( name, schema){
		return this.conn.model( name, new Schema( schema), name );
	}
});

Object.defineProperty(OSRModel.apaterClasses,"mongodb",{
	writable: false,
	value: Mongodb
});
