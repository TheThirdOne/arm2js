mov = "$1 =  $2";
mvn = "$1 = ~$2";


add = "$1 = $2 + $3"
adc = "$1 = $2 + $3 + C"

sub = "$1 = $2 - $3"
sbc = "$1 = $2 - $3 - (~C)"

rsb = "$1 = $3 - $2"
rsc = "$1 = $3 - $2 - (~C)"

mul = "$1 = $2 * $3"
mla = "$1 = $4 + $2 * $3"

and = "$1 = $2 & $3"
eor = "$1 = $2 ^ $3"
orr = "$1 = $2 | $3"
bic = "$1 = $2 &~$3"


cmp = "$0 = $2 - $3; F"
cmn = "$0 = $2 + $3; F"
tst = "$0 = $2 & $3; F"
teq = "$0 = $2 ^ $3; F"

barrel.lsl = "i = n << o"
barrel.lsr = "i = n >>> o"
barrel.asr = "i = (n >= 0)?(n >>> o):(i = n >>> o | ~(~0>>>o))"
barrel.ror = "i = n << -o"
barrel.rrx = "i = n << 1;C = n & 1"

b  = "pc = label;break"
bl = "lr = pc; pc = label; break"



suffix.eq =  "Z"
suffix.ne = "!Z"
suffix.cs =  "C"
suffix.hs =  "C"
suffix.cc = "!C"
suffix.lo = "!C"
suffix.mi =  "N"
suffix.pl = "!N"
suffix.vs =  "V"
suffix.vc = "!V"
suffix.hi = "C && !Z"
suffix.ls = "!C || Z"
suffix.ge =  "N == Z"
suffix.lt =  "N != Z"
suffix.gt = "!Z && (N == V)"
suffix.le =  "Z || (N != V)"
suffix.al = "true"