var Class = require("osr-class");
var Connection = require("mongoose").Connection;
var Adapter = Class.extends({
  $ : function( name, db, schema ){
    this.name = name;
    this.db = db;
    this.schema = schema;
  },
  findOne: function(){
    return this.db.findOne.apply(this.db,arguments);
  },
  find: function(){
    return this.db.find.apply(this.db,arguments);
  },
  update: function(){
    return this.db.update.apply(this.db,arguments);
  },
  create: function(){
    return this.db.create.apply(this.db,arguments);
  },
  findOneAndUpdate:function(){
    return this.db.findOneAndUpdate.apply(this.db,arguments);
  },
  pre: function( method, fn ){
    return this.schema.pre.apply(this.schema,arguments);
  },
  post:function( method, fn ){
    return this.schema.post.apply(this.schema,arguments);
  }
});

Adapter.adapters = {};

Adapter.getAdapter = function( db ,model){
  if(db instanceof Connection){
    return Adapter.adapters["mongo"](model._name,db,model._schema);
  }
  // if(Adapter.adapters[type]){
  //   return Adapter.adapters[type](model._name, db, model._schema);
  // }
  // return null;
}

return module.exports = Adapter;
