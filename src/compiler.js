var stdlib = require('./instructions.js');

exports.compile = function(lines){
  var context = {};
  var out = 'var heap = new Int8Array(size),\n\
  registers = new Int32Array(16),\n\
  N = 0, C = 0, Z = 0, V = 0;\n\
  switch(registers[15]){\n';
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
    out += 'pc = ' + number + ';';
  }
  if(line.conditional){
    out += 'if('+stdlib.suffixes[line.conditional]+'){';
  }
  if(line.option){
    template = instruction.option[line.option].replace('S',instruction.template);
  }
  out += exports.generate(template,context) + ';';
  if(line.conditional){
    out += '}';
  }
  if(pc){
    out += 'break;';
  }
  return out;
};

exports.generate = function(template,context){
  return template;
};