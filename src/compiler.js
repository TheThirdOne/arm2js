var stdlib = require('./instructions.js');

exports.compile = function(lines){
  var context = {};
  var out = 'var heap = new Int8Array(size);\n\
  registers = new Int32Array(16);\n\
  switch(registers[15]){\n';
  return out;
};
exports.codegen = function(line,context){
  return '';
}