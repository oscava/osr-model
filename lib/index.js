var Class = require("osr-class");
var Schema = require("mongoose").Schema;
var Model = Class.extends({
  $: function(conn) {
		// this._schema = new Schema(this.schema);
    this.db = conn.model(this.name, this._schema , this.name);
  },
  findOne: function() {
    return this.db.findOne.apply(this.db, arguments);
  },
  find: function() {
    return this.db.find.apply(this.db, arguments);
  },
  update: function() {
    return this.db.update.apply(this.db, arguments);
  },
  findOneAndUpdate: function() {
    return this.db.findOneAndUpdate.apply(this.db, arguments);
  },
  remove: function() {
    return this.db.remove.apply(this.db, arguments);
  },
  create: function(inobj, cb) {
    var db = new this.db();

    Object.keys(this.schema).forEach(function(item, index) {
      if (undefined == inobj[item]) return;
      db[item] = inobj[item];
    });

    return db.save(cb);
  },
  where: function() {
    return this.db.where.apply(this.db, arguments);
  }
});

Model.define = function(name, schema) {
  var ModelClass = Model.extends({
    name: name,
    schema: schema,
    _schema: new Schema(schema)
  });
  ModelClass.pre = ModelClass.prototype._schema.pre.bind(ModelClass.prototype._schema);
  ModelClass.post = ModelClass.prototype._schema.post.bind(ModelClass.prototype._schema);
  return ModelClass;
}

module.exports = Model;
