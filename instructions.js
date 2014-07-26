inst = {};
inst.mov = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 =  $2"};//move
inst.mvn = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = ~$2"};//move not
inst.add = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 + $3"};
inst.adc = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 + $3 + C"};   //add w/ carry
inst.sub = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 - $3"};       //subtract
inst.sbc = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 - $3 - (~C)"};//subtract w/ carry
inst.rsb = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $3 - $2"};       //reverse subtract
inst.rsc = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $3 - $2 - (~C)"};//reverse subtract w/ carry
inst.mul = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 * $3"};      //multiply
inst.mla = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $4 + $2 * $3"};
inst.and = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 & $3"}; //and
inst.eor = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 ^ $3"}; //xor
inst.orr = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 | $3"}; //or
inst.bic = {additional:{s:'F'},parser:['rn','rn','?op'],str:"$1 = $2 &~$3"}; //bitwise clear


inst.cmp = {str:"$0 = $2 - $3; F"};
inst.cmn = {str:"$0 = $2 + $3; F"};
inst.tst = {str:"$0 = $2 & $3; F"};
inst.teq = {str:"$0 = $2 ^ $3; F"};



inst.b  = "pc = label;break";
inst.bl = "lr = pc; pc = label; break";


inst.ldr = "$1 = ram[$2]";
inst.str = "ram[$2] = $1";

//ldm
//stm


barrel = {};
barrel.lsl = "i = n << o";
barrel.lsr = "i = n >>> o";
barrel.asr = "i = (n >= 0)?(n >>> o):(i = n >>> o | ~(~0>>>o))";
barrel.ror = "i = n << -o";
barrel.rrx = "i = n << 1;C = n & 1";

suffix = {};
suffix.eq =  "Z";
suffix.ne = "!Z";
suffix.cs =  "C";
suffix.hs =  "C";
suffix.cc = "!C";
suffix.lo = "!C";
suffix.mi =  "N";
suffix.pl = "!N";
suffix.vs =  "V";
suffix.vc = "!V";
suffix.hi = "C && !Z";
suffix.ls = "!C || Z";
suffix.ge =  "N == Z";
suffix.lt =  "N != Z";
suffix.gt = "!Z && (N == V)";
suffix.le =  "Z || (N != V)";
suffix.al = "true";

stdlib = {suffixes:suffix,instructions:inst};