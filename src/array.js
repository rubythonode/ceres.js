(function($_){
  $_.N.namespace("ceres.A");
  var union = _.union, nativeReduce = Array.prototype.reduce, each = $_.C.each,
  map = $_.C.map, nativeFilter = Array.prototype.filter, nativeEntry = Array.prototype.every, nativeIndexOf = Array.prototype.indexOf;
  var reduce = function(col, iterator, memo, context){
    var initial = arguments.length > 2;
    if($_.O.isNull(col == null)){
      throw new TypeError();
    }
    if(nativeReduce && _.isEqual(col.reduce, nativeReduce)){
      if(context){
        iterator = $_.F.bind(iterator, context);
      } 
      return initial? col.reduce(iterator, memo) : col.reduce(iterator);
    }
    map(col, function(v,k){
      if(!initial){
        memo = v;
        initial = true;
      }else{
        memo = iterator.call(context, memo, v);
      }
    });
    return memo;
  };
  var first = _.first;
  var merge = union;
  var last = _.last;
  var initial = _.initial;
  var filter = function(col, iterator, context){
    var results = [];
    if($_.O.isNull(col)){
      throw new TypeError();
    }
    if(nativeFilter && $_.B.op["equals"](col.filter, nativeFilter)){
      return col.filter(iterator, context);
    } 
    map(col, function(v,k){
      if(iterator.call(context,v)){
        results[results.length] = v;
      }
    });
    return results;
  };
  var every = function(col, iterator, context){
    if($_.O.isNull(col)){
      throw new TypeError();
    }
    if(nativeEntry && col.every === nativeEntry){
      return col.every(iterator, context);
    }
    return _.every(col, iterator, context);
  };

  var include = function(col, ele){
    if($_.O.isNull(col)){
      throw new TypeError();
    }
    if (nativeIndexOf && col.indexOf === nativeIndexOf){
      return col.indexOf(ele) != -1;
    }
    each(col,function(v){
      if($_.B.op["equals"](v,ele)) return true;
    }); 
    return false;
  };

  $_.B.extend($_.A,{
    union: union,
    reduce: reduce,
    merge: union,
    first: first,
    last: last,
    initial: initial,
    filter: filter,
    every: every,
    include: include
  });
}).call(this,ceres);
