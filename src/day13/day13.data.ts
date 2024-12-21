import { parseInput } from '../utils/input';

const testString = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;
const input = `Button A: X+22, Y+88
Button B: X+90, Y+28
Prize: X=6496, Y=3076

Button A: X+54, Y+14
Button B: X+14, Y+44
Prize: X=8084, Y=1284

Button A: X+96, Y+15
Button B: X+55, Y+63
Prize: X=5535, Y=3966

Button A: X+17, Y+42
Button B: X+40, Y+25
Prize: X=12176, Y=3136

Button A: X+87, Y+31
Button B: X+15, Y+36
Prize: X=6672, Y=2500

Button A: X+59, Y+27
Button B: X+21, Y+56
Prize: X=1475, Y=15098

Button A: X+39, Y+51
Button B: X+98, Y+14
Prize: X=7890, Y=3126

Button A: X+23, Y+37
Button B: X+35, Y+14
Prize: X=16537, Y=6184

Button A: X+21, Y+89
Button B: X+74, Y+23
Prize: X=2407, Y=8748

Button A: X+47, Y+17
Button B: X+35, Y+59
Prize: X=17994, Y=16242

Button A: X+14, Y+45
Button B: X+52, Y+16
Prize: X=18768, Y=3912

Button A: X+29, Y+45
Button B: X+85, Y+11
Prize: X=3149, Y=4161

Button A: X+81, Y+95
Button B: X+67, Y+12
Prize: X=5489, Y=2110

Button A: X+48, Y+58
Button B: X+86, Y+22
Prize: X=4802, Y=2280

Button A: X+27, Y+59
Button B: X+47, Y+15
Prize: X=2602, Y=2090

Button A: X+39, Y+87
Button B: X+94, Y+38
Prize: X=8830, Y=6134

Button A: X+23, Y+61
Button B: X+82, Y+16
Prize: X=8405, Y=3957

Button A: X+54, Y+14
Button B: X+24, Y+63
Prize: X=894, Y=1708

Button A: X+26, Y+14
Button B: X+18, Y+35
Prize: X=5510, Y=12541

Button A: X+65, Y+55
Button B: X+21, Y+69
Prize: X=430, Y=620

Button A: X+11, Y+62
Button B: X+50, Y+11
Prize: X=11414, Y=3683

Button A: X+21, Y+54
Button B: X+93, Y+22
Prize: X=7683, Y=5642

Button A: X+20, Y+95
Button B: X+52, Y+29
Prize: X=5580, Y=10155

Button A: X+37, Y+13
Button B: X+11, Y+66
Prize: X=18250, Y=14983

Button A: X+54, Y+28
Button B: X+37, Y+58
Prize: X=17939, Y=14902

Button A: X+87, Y+65
Button B: X+11, Y+79
Prize: X=3765, Y=4087

Button A: X+74, Y+30
Button B: X+16, Y+59
Prize: X=9858, Y=8342

Button A: X+74, Y+31
Button B: X+17, Y+59
Prize: X=14764, Y=6598

Button A: X+12, Y+95
Button B: X+27, Y+33
Prize: X=945, Y=3324

Button A: X+21, Y+36
Button B: X+34, Y+14
Prize: X=7247, Y=5012

Button A: X+48, Y+62
Button B: X+90, Y+29
Prize: X=9150, Y=5973

Button A: X+93, Y+43
Button B: X+49, Y+91
Prize: X=7090, Y=6422

Button A: X+28, Y+70
Button B: X+68, Y+21
Prize: X=17176, Y=3693

Button A: X+33, Y+16
Button B: X+27, Y+51
Prize: X=1884, Y=2771

Button A: X+11, Y+43
Button B: X+51, Y+19
Prize: X=4114, Y=10066

Button A: X+26, Y+70
Button B: X+87, Y+46
Prize: X=3532, Y=6874

Button A: X+22, Y+35
Button B: X+38, Y+13
Prize: X=7508, Y=16592

Button A: X+33, Y+16
Button B: X+48, Y+72
Prize: X=12065, Y=15896

Button A: X+67, Y+25
Button B: X+14, Y+55
Prize: X=4093, Y=10275

Button A: X+36, Y+17
Button B: X+43, Y+77
Prize: X=3253, Y=1933

Button A: X+84, Y+24
Button B: X+42, Y+69
Prize: X=8862, Y=4869

Button A: X+70, Y+16
Button B: X+17, Y+68
Prize: X=5690, Y=3224

Button A: X+58, Y+27
Button B: X+44, Y+92
Prize: X=1890, Y=1595

Button A: X+64, Y+30
Button B: X+29, Y+57
Prize: X=15004, Y=15224

Button A: X+13, Y+90
Button B: X+64, Y+33
Prize: X=6560, Y=6048

Button A: X+37, Y+91
Button B: X+64, Y+49
Prize: X=5214, Y=8379

Button A: X+12, Y+80
Button B: X+75, Y+25
Prize: X=6684, Y=8460

Button A: X+27, Y+53
Button B: X+53, Y+30
Prize: X=4897, Y=14148

Button A: X+41, Y+11
Button B: X+39, Y+72
Prize: X=2818, Y=493

Button A: X+74, Y+45
Button B: X+14, Y+35
Prize: X=8996, Y=13510

Button A: X+11, Y+36
Button B: X+86, Y+58
Prize: X=18273, Y=14722

Button A: X+99, Y+72
Button B: X+11, Y+39
Prize: X=2530, Y=3390

Button A: X+55, Y+17
Button B: X+22, Y+80
Prize: X=3652, Y=6326

Button A: X+11, Y+17
Button B: X+76, Y+16
Prize: X=5480, Y=1976

Button A: X+18, Y+73
Button B: X+28, Y+22
Prize: X=3222, Y=4827

Button A: X+14, Y+46
Button B: X+33, Y+29
Prize: X=2212, Y=3932

Button A: X+11, Y+14
Button B: X+80, Y+28
Prize: X=4187, Y=2450

Button A: X+28, Y+70
Button B: X+78, Y+25
Prize: X=2220, Y=1810

Button A: X+53, Y+19
Button B: X+73, Y+91
Prize: X=4514, Y=2850

Button A: X+21, Y+54
Button B: X+54, Y+25
Prize: X=5609, Y=7594

Button A: X+79, Y+15
Button B: X+16, Y+80
Prize: X=14993, Y=17105

Button A: X+20, Y+59
Button B: X+35, Y+17
Prize: X=10820, Y=1709

Button A: X+96, Y+22
Button B: X+24, Y+43
Prize: X=10752, Y=4564

Button A: X+94, Y+40
Button B: X+36, Y+58
Prize: X=9852, Y=7180

Button A: X+65, Y+51
Button B: X+20, Y+84
Prize: X=2150, Y=5922

Button A: X+65, Y+11
Button B: X+20, Y+53
Prize: X=1305, Y=14157

Button A: X+51, Y+22
Button B: X+13, Y+21
Prize: X=1376, Y=14087

Button A: X+86, Y+46
Button B: X+11, Y+62
Prize: X=2748, Y=5398

Button A: X+53, Y+28
Button B: X+60, Y+99
Prize: X=10106, Y=11800

Button A: X+74, Y+12
Button B: X+11, Y+44
Prize: X=4973, Y=5380

Button A: X+12, Y+39
Button B: X+67, Y+42
Prize: X=11888, Y=974

Button A: X+25, Y+60
Button B: X+65, Y+27
Prize: X=6515, Y=2342

Button A: X+74, Y+26
Button B: X+14, Y+48
Prize: X=19210, Y=13430

Button A: X+50, Y+69
Button B: X+99, Y+33
Prize: X=7240, Y=3774

Button A: X+45, Y+67
Button B: X+37, Y+11
Prize: X=3686, Y=14138

Button A: X+29, Y+95
Button B: X+49, Y+43
Prize: X=4565, Y=9431

Button A: X+18, Y+57
Button B: X+55, Y+38
Prize: X=5614, Y=5795

Button A: X+77, Y+50
Button B: X+20, Y+44
Prize: X=11983, Y=12490

Button A: X+41, Y+13
Button B: X+25, Y+56
Prize: X=12563, Y=10124

Button A: X+59, Y+31
Button B: X+20, Y+78
Prize: X=2604, Y=6970

Button A: X+43, Y+23
Button B: X+11, Y+43
Prize: X=6693, Y=13081

Button A: X+47, Y+65
Button B: X+34, Y+11
Prize: X=13417, Y=11394

Button A: X+20, Y+56
Button B: X+74, Y+33
Prize: X=6594, Y=17345

Button A: X+25, Y+41
Button B: X+94, Y+40
Prize: X=9707, Y=7015

Button A: X+91, Y+12
Button B: X+13, Y+81
Prize: X=1339, Y=5568

Button A: X+84, Y+55
Button B: X+19, Y+38
Prize: X=6899, Y=6792

Button A: X+19, Y+70
Button B: X+72, Y+18
Prize: X=19699, Y=316

Button A: X+97, Y+61
Button B: X+30, Y+83
Prize: X=4673, Y=6915

Button A: X+50, Y+26
Button B: X+30, Y+61
Prize: X=3520, Y=17598

Button A: X+58, Y+28
Button B: X+28, Y+65
Prize: X=8596, Y=2242

Button A: X+61, Y+28
Button B: X+14, Y+51
Prize: X=12165, Y=1966

Button A: X+23, Y+53
Button B: X+21, Y+12
Prize: X=13591, Y=3046

Button A: X+14, Y+91
Button B: X+58, Y+45
Prize: X=2084, Y=9230

Button A: X+65, Y+49
Button B: X+13, Y+52
Prize: X=2171, Y=4675

Button A: X+76, Y+50
Button B: X+15, Y+36
Prize: X=4899, Y=1150

Button A: X+64, Y+14
Button B: X+45, Y+68
Prize: X=1064, Y=698

Button A: X+12, Y+74
Button B: X+72, Y+13
Prize: X=6536, Y=19707

Button A: X+23, Y+44
Button B: X+84, Y+47
Prize: X=1567, Y=1406

Button A: X+11, Y+40
Button B: X+36, Y+12
Prize: X=12837, Y=12232

Button A: X+41, Y+17
Button B: X+62, Y+96
Prize: X=7014, Y=9094

Button A: X+17, Y+75
Button B: X+91, Y+82
Prize: X=9013, Y=9733

Button A: X+85, Y+37
Button B: X+61, Y+92
Prize: X=9180, Y=9559

Button A: X+29, Y+61
Button B: X+69, Y+36
Prize: X=1713, Y=3022

Button A: X+57, Y+13
Button B: X+13, Y+40
Prize: X=10428, Y=9895

Button A: X+25, Y+71
Button B: X+89, Y+65
Prize: X=2297, Y=2205

Button A: X+50, Y+17
Button B: X+12, Y+52
Prize: X=7660, Y=5300

Button A: X+17, Y+26
Button B: X+41, Y+14
Prize: X=1477, Y=7174

Button A: X+79, Y+13
Button B: X+11, Y+50
Prize: X=15314, Y=8114

Button A: X+12, Y+55
Button B: X+61, Y+17
Prize: X=6120, Y=10227

Button A: X+31, Y+12
Button B: X+38, Y+74
Prize: X=8857, Y=12994

Button A: X+25, Y+42
Button B: X+44, Y+11
Prize: X=16916, Y=17306

Button A: X+30, Y+17
Button B: X+12, Y+81
Prize: X=1740, Y=4696

Button A: X+73, Y+31
Button B: X+14, Y+40
Prize: X=15110, Y=12082

Button A: X+45, Y+80
Button B: X+98, Y+29
Prize: X=6338, Y=2409

Button A: X+52, Y+25
Button B: X+18, Y+43
Prize: X=4750, Y=872

Button A: X+69, Y+33
Button B: X+32, Y+81
Prize: X=5469, Y=5769

Button A: X+40, Y+50
Button B: X+91, Y+19
Prize: X=3027, Y=2173

Button A: X+43, Y+20
Button B: X+12, Y+38
Prize: X=8981, Y=19516

Button A: X+35, Y+89
Button B: X+95, Y+21
Prize: X=11600, Y=10528

Button A: X+65, Y+24
Button B: X+11, Y+42
Prize: X=4404, Y=8318

Button A: X+60, Y+19
Button B: X+18, Y+42
Prize: X=16838, Y=14189

Button A: X+12, Y+48
Button B: X+80, Y+29
Prize: X=12196, Y=13036

Button A: X+21, Y+46
Button B: X+77, Y+38
Prize: X=4501, Y=4110

Button A: X+24, Y+64
Button B: X+52, Y+14
Prize: X=13652, Y=5138

Button A: X+85, Y+33
Button B: X+40, Y+86
Prize: X=5495, Y=4177

Button A: X+38, Y+12
Button B: X+16, Y+45
Prize: X=13164, Y=4079

Button A: X+26, Y+54
Button B: X+51, Y+16
Prize: X=17408, Y=16904

Button A: X+49, Y+17
Button B: X+36, Y+61
Prize: X=19162, Y=7451

Button A: X+28, Y+74
Button B: X+53, Y+13
Prize: X=14848, Y=7650

Button A: X+16, Y+90
Button B: X+55, Y+48
Prize: X=5344, Y=9150

Button A: X+58, Y+89
Button B: X+89, Y+17
Prize: X=9301, Y=4348

Button A: X+67, Y+28
Button B: X+22, Y+59
Prize: X=3358, Y=1182

Button A: X+24, Y+12
Button B: X+19, Y+58
Prize: X=7726, Y=10888

Button A: X+35, Y+14
Button B: X+24, Y+95
Prize: X=2793, Y=1715

Button A: X+28, Y+51
Button B: X+61, Y+30
Prize: X=19172, Y=7472

Button A: X+15, Y+56
Button B: X+46, Y+16
Prize: X=1023, Y=1816

Button A: X+17, Y+65
Button B: X+48, Y+38
Prize: X=3668, Y=5584

Button A: X+21, Y+54
Button B: X+61, Y+11
Prize: X=11991, Y=18859

Button A: X+14, Y+55
Button B: X+75, Y+35
Prize: X=19132, Y=2310

Button A: X+41, Y+17
Button B: X+18, Y+39
Prize: X=6083, Y=1862

Button A: X+51, Y+35
Button B: X+36, Y+83
Prize: X=2145, Y=3046

Button A: X+14, Y+38
Button B: X+72, Y+26
Prize: X=2888, Y=2756

Button A: X+58, Y+29
Button B: X+13, Y+51
Prize: X=6863, Y=10160

Button A: X+13, Y+96
Button B: X+29, Y+15
Prize: X=2882, Y=10329

Button A: X+70, Y+19
Button B: X+52, Y+73
Prize: X=6448, Y=2869

Button A: X+11, Y+18
Button B: X+83, Y+21
Prize: X=9251, Y=3771

Button A: X+15, Y+23
Button B: X+79, Y+21
Prize: X=8031, Y=2401

Button A: X+98, Y+30
Button B: X+54, Y+63
Prize: X=11208, Y=6498

Button A: X+55, Y+99
Button B: X+95, Y+28
Prize: X=4860, Y=6317

Button A: X+70, Y+46
Button B: X+46, Y+95
Prize: X=7920, Y=8767

Button A: X+14, Y+64
Button B: X+98, Y+57
Prize: X=8302, Y=7063

Button A: X+21, Y+35
Button B: X+47, Y+24
Prize: X=16138, Y=5819

Button A: X+40, Y+19
Button B: X+12, Y+56
Prize: X=2136, Y=16745

Button A: X+66, Y+88
Button B: X+93, Y+28
Prize: X=7542, Y=5064

Button A: X+67, Y+17
Button B: X+26, Y+79
Prize: X=2853, Y=11008

Button A: X+14, Y+64
Button B: X+49, Y+17
Prize: X=5779, Y=1875

Button A: X+53, Y+11
Button B: X+78, Y+85
Prize: X=5329, Y=2207

Button A: X+26, Y+45
Button B: X+49, Y+27
Prize: X=3094, Y=18575

Button A: X+92, Y+29
Button B: X+50, Y+80
Prize: X=7664, Y=7298

Button A: X+86, Y+34
Button B: X+56, Y+96
Prize: X=6904, Y=4576

Button A: X+90, Y+20
Button B: X+42, Y+83
Prize: X=4584, Y=2271

Button A: X+44, Y+15
Button B: X+11, Y+86
Prize: X=2893, Y=3865

Button A: X+13, Y+74
Button B: X+73, Y+83
Prize: X=4836, Y=5913

Button A: X+18, Y+25
Button B: X+34, Y+11
Prize: X=6516, Y=3080

Button A: X+43, Y+79
Button B: X+48, Y+16
Prize: X=2705, Y=19645

Button A: X+14, Y+34
Button B: X+38, Y+11
Prize: X=16458, Y=694

Button A: X+11, Y+65
Button B: X+73, Y+12
Prize: X=5171, Y=6084

Button A: X+35, Y+96
Button B: X+34, Y+22
Prize: X=2159, Y=5138

Button A: X+60, Y+97
Button B: X+79, Y+11
Prize: X=2060, Y=996

Button A: X+84, Y+40
Button B: X+11, Y+48
Prize: X=4701, Y=9240

Button A: X+28, Y+52
Button B: X+76, Y+12
Prize: X=1652, Y=2164

Button A: X+80, Y+39
Button B: X+31, Y+69
Prize: X=2639, Y=3927

Button A: X+28, Y+67
Button B: X+69, Y+26
Prize: X=17895, Y=8565

Button A: X+23, Y+64
Button B: X+51, Y+12
Prize: X=3692, Y=2192

Button A: X+58, Y+68
Button B: X+98, Y+21
Prize: X=6592, Y=6414

Button A: X+56, Y+16
Button B: X+20, Y+50
Prize: X=11020, Y=12110

Button A: X+61, Y+30
Button B: X+31, Y+72
Prize: X=2194, Y=4314

Button A: X+71, Y+91
Button B: X+85, Y+16
Prize: X=2212, Y=1348

Button A: X+32, Y+89
Button B: X+97, Y+17
Prize: X=10977, Y=6010

Button A: X+24, Y+59
Button B: X+77, Y+26
Prize: X=779, Y=772

Button A: X+97, Y+14
Button B: X+92, Y+98
Prize: X=12922, Y=6440

Button A: X+32, Y+61
Button B: X+27, Y+12
Prize: X=18566, Y=14066

Button A: X+12, Y+22
Button B: X+31, Y+16
Prize: X=18413, Y=7708

Button A: X+17, Y+83
Button B: X+80, Y+15
Prize: X=9991, Y=3749

Button A: X+17, Y+47
Button B: X+55, Y+29
Prize: X=4378, Y=4302

Button A: X+46, Y+83
Button B: X+89, Y+44
Prize: X=2105, Y=1583

Button A: X+14, Y+57
Button B: X+48, Y+46
Prize: X=3430, Y=3505

Button A: X+59, Y+74
Button B: X+11, Y+85
Prize: X=4377, Y=9762

Button A: X+83, Y+13
Button B: X+26, Y+30
Prize: X=4799, Y=3137

Button A: X+15, Y+44
Button B: X+57, Y+30
Prize: X=9431, Y=7420

Button A: X+79, Y+13
Button B: X+18, Y+84
Prize: X=1520, Y=16040

Button A: X+61, Y+23
Button B: X+19, Y+65
Prize: X=2384, Y=10448

Button A: X+49, Y+80
Button B: X+40, Y+11
Prize: X=2610, Y=7372

Button A: X+52, Y+13
Button B: X+19, Y+53
Prize: X=7647, Y=6217

Button A: X+65, Y+11
Button B: X+13, Y+48
Prize: X=7959, Y=15911

Button A: X+29, Y+54
Button B: X+58, Y+26
Prize: X=8062, Y=7468

Button A: X+29, Y+47
Button B: X+48, Y+25
Prize: X=8429, Y=3387

Button A: X+43, Y+18
Button B: X+13, Y+42
Prize: X=9727, Y=13562

Button A: X+93, Y+30
Button B: X+42, Y+93
Prize: X=5049, Y=6078

Button A: X+50, Y+81
Button B: X+43, Y+21
Prize: X=3726, Y=4479

Button A: X+81, Y+14
Button B: X+86, Y+84
Prize: X=1240, Y=560

Button A: X+85, Y+42
Button B: X+40, Y+72
Prize: X=6055, Y=3462

Button A: X+77, Y+49
Button B: X+17, Y+43
Prize: X=258, Y=17752

Button A: X+80, Y+13
Button B: X+18, Y+81
Prize: X=17860, Y=17952

Button A: X+14, Y+52
Button B: X+55, Y+26
Prize: X=9020, Y=12392

Button A: X+29, Y+77
Button B: X+55, Y+15
Prize: X=3921, Y=673

Button A: X+14, Y+32
Button B: X+73, Y+36
Prize: X=4950, Y=4248

Button A: X+31, Y+17
Button B: X+17, Y+42
Prize: X=16984, Y=1954

Button A: X+26, Y+73
Button B: X+55, Y+30
Prize: X=3857, Y=3986

Button A: X+52, Y+16
Button B: X+28, Y+65
Prize: X=9720, Y=15359

Button A: X+23, Y+99
Button B: X+66, Y+59
Prize: X=6012, Y=5845

Button A: X+34, Y+74
Button B: X+59, Y+11
Prize: X=9275, Y=6403

Button A: X+11, Y+67
Button B: X+55, Y+20
Prize: X=5841, Y=5652

Button A: X+62, Y+50
Button B: X+30, Y+98
Prize: X=4934, Y=10474

Button A: X+98, Y+19
Button B: X+17, Y+80
Prize: X=9189, Y=4773

Button A: X+44, Y+83
Button B: X+75, Y+12
Prize: X=8795, Y=5585

Button A: X+86, Y+26
Button B: X+21, Y+83
Prize: X=6345, Y=8127

Button A: X+51, Y+25
Button B: X+23, Y+44
Prize: X=776, Y=904

Button A: X+58, Y+32
Button B: X+19, Y+44
Prize: X=11826, Y=13192

Button A: X+26, Y+45
Button B: X+57, Y+11
Prize: X=2619, Y=3744

Button A: X+46, Y+82
Button B: X+72, Y+17
Prize: X=8880, Y=8926

Button A: X+28, Y+52
Button B: X+27, Y+13
Prize: X=18645, Y=13315

Button A: X+46, Y+78
Button B: X+50, Y+20
Prize: X=4728, Y=18484

Button A: X+48, Y+13
Button B: X+37, Y+56
Prize: X=3855, Y=3389

Button A: X+16, Y+71
Button B: X+98, Y+57
Prize: X=8548, Y=6946

Button A: X+42, Y+81
Button B: X+42, Y+11
Prize: X=19562, Y=12351

Button A: X+75, Y+14
Button B: X+20, Y+69
Prize: X=5075, Y=6976

Button A: X+46, Y+19
Button B: X+15, Y+33
Prize: X=6961, Y=12343

Button A: X+50, Y+39
Button B: X+21, Y+83
Prize: X=4227, Y=5762

Button A: X+38, Y+36
Button B: X+15, Y+75
Prize: X=3085, Y=5415

Button A: X+33, Y+40
Button B: X+92, Y+31
Prize: X=10370, Y=6209

Button A: X+12, Y+79
Button B: X+98, Y+40
Prize: X=7192, Y=6196

Button A: X+32, Y+66
Button B: X+59, Y+17
Prize: X=6974, Y=5112

Button A: X+19, Y+68
Button B: X+61, Y+22
Prize: X=8482, Y=12924

Button A: X+23, Y+83
Button B: X+65, Y+13
Prize: X=12764, Y=3452

Button A: X+15, Y+86
Button B: X+67, Y+71
Prize: X=1149, Y=2830

Button A: X+31, Y+59
Button B: X+41, Y+23
Prize: X=18669, Y=18295

Button A: X+25, Y+76
Button B: X+59, Y+16
Prize: X=11850, Y=8876

Button A: X+59, Y+26
Button B: X+21, Y+90
Prize: X=5841, Y=7338

Button A: X+23, Y+74
Button B: X+74, Y+24
Prize: X=15709, Y=15466

Button A: X+22, Y+62
Button B: X+90, Y+64
Prize: X=6680, Y=7068

Button A: X+33, Y+77
Button B: X+90, Y+27
Prize: X=6234, Y=7775

Button A: X+46, Y+22
Button B: X+31, Y+60
Prize: X=15357, Y=5022

Button A: X+27, Y+39
Button B: X+50, Y+12
Prize: X=2143, Y=807

Button A: X+28, Y+17
Button B: X+27, Y+93
Prize: X=1707, Y=5403

Button A: X+48, Y+26
Button B: X+19, Y+46
Prize: X=796, Y=2444

Button A: X+78, Y+18
Button B: X+13, Y+61
Prize: X=4865, Y=12725

Button A: X+61, Y+86
Button B: X+92, Y+23
Prize: X=7408, Y=4682

Button A: X+19, Y+59
Button B: X+69, Y+20
Prize: X=11322, Y=9785

Button A: X+42, Y+30
Button B: X+16, Y+39
Prize: X=13434, Y=19544

Button A: X+89, Y+20
Button B: X+24, Y+39
Prize: X=1902, Y=2343

Button A: X+38, Y+88
Button B: X+80, Y+58
Prize: X=8576, Y=8152

Button A: X+22, Y+50
Button B: X+88, Y+17
Prize: X=1848, Y=1455

Button A: X+18, Y+83
Button B: X+82, Y+42
Prize: X=1088, Y=2328

Button A: X+55, Y+17
Button B: X+41, Y+77
Prize: X=2658, Y=14422

Button A: X+66, Y+17
Button B: X+20, Y+66
Prize: X=15730, Y=2577

Button A: X+22, Y+50
Button B: X+62, Y+25
Prize: X=9266, Y=19625

Button A: X+42, Y+90
Button B: X+57, Y+39
Prize: X=1050, Y=1086

Button A: X+44, Y+17
Button B: X+24, Y+49
Prize: X=17292, Y=10299

Button A: X+82, Y+45
Button B: X+18, Y+82
Prize: X=7086, Y=4682

Button A: X+59, Y+11
Button B: X+18, Y+48
Prize: X=2691, Y=14187

Button A: X+11, Y+26
Button B: X+47, Y+27
Prize: X=1434, Y=2044

Button A: X+55, Y+17
Button B: X+19, Y+69
Prize: X=15509, Y=2755

Button A: X+31, Y+62
Button B: X+66, Y+42
Prize: X=5163, Y=3666

Button A: X+37, Y+98
Button B: X+65, Y+20
Prize: X=5619, Y=6666

Button A: X+93, Y+48
Button B: X+53, Y+93
Prize: X=9198, Y=8883

Button A: X+85, Y+81
Button B: X+24, Y+85
Prize: X=9409, Y=14620

Button A: X+30, Y+92
Button B: X+65, Y+47
Prize: X=3130, Y=8380

Button A: X+26, Y+54
Button B: X+91, Y+37
Prize: X=11583, Y=9009

Button A: X+12, Y+67
Button B: X+49, Y+12
Prize: X=9413, Y=18778

Button A: X+30, Y+76
Button B: X+45, Y+11
Prize: X=18185, Y=4751

Button A: X+96, Y+27
Button B: X+20, Y+52
Prize: X=2032, Y=2612

Button A: X+66, Y+23
Button B: X+21, Y+50
Prize: X=9587, Y=439

Button A: X+84, Y+30
Button B: X+19, Y+41
Prize: X=3287, Y=1345

Button A: X+40, Y+72
Button B: X+49, Y+17
Prize: X=19636, Y=18100

Button A: X+29, Y+45
Button B: X+63, Y+22
Prize: X=6502, Y=2968

Button A: X+18, Y+49
Button B: X+64, Y+39
Prize: X=8748, Y=13664

Button A: X+28, Y+26
Button B: X+85, Y+18
Prize: X=2548, Y=660

Button A: X+42, Y+99
Button B: X+35, Y+12
Prize: X=4669, Y=4731

Button A: X+11, Y+57
Button B: X+59, Y+16
Prize: X=16101, Y=6035

Button A: X+48, Y+29
Button B: X+18, Y+40
Prize: X=4596, Y=3767

Button A: X+41, Y+23
Button B: X+18, Y+37
Prize: X=7736, Y=12782

Button A: X+39, Y+16
Button B: X+25, Y+62
Prize: X=8886, Y=2984

Button A: X+90, Y+74
Button B: X+15, Y+50
Prize: X=4845, Y=4850

Button A: X+51, Y+32
Button B: X+26, Y+90
Prize: X=2766, Y=7262

Button A: X+11, Y+45
Button B: X+80, Y+28
Prize: X=5239, Y=19165

Button A: X+16, Y+14
Button B: X+15, Y+61
Prize: X=1923, Y=6135

Button A: X+35, Y+16
Button B: X+33, Y+85
Prize: X=2002, Y=4341

Button A: X+97, Y+41
Button B: X+33, Y+89
Prize: X=9891, Y=7483

Button A: X+99, Y+47
Button B: X+38, Y+98
Prize: X=4320, Y=7808

Button A: X+14, Y+34
Button B: X+44, Y+33
Prize: X=398, Y=9971

Button A: X+12, Y+74
Button B: X+67, Y+15
Prize: X=392, Y=12854

Button A: X+17, Y+34
Button B: X+44, Y+12
Prize: X=17044, Y=14284

Button A: X+59, Y+18
Button B: X+28, Y+68
Prize: X=1748, Y=19632

Button A: X+35, Y+98
Button B: X+93, Y+68
Prize: X=8712, Y=9194

Button A: X+49, Y+16
Button B: X+12, Y+45
Prize: X=14755, Y=14821

Button A: X+43, Y+13
Button B: X+72, Y+94
Prize: X=8420, Y=7024

Button A: X+52, Y+12
Button B: X+26, Y+74
Prize: X=4566, Y=12022

Button A: X+32, Y+52
Button B: X+52, Y+27
Prize: X=18460, Y=13605

Button A: X+12, Y+95
Button B: X+55, Y+52
Prize: X=4671, Y=5922

Button A: X+54, Y+35
Button B: X+12, Y+32
Prize: X=15578, Y=16663

Button A: X+55, Y+86
Button B: X+29, Y+14
Prize: X=1023, Y=910

Button A: X+16, Y+56
Button B: X+55, Y+21
Prize: X=8007, Y=3189

Button A: X+18, Y+55
Button B: X+51, Y+22
Prize: X=1715, Y=9912

Button A: X+43, Y+13
Button B: X+15, Y+39
Prize: X=2058, Y=1794

Button A: X+91, Y+15
Button B: X+53, Y+78
Prize: X=10286, Y=5505

Button A: X+28, Y+17
Button B: X+16, Y+30
Prize: X=14204, Y=3857

Button A: X+55, Y+24
Button B: X+21, Y+54
Prize: X=2567, Y=3900

Button A: X+16, Y+62
Button B: X+31, Y+14
Prize: X=9840, Y=16924

Button A: X+54, Y+33
Button B: X+14, Y+42
Prize: X=7068, Y=9455

Button A: X+49, Y+14
Button B: X+42, Y+44
Prize: X=6230, Y=4212

Button A: X+30, Y+12
Button B: X+24, Y+63
Prize: X=13616, Y=2360

Button A: X+12, Y+46
Button B: X+69, Y+35
Prize: X=2648, Y=18288

Button A: X+89, Y+15
Button B: X+50, Y+85
Prize: X=8434, Y=6705

Button A: X+84, Y+12
Button B: X+22, Y+27
Prize: X=9134, Y=2283

Button A: X+17, Y+37
Button B: X+47, Y+12
Prize: X=12898, Y=9663

Button A: X+23, Y+66
Button B: X+33, Y+14
Prize: X=6330, Y=13868

Button A: X+20, Y+44
Button B: X+59, Y+18
Prize: X=5339, Y=9306

Button A: X+96, Y+72
Button B: X+14, Y+47
Prize: X=6690, Y=6441

Button A: X+91, Y+21
Button B: X+53, Y+85
Prize: X=8811, Y=2761`;

export const testData = parseInput(testString) as string[];
export const data = parseInput(input) as string[];