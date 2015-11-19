var Adapter = require("./");

var Mongo = Adapter.extends({});

Adapter.adapters["mongo"] = function( name, conn , schema){
  var db = conn.model( name, schema._schema, name );
  return new Mongo( name, db, schema )
}

return module.exports = Mongo;
