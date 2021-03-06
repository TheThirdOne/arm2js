var stdlib = require('./instructions.js');

exports.compile = function(lines){
  var context = {};
  var out = 'var heap = new ArrayBuffer(size),\n\
  ui8 = new Uint8Array(heap),\n\
  ui16= new Uint16Array(heap),\n\
  ui32= new Uint32Array(heap),\n\
  i8 = new Int8Array(heap),\n\
  i16= new Int16Array(heap),\n\
  i32= new Int32Array(heap),\n\
  registers = new ArrayBuffer(16),\n\
  ureg = new Uint32Array(registers),\n\
  reg = new Int32Array(registers),\n\
  N = 0, C = 0, Z = 0, V = 0;\n\
  out: \n\
  while(true){\n\
  switch(ureg[15]){\n';
  for(var i = 0; i < lines.length;i++){
    out+='case '+i+':'+exports.codegen(lines[i],i,context)+';\n';
  }
  out += 'default:break out;}}';
  return out;
};
exports.codegen = function(line,number,context){
  
  var instruction = stdlib.instructions[line.instruction],
  pc = line.args.join('').contains('pc') || line.args.join('').contains('r15') || line.instruction.startsWith('cm'),
  template = instruction.template,
  out='';
  if(line.args.length + 1 < instruction.parser.length){
    throw 'Insufficient args for instruction: ' + line.str;
  }
  if(pc){
    out += 'pc = ' + number + '+1;';
  }
  if(line.conditional){
    out += 'if('+stdlib.suffixes[line.conditional]+'){';
  }
  if(line.option){
    template = instruction.option[line.option].replace('S',instruction.template);
  }
  out += exports.generate(template,line.args,context) + ';';
  if(line.conditional){
    out += '}';
  }
  if(pc){
    out += 'break;';
  }
  return out;
};

exports.generate = function(template,args,context){
  var out;
  for(var i = 0;i < args.length;i++){
    if(args[i] instanceof Array){
      args[i] = args[i][0]; //temp until I implement barrel codegen
    }
    if(args[i].startsWith('#')){
      out = args[i].slice(1);
    }
    if(stdlib.registers.indexOf(args[i]) >= 0){
      out = "ureg["+(stdlib.registers.indexOf(args[i])%16)+']';
    }
    template = template.replace('$'+i,out);
  }
  //template = template.replace('$'+(args.length+1),'0');
  return template;
};