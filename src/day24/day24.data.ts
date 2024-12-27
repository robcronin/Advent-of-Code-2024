import { parseInput } from '../utils/input';

const testString = `x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`;
const testString2 = `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`;
const input = `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
x05: 0
x06: 1
x07: 1
x08: 0
x09: 1
x10: 1
x11: 1
x12: 1
x13: 1
x14: 0
x15: 1
x16: 1
x17: 0
x18: 0
x19: 1
x20: 0
x21: 0
x22: 1
x23: 1
x24: 0
x25: 1
x26: 0
x27: 0
x28: 1
x29: 0
x30: 1
x31: 0
x32: 0
x33: 0
x34: 1
x35: 0
x36: 0
x37: 1
x38: 1
x39: 0
x40: 1
x41: 1
x42: 1
x43: 1
x44: 1
y00: 1
y01: 0
y02: 0
y03: 1
y04: 1
y05: 0
y06: 0
y07: 0
y08: 0
y09: 0
y10: 0
y11: 1
y12: 0
y13: 0
y14: 0
y15: 0
y16: 0
y17: 0
y18: 1
y19: 1
y20: 0
y21: 1
y22: 0
y23: 0
y24: 0
y25: 0
y26: 0
y27: 1
y28: 0
y29: 1
y30: 1
y31: 1
y32: 1
y33: 1
y34: 0
y35: 1
y36: 0
y37: 0
y38: 0
y39: 1
y40: 1
y41: 1
y42: 1
y43: 1
y44: 1

psk AND phj -> vhg
hbs OR bqw -> tfc
mwv AND qpg -> wss
wcd AND fkv -> knf
rww AND nwt -> pbm
csm OR csk -> fqm
x16 XOR y16 -> wqn
nqj AND krv -> jrw
y25 XOR x25 -> ghf
psk XOR phj -> z29
svw AND nvh -> ssb
y29 AND x29 -> ppp
mvg OR wgt -> wmt
gpk XOR tfc -> z10
y28 XOR x28 -> qjd
nhm OR swq -> djn
tpf AND kgp -> jkv
x06 AND y06 -> ggb
dcs OR dwb -> phj
y37 XOR x37 -> jqm
tht AND msw -> vvp
wjr OR sgq -> wcd
nwt XOR rww -> z42
y33 AND x33 -> hwf
nqj XOR krv -> z15
y14 AND x14 -> wfw
phk OR fbn -> nwt
ghf XOR vdm -> z25
y24 AND x24 -> tgp
y01 XOR x01 -> qgt
y09 XOR x09 -> hbs
mqt XOR tsw -> z07
vdn OR twg -> kgp
ntq OR cnr -> bch
jdm OR vvp -> dcm
bjr AND btp -> kmh
y40 XOR x40 -> bhr
x05 XOR y05 -> wqb
x23 XOR y23 -> tfm
prd AND dgr -> vdn
x10 AND y10 -> csm
kbg XOR bfj -> z17
x34 XOR y34 -> hnp
x36 XOR y36 -> cmh
y29 XOR x29 -> psk
x19 XOR y19 -> vmg
nvh XOR svw -> z39
x42 XOR y42 -> rww
qjd AND bqj -> dwb
rgr AND hnp -> wgt
wjw OR nnm -> brf
y05 AND x05 -> pdt
kjj AND jbg -> ght
kgp XOR tpf -> z44
x15 XOR y15 -> nqj
qjd XOR bqj -> z28
y23 AND x23 -> njp
x17 AND y17 -> pnt
x41 XOR y41 -> fmc
fvh OR nvg -> nqk
y44 AND x44 -> mqf
jbg XOR kjj -> z24
rts OR krd -> ddm
x40 AND y40 -> nqs
y11 AND x11 -> mqk
qgt XOR gwq -> z01
kfp XOR fcw -> z09
x38 AND y38 -> krr
x13 XOR y13 -> cks
jkv OR mqf -> z45
y04 XOR x04 -> fkv
krp AND wmt -> rmj
rmj OR vrs -> mtt
htr OR ggb -> mqt
y08 AND x08 -> scq
x31 XOR y31 -> ndt
djn XOR kft -> z38
nbp XOR vtp -> z12
y03 XOR x03 -> qsp
prd XOR dgr -> z43
pbm OR tkp -> prd
dhq OR qdb -> rfk
ndt XOR qtt -> z31
rht AND fmc -> phk
pdg AND tfm -> pgj
kbg AND bfj -> gvb
fqm AND frm -> btr
ckj AND bch -> z27
ndc XOR brf -> z08
y34 AND x34 -> mvg
y04 AND x04 -> wkf
y03 AND x03 -> sgq
qsp XOR vgc -> z03
x27 AND y27 -> knm
x09 AND y09 -> kfp
wqb AND wrc -> qft
y08 XOR x08 -> ndc
pmj XOR bhr -> z40
y19 AND x19 -> mgk
qwm OR bgm -> skv
wrc XOR wqb -> z05
x37 AND y37 -> nhm
y00 AND x00 -> gwq
qtt AND ndt -> nvg
y21 AND x21 -> jdm
knf OR wkf -> wrc
wvk AND mct -> mtb
bvf XOR wqn -> z16
pvk XOR fwt -> dhq
ckj XOR bch -> jcp
wfw OR kmh -> krv
y02 XOR x02 -> wvk
ddm XOR sgs -> z26
dcb OR hqk -> bjr
kfp AND fcw -> bqw
x12 AND y12 -> vsh
y16 AND x16 -> fnd
mgk OR bng -> smg
mtt XOR cmh -> z36
x33 XOR y33 -> wrr
rpv XOR smg -> z20
x28 AND y28 -> dcs
jdf OR jrw -> bvf
smg AND rpv -> vgn
nbp AND vtp -> vhh
y43 AND x43 -> twg
y32 XOR x32 -> pmm
x31 AND y31 -> fvh
y38 XOR x38 -> kft
wmt XOR krp -> z35
y30 AND x30 -> fhm
x15 AND y15 -> jdf
pvw OR cgt -> mct
x21 XOR y21 -> msw
vmg XOR rfk -> z19
tfc AND gpk -> csk
x18 AND y18 -> z18
y10 XOR x10 -> gpk
x35 XOR y35 -> krp
psm AND qht -> htr
x41 AND y41 -> fbn
msw XOR tht -> z21
qsp AND vgc -> wjr
kft AND djn -> rwg
bhr AND pmj -> nhb
x22 XOR y22 -> dbp
cmh AND mtt -> qwm
x35 AND y35 -> vrs
qht XOR psm -> z06
x02 AND y02 -> pcq
fnd OR hrm -> kbg
mct XOR wvk -> z02
brf AND ndc -> qsb
vsh OR vhh -> vsm
jqm XOR skv -> z37
pmm AND nqk -> pfk
fqm XOR frm -> z11
x22 AND y22 -> bqp
pfk OR tmp -> brs
x30 XOR y30 -> mwv
btp XOR bjr -> z14
x39 XOR y39 -> svw
mqk OR btr -> nbp
rgr XOR hnp -> z34
gvb OR pnt -> pvk
vmg AND rfk -> bng
tsw AND mqt -> nnm
fhm OR wss -> qtt
bqp OR gkg -> z22
scq OR qsb -> fcw
x39 AND y39 -> pcp
cks XOR vsm -> z13
y26 AND x26 -> cnr
dcm XOR dbp -> pdg
y18 XOR x18 -> fwt
x11 XOR y11 -> frm
y20 XOR x20 -> rpv
jcp OR knm -> bqj
nqs OR nhb -> rht
y24 XOR x24 -> jbg
ppp OR vhg -> qpg
pcp OR ssb -> pmj
ksq OR vgn -> tht
dpj OR hwf -> rgr
dcm AND dbp -> gkg
brs AND wrr -> dpj
qgt AND gwq -> cgt
y36 AND x36 -> bgm
x43 XOR y43 -> dgr
y06 XOR x06 -> qht
x07 XOR y07 -> tsw
x12 XOR y12 -> vtp
y01 AND x01 -> pvw
rwg OR krr -> nvh
fmc XOR rht -> z41
wrr XOR brs -> z33
x44 XOR y44 -> tpf
pdt OR qft -> psm
y26 XOR x26 -> sgs
x42 AND y42 -> tkp
x07 AND y07 -> wjw
bvf AND wqn -> hrm
vdm AND ghf -> rts
nqk XOR pmm -> z32
x00 XOR y00 -> z00
fkv XOR wcd -> z04
pdg XOR tfm -> z23
y25 AND x25 -> krd
y13 AND x13 -> hqk
pcq OR mtb -> vgc
njp OR pgj -> kjj
y20 AND x20 -> ksq
y32 AND x32 -> tmp
cks AND vsm -> dcb
ght OR tgp -> vdm
x14 XOR y14 -> btp
jqm AND skv -> swq
y27 XOR x27 -> ckj
pvk AND fwt -> qdb
mwv XOR qpg -> z30
ddm AND sgs -> ntq
x17 XOR y17 -> bfj`;

export const testData = parseInput(testString) as string[];
export const testData2 = parseInput(testString2) as string[];
export const data = parseInput(input) as string[];
