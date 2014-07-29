var stdlib = require('./instructions.js');

//parses a single line of assembly
exports.parseLine = function(line){
  tmp = line;
  line = line.replace(/^\s+/,''); //eliminate leading whitespace
  
  
  var parts = line.split(/\s+/);
  var int   = parts.shift();
  if(int.startsWith('.')){
    return parseConfig(line);
  }else if(int.contains(':')){
    return parseLabel(line);
  }
  int = genInt(int.toLowerCase());
  
  line = parts.join(' ').toLowerCase();
  line = line.replace(/;.*$/,'');  //eliminate comments
  
  var out = parsers.generic(line,stdlib.instructions[int[0]].parser);
  out = {instruction:int[0]||int,conditional:int[1],option:int[2],args:out,str:tmp};
  
  console.log(line,out);
  return out;
};

function parseConfig(line){
  return line;
}
function parseLabel(line){
  return {label:line};
}

var parsers = {};
parsers.rn = function(line){ //parse
  var rn, tmp = line;
  line = line.replace(/^\s+/,''); //eliminate leading whitespace
  
  for(var i = 0; i < line.length; i++){
    if(line[i] === ' ' || line[i] === ','){
      rn = line.slice(0,i);
      line = line.slice(i+1);
      break;
    }
  }
  if(!rn){
    rn = line;
    line = '';
  }
  if(rn && (stdlib.registers.indexOf(rn) >= 0 ||
     rn.startsWith('#'))){
    return [line,rn];
  }
  return [tmp];
};
parsers.op = function(line){
  var op, barrel, tmp = line;
  line = parsers.rn(line);
  op = line[1];
  line = parsers.barrel(line[0]);
  
  if(line.length === 3 && line[2]){
    return [line[0],op,line[1],line[2]];
  }
  if(line.length >= 2 && line[1]){
    return [line[0],op,line[1]];
  }
  if(line.length >= 1){
    return [line[0],op];
  }
};
parsers.barrel = function(line){
  var bs;
  line = line.replace(/^\s+/,'');
  for(var i = 0; i < line.length; i++){
    if(line[i] === ' ' || line[i] === ','){
      bs = line.slice(0,i);
      line = line.slice(i+1);
      break;
    }
  }
  if(!bs){
    bs = line;
    line = '';
  }
  if(!bs){
    return ['',''];
  }
  if(stdlib.shifts.indexOf(bs) < 0){
    throw "Unexpected Shift: " + bs;
  }
  if(bs === 'rrx'){
    return [line,bs];
  }
  line = parsers.rn(line);
  return [line[0],bs,line[1]];
};

parsers.generic = function(line,parser){
  var tmp,temp, out = [];
  for(var i = 0; i < parser.length; i++){
    temp = parser[i].startsWith('?');
    if(temp){
      tmp = parsers[parser[i].slice(1)](line);
    }else{
      tmp = parsers[parser[i]](line);
    }
    if(tmp[1]){
      if(tmp.length === 2){
        out.push(tmp[1]);
      }else{
        out.push(tmp.slice(1));
      }
    }else if(temp){
      out.push('');
    }else{
      console.log(line,tmp);
      throw "Could not fill argument "+ (i+1);
    }
    line = tmp[0];
  }
  return out;
};

/* generates an array [instruction, conditional, option] from str
 * str: imput string to first whitespace
 * instruction: add, sub, etc
 * conditional: eq, al, etc
 * option: s, ia, x, b, etc                                        */
function genInt(str){
  for(var int in stdlib.instructions){
    if(str.startsWith(int)){
      if(int.length === str.length){
        return [int];
      }
      for(var suffix in stdlib.suffixes){
        if(str.startsWith(int + suffix)){
          if(int.length + suffix.length === str.length){
            return [int,suffix];
          }
          if(stdlib.instructions[int].option){
            for(var add in stdlib.instructions[int].option){
              if(str.startsWith(int + suffix + add)){
                if(int.length + suffix.length + add.length === str.length){
                  return [int,suffix,add];
                }
              }
            }
          }
        }
      }
      if(stdlib.instructions[int].option){
        for(var add in stdlib.instructions[int].option){
          if(str.startsWith(int + add)){
            if(int.length + add.length === str.length){
              return [int,'',add];
            }
          }
        }
      }
    }
  }
  throw "Unsupporting Instruction: " + str;
}