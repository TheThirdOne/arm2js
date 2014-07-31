instructions = {};
instructions.mov = {option:{s:'S;F'},parser:['rn','op'],          template:"$0 =  $1"};//move
instructions.mvn = {option:{s:'S;F'},parser:['rn','op'],          template:"$0 = ~$1"};//move not
instructions.add = {option:{s:'S;F'},parser:['rn','rn','op'],     template:"$0 = $1 + $2"};
instructions.adc = {option:{s:'S;F'},parser:['rn','rn','op'],     template:"$0 = $1 + $2 + C"};   //add w/ carry
instructions.sub = {option:{s:'S;F'},parser:['rn','rn','op'],     template:"$0 = $1 - $2"};       //subtract
instructions.sbc = {option:{s:'S;F'},parser:['rn','rn','op'],     template:"$0 = $1 - $2 - (~C)"};//subtract w/ carry
instructions.rsb = {option:{s:'S;F'},parser:['rn','rn','op'],     template:"$0 = $2 - $1"};       //reverse subtract
instructions.rsc = {option:{s:'S;F'},parser:['rn','rn','op'],     template:"$0 = $2 - $1 - (~C)"};//reverse subtract w/ carry
instructions.mul = {option:{s:'S;F'},parser:['rn','rn','rn'],     template:"$0 = $1 * $2"};      //multiply
instructions.mla = {option:{s:'S;F'},parser:['rn','rn','rn','rn'],template:"$0 = $3 + $1 * $2"};
instructions.and = {option:{s:'S;F'},parser:['rn','rn','op'],     template:"$0 = $1 & $2"}; //and
instructions.eor = {option:{s:'S;F'},parser:['rn','rn','op'],     template:"$0 = $1 ^ $2"}; //xor
instructions.orr = {option:{s:'S;F'},parser:['rn','rn','op'],     template:"$0 = $1 | $2"}; //or
instructions.bic = {option:{s:'S;F'},parser:['rn','rn','op'],     template:"$0 = $1 &~$2"}; //bitwise clear


instructions.cmp = {parser:['rn','?op'],template:"$0 = $1 - $2; F"};
instructions.cmn = {parser:['rn','?op'],template:"$0 = $1 + $2; F"};
instructions.tst = {parser:['rn','?op'],template:"$0 = $1 & $2; F"};
instructions.teq = {parser:['rn','?op'],template:"$0 = $1 ^ $2; F"};


instructions.b  = "pc = label;break";
instructions.bl = "lr = pc; pc = label; break";


instructions.ldr = "$1 = ram[$2]";
instructions.str = "ram[$2] = $1";

//ldm
//stm


barrel = {};
barrel.lsl = "i = n << o";
barrel.lsr = "i = n >>> o";
barrel.asr = "i = (n >= 0)?(n >>> o):(i = n >>> o | ~(~0>>>o))";
barrel.ror = "i = n << -o";
barrel.rrx = "i = n << 1;C = n & 1";

suffixes = {};
suffixes.eq =  "Z";
suffixes.ne = "!Z";
suffixes.cs =  "C";
suffixes.hs =  "C";
suffixes.cc = "!C";
suffixes.lo = "!C";
suffixes.mi =  "N";
suffixes.pl = "!N";
suffixes.vs =  "V";
suffixes.vc = "!V";
suffixes.hi = "C && !Z";
suffixes.ls = "!C || Z";
suffixes.ge =  "N == Z";
suffixes.lt =  "N != Z";
suffixes.gt = "!Z && (N == V)";
suffixes.le =  "Z || (N != V)";
suffixes.al = "true";

exports.suffixes     = suffixes;
exports.instructions = instructions;
exports.registers = ['r0','r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','r14','r15',
                     'a1','a2','a3','a4','v1','v2','v3','v4','v5','v6','sb' ,'sl' , 'fp','sp' ,'lr' , 'pc'];
exports.shifts = ['lsl','lsr','asr','ror','rrx'];