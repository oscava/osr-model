var Class = require("osr-class");
var Schema = require("./schema");
var MongoAdapter = require("./adapter/mongo");
var RedisAdapter = require("./adapter/redis");
var Adapter = require("./adapter");
var Model = Class.extends({

  $ : function( db ){
    // this.adapter = adapter;
    this.adapter = Adapter.getAdapter( db , this );
  },

  findOne: function(){
    return this.adapter.findOne.apply(this.adapter,arguments);
  },

  find: function(){
    return this.adapter.find.apply(this.adapter,arguments);
  },

  create: function(){
    return this.adapter.create.apply(this.adapter,arguments);
  },

  pre: function(){
    return this.adapter.pre.apply(this.adapter,arguments);
  },

  post: function(){
    return this.adapter.post.apply(this.adapter,arguments);
  }

});

Model.define = function( name, schema ){
  var ModelClass = Model.extends({
    _name: name,
    _schema: new Schema(schema)
  });
  return ModelClass;
}

return module.exports = Model;
