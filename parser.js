
//parses a single line of assembly
function parseLine(line){
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
  
  var rd = parsers.rn(line);
  line = rd[0];
  rd = rd[1];
  
  console.log(line,int, rd);
}

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
  if(rn && (registers.indexOf(rn) >= 0 ||
     rn.startsWith('#'))){
    return [line,rn];
  }
  return [tmp];
};
parsers.op = function(line){
  var op, tmp = line;
  line = parsers.rn(line);
  op = line[1];
  line = line[0];
  //Barrel shift
  
  return ['',op,line];
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

/* generates an array [instruction, conditional, additional] from str
 * str: imput string to first whitespace
 * instruction: add, sub, etc
 * conditional: eq, al, etc
 * additional: s, ia, x, b, etc                                        */
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
          if(stdlib.instructions[int].additional){
            for(var add in stdlib.instructions[int].additional){
              if(str.startsWith(int + suffix + add)){
                if(int.length + suffix.length + add.length === str.length){
                  return [int,suffix,add];
                }
              }
            }
          }
        }
      }
      if(stdlib.instructions[int].additional){
        for(var add in stdlib.instructions[int].additional){
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

registers = ['r0','r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','r14','r15',
             'a1','a2','a3','a4','v1','v2','v3','v4','v5','v6','sb' ,'sl' , 'fp','sp' ,'lr' , 'pc']

pattern = '<operation><cond><flags> Rd,Rn,Operand2'

operand2 = "value" | "<shift>" +  "value" | "register"