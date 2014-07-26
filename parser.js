
//parses a single line of assembly
function parseLine(line){
  line = line.replace(/^\s+/,''); //eliminate leading whitespace
  
  
  var parts = line.split(/\s+/);
  var int   = parts.shift();
  if(int.startsWith('.')){
    return parseConfig(line);
  }
  int = genInt(int);
  
  line = parts.join(' ');
  line = line.replace(/;.*$/,'');  //eliminate comments
  
  var rd;
  for(var i = 0; i < line.length; i++){
    if(line[i] === ' ' || line[i] === ','){
      rd = line.slice(0,i);
      line = line.slice(i+1);
      break;
    }
  }
  if(registers.indexOf(rd) < 0){
    throw "Unknown"
  }
  
  console.log(line,int, rd);
}

function parseConfig(line){
  return line;
}

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