var Class = require("osr-class");

var Model = Class.extends({
	
	$:function( params ){
		for(var key in this.__schema){
			if(undefined == params[key]) continue;
			this[key] = params[key];
		}
		Object.defineProperty(this,"condition",{
			get:function(){
				var condition = {};
				var _this = this;
				Object.keys(this.__schema).forEach(function( item, index ){
					if(undefined == _this[item])return;
					condition[item] = _this[item];
				});
				return condition;
			}
		});
	},
	
	save: function(){
		var db = new this.__model();
		var _this = this;
		Object.keys(this.__schema).forEach(function( item, index ){
			if( undefined == _this[item])return;
			db[item] = _this[item];
		});
		console.log(db);
		db.save.apply(null,arguments);
	},
	
	findOne: function(){
		return this.__model.findOne.apply(this.__model,arguments);
	},
	
	find: function(){
		return this.__model.find.apply(this.__model,arguments);
	},
	
	update: function(){
		return this.__model.update.apply(this.__model,arguments);
	},
	
	create: function(){
		return this.__model.save.apply(this.__model,arguments);
	},
	
	findOneAndUpdate: function(){
		return this.__model.findOneAndUpdate.apply(this.__model,arguments);
	},
	
	remove:function(){
		return this.__model.remove.apply(this.__model,arguments);
	}
	
});
Model.apaterClasses = {};
Model.apaterObjects = {};
Model.__isConfig = false;
Model.Config = function( config ){
	if(!config)config={};
	Model.config = config;
	Model.apaters = config.apaters||{"develope":{ type:"mongodb",url:"mongodb://127.0.0.1/osr-model-demo"}};
	Model.env = config.env || "develope";
	Object.keys(Model.apaters).forEach(function(item,index){
		if(!Model.apaterClasses[Model.apaters[item].type]){
			require("osr-model-"+Model.apaters[item].type);
		}
		Model.apaterObjects[item] = new Model.apaterClasses[Model.apaters[item].type]( Model.apaters[item] );
	});
	Model.__isConfig = true;
}

Model.model = function( params ){
	if(!Model.__isConfig)Model.Config();
	if(!params)return null;
	var name = params.name;
	var schema = params.schema;
	var apater = params.apater;
	var env = params.env || Model.env;
	var apaterObj = Model.apaterObjects[env];
	var ModelClass = Model.extends({
		__schema:	schema,
		__name: 	name,
		__apater:	apaterObj,
		__env:		env,
		__model:	apaterObj.model( name, schema )
	});
	
	ModelClass.findOne = function(){
		return ModelClass.prototype.findOne.apply(ModelClass.prototype,arguments);
	}
	
	ModelClass.find = function(){
		return ModelClass.prototype.find.apply(ModelClass.prototype,arguments);
	}
	
	ModelClass.findOneAndUpdate = function(){
		return ModelClass.prototype.findOneAndUpdate.apply(ModelClass.prototype,arguments);
	}
	
	ModelClass.create = function(){
		return ModelClass.prototype.create(ModelClass.prototype,arguments);
	}
	
	ModelClass.remove = function(){
		return ModelClass.prototype.remove( ModelClass.prototype, arguments );
	}
	
	return ModelClass;
}

module.exports = exports = Model;