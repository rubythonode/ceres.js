(function($_){
  $_.N.namespace("ceres.P");
  var validator = {
    types: {},
    isValid: function(types, data){
      for(var i=0; i<types.length; i++){
        var checker = this.types[types[i]];
        if(!checker.isValid.call(checker,data)){
          return false;
        }
      }
      return true;
    }
  };

  var Cmd = function(arg){
    this.arg = arg;
  };
  Cmd.prototype.execute = function(){
    this.action.call(this, this.arg);
  };
  var maker = function(method, arg){
    var c = function(){
      Cmd.call(this,arg);
    };
    c.prototype = new Cmd;
    c.prototype.action = method;
    return new c;
  };
  function Macro(){
    this.cmds = [];
  }
  Macro.prototype = new Cmd;
  Macro.prototype.add = function(cmd){
    this.cmds.push(cmd);
  };
  Macro.prototype.execute = function(){
    for(var i=0;i<this.cmds.length;i++){
      this.cmds[i].execute.call(this.cmds[i]);
    }
    this.cmds = [];
  };
  var cmdPattern = {
    maker: maker,
    macro: Macro,
    cmd: Cmd
  };
  var Factory = function(){
  };
  Factory.prototype.get = function(base){
    return new (Function.prototype.bind.apply(base,arguments));
  };
  
  var state = {
    fns: [],
    set: function(state){
      this.state = state;
    },
    add: function(state,fn){
      if(!$_.F.isFunction(fn)){
        throw new TypeError();
      }
      this.fns[state] = fn;
    },
    run: function(){
      var args = Array.prototype.slice.call(arguments,0);
      this.fns[this.state].call(this,args);
    }
  };

  function Deco(next,deco){
    this.next = next;
    this.deco = deco;
  }
  Deco.prototype.execute = function(val){
    val = this.deco(val);
    return this.next?this.next.execute(val):val;
  };
  $_.B.extend($_.P,{
    validator: validator,
    cmdPattern: cmdPattern,
    factory: new Factory,
    state: state,
    deco: Deco
  });
}).call(this,ceres);
