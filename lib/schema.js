var Class = require("osr-class");
var MongooseSchema = require("mongoose").Schema;
var SchemaClass = Class.extends(MongooseSchema);
var Schema = SchemaClass.extends({
  $ : function(){
    this._schema = MongooseSchema.apply(this,arguments);
  },
  post: function(){
    return this._schema.post.apply(this._schema,arguments);
  },
  pre: function(){
    return this._schema.pre.apply(this._schema,arguments);
  },
});

return module.exports = Schema;
