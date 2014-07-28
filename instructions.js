instuctions = {};
instructions.mov = {additional:{s:'F'},parser:['rn','?op'],str:"$1 =  $2"};//move
instructions.mvn = {additional:{s:'F'},parser:['rn','?op'],str:"$1 = ~$2"};//move not
instructions.add = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 + $3"};
instructions.adc = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 +  $3 + C"};   //add w/ carry
instructions.sub = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 -  $3"};       //subtract
instructions.sbc = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 -  $3 - (~C)"};//subtract w/ carry
instructions.rsb = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $3 -  $2"};       //reverse subtract
instructions.rsc = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $3 -  $2 - (~C)"};//reverse subtract w/ carry
instructions.mul = {additional:{s:'F'},parser:['rn','rn','rn'],str:"$1 = $2 *  $3"};      //multiply
instructions.mla = {additional:{s:'F'},parser:['rn','rn','rn','rn'],str:"$1 = $4 +  $2 * $3"};
instructions.and = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 &  $3"}; //and
instructions.eor = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 ^  $3"}; //xor
instructions.orr = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 |  $3"}; //or
instructions.bic = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 &~ $3"}; //bitwise clear


instructions.cmp = {parser:['rn','?op'],str:"$0 = $2 - $3; F"};
instructions.cmn = {parser:['rn','?op'],str:"$0 = $2 + $3; F"};
instructions.tst = {parser:['rn','?op'],str:"$0 = $2 & $3; F"};
instructions.teq = {parser:['rn','?op'],str:"$0 = $2 ^ $3; F"};



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