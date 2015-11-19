var Adapter = require("./");

var Redis = Adapter.extends({
  create: function(){

  },
  findOne: function(){
    
  }
});

Adapter.adapters["redis"] = function( name, conn , schema){
  return new Redis( name, conn, schema )
}

return module.exports = Redis;
