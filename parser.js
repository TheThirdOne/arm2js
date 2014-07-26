function parseLine(line){
  var parts = line.split(/\s+/);
  var int   = genInt(parts.shift());
  line      = parts.join(' ');
  console.log(line,int);
}
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