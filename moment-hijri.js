// moment-hijri.js
// author: Suhail Alkowaileet
// This is a modified version of moment-jalaali by Behrang Noruzi Niya
// license: MIT

'use strict';

/************************************
    Expose Moment Hijri
************************************/
(function (root, factory) {
	/* global define */
	if (typeof define === 'function' && define.amd) {
		define(['moment'], function (moment) {
			root.moment = factory(moment)
			return root.moment
		})
	} else if (typeof exports === 'object') {
		module.exports = factory(require('moment'))
	} else {
		root.moment = factory(root.moment)
	}
})(this, function (moment) { // jshint ignore:line

	if (moment == null) {
		throw new Error('Cannot find moment')
	}

	/************************************
      Constants
  ************************************/
	var extended = [20,    50,    79,    109,   138,   168,   197,   227,   256,   286,   315,   345,   374,   404,   433,   463,   492,   522,   551,   581, 
		611,   641,   670,   700,   729,   759,   788,   818,   847,   877,   906,   936,   965,   995,   1024,  1054,  1083,  1113,  1142,  1172,
		1201,  1231,  1260,  1290,  1320,  1350,  1379,  1409,  1438,  1468,  1497,  1527,  1556,  1586,  1615,  1645,  1674,  1704,  1733,  1763,
		1792,  1822,  1851,  1881,  1910,  1940,  1969,  1999,  2028,  2058,  2087,  2117,  2146,  2176,  2205,  2235,  2264,  2294,  2323,  2353,
		2383,  2413,  2442,  2472,  2501,  2531,  2560,  2590,  2619,  2649,  2678,  2708,  2737,  2767,  2796,  2826,  2855,  2885,  2914,  2944,
		2973,  3003,  3032,  3062,  3091,  3121,  3150,  3180,  3209,  3239,  3268,  3298,  3327,  3357,  3386,  3416,  3446,  3476,  3505,  3535,
		3564,  3594,  3623,  3653,  3682,  3712,  3741,  3771,  3800,  3830,  3859,  3889,  3918,  3948,  3977,  4007,  4036,  4066,  4095,  4125,
		4155,  4185,  4214,  4244,  4273,  4303,  4332,  4362,  4391,  4421,  4450,  4480,  4509,  4539,  4568,  4598,  4627,  4657,  4686,  4716,
		4745,  4775,  4804,  4834,  4863,  4893,  4922,  4952,  4981,  5011,  5040,  5070,  5099,  5129,  5158,  5188,  5218,  5248,  5277,  5307,
		5336,  5366,  5395,  5425,  5454,  5484,  5513,  5543,  5572,  5602,  5631,  5661,  5690,  5720,  5749,  5779,  5808,  5838,  5867,  5897,
		5926,  5956,  5985,  6015,  6044,  6074,  6103,  6133,  6162,  6192,  6221,  6251,  6281,  6311,  6340,  6370,  6399,  6429,  6458,  6488,
		6517,  6547,  6576,  6606,  6635,  6665,  6694,  6724,  6753,  6783,  6812,  6842,  6871,  6901,  6930,  6960,  6989,  7019,  7048,  7078,
		7107,  7137,  7166,  7196,  7225,  7255,  7284,  7314,  7344,  7374,  7403,  7433,  7462,  7492,  7521,  7551,  7580,  7610,  7639,  7669,
		7698,  7728,  7757,  7787,  7816,  7846,  7875,  7905,  7934,  7964,  7993,  8023,  8053,  8083,  8112,  8142,  8171,  8201,  8230,  8260,
		8289,  8319,  8348,  8378,  8407,  8437,  8466,  8496,  8525,  8555,  8584,  8614,  8643,  8673,  8702,  8732,  8761,  8791,  8821,  8850,
		8880,  8909,  8938,  8968,  8997,  9027,  9056,  9086,  9115,  9145,  9175,  9205,  9234,  9264,  9293,  9322,  9352,  9381,  9410,  9440,
		9470,  9499,  9529,  9559,  9589,  9618,  9648,  9677,  9706,  9736,  9765,  9794,  9824,  9853,  9883,  9913,  9943,  9972,  10002, 10032,
		10061, 10090, 10120, 10149, 10178, 10208, 10237, 10267, 10297, 10326, 10356, 10386, 10415, 10445, 10474, 10504, 10533, 10562, 10592, 10621,
		10651, 10680, 10710, 10740, 10770, 10799, 10829, 10858, 10888, 10917, 10947, 10976, 11005, 11035, 11064, 11094, 11124, 11153, 11183, 11213,
		11242, 11272, 11301, 11331, 11360, 11389, 11419, 11448, 11478, 11507, 11537, 11567, 11596, 11626, 11655, 11685, 11715, 11744, 11774, 11803,
		11832, 11862, 11891, 11921, 11950, 11980, 12010, 12039, 12069, 12099, 12128, 12158, 12187, 12216, 12246, 12275, 12304, 12334, 12364, 12393,
		12423, 12453, 12483, 12512, 12542, 12571, 12600, 12630, 12659, 12688, 12718, 12747, 12777, 12807, 12837, 12866, 12896, 12926, 12955, 12984,
		13014, 13043, 13072, 13102, 13131, 13161, 13191, 13220, 13250, 13280, 13310, 13339, 13368, 13398, 13427, 13456, 13486, 13515, 13545, 13574,
		13604, 13634, 13664, 13693, 13723, 13752, 13782, 13811, 13840, 13870, 13899, 13929, 13958, 13988, 14018, 14047, 14077, 14107, 14136, 14166,
		14195, 14224, 14254, 14283, 14313, 14342, 14372, 14401, 14431, 14461, 14490, 14520, 14550, 14579, 14609, 14638, 14667, 14697, 14726, 14756,
		14785, 14815, 14844, 14874, 14904, 14933, 14963, 14993, 15021, 15051, 15081, 15110, 15140, 15169, 15199, 15228, 15258, 15287, 15317, 15347,
		15377, 15406, 15436, 15465, 15494, 15524, 15553, 15582, 15612, 15641, 15671, 15701, 15731, 15760, 15790, 15820, 15849, 15878, 15908, 15937,
		15966, 15996, 16025, 16055, 16085, 16114, 16144, 16174, 16204, 16233, 16262, 16292, 16321, 16350, 16380, 16409, 16439, 16468, 16498, 16528,
		16558, 16587, 16617, 16646, 16676, 16705, 16734, 16764, 16793, 16823, 16852, 16882, 16912, 16941, 16971, 17001, 17030, 17060, 17089, 17118,
		17148, 17177, 17207, 17236, 17266, 17295, 17325, 17355, 17384, 17414, 17444, 17473, 17502, 17532, 17561, 17591, 17620, 17650, 17679, 17709,
		17738, 17768, 17798, 17827, 17857, 17886, 17916, 17945, 17975, 18004, 18034, 18063, 18093, 18122, 18152, 18181, 18211, 18241, 18270, 18300,
		18330, 18359, 18388, 18418, 18447, 18476, 18506, 18535, 18565, 18595, 18625, 18654, 18684, 18714, 18743, 18772, 18802, 18831, 18860, 18890,
		18919, 18949, 18979, 19008, 19038, 19068, 19098, 19127, 19156, 19186, 19215, 19244, 19274, 19303, 19333, 19362, 19392, 19422, 19452, 19481,
		19511, 19540, 19570, 19599, 19628, 19658, 19687, 19717, 19746, 19776, 19806, 19836, 19865, 19895, 19924, 19954, 19983, 20012, 20042, 20071,
		20101, 20130, 20160, 20190, 20219, 20249, 20279, 20308, 20338, 20367, 20396, 20426, 20455, 20485, 20514, 20544, 20573, 20603, 20633, 20662,
		20692, 20721, 20751, 20780, 20810, 20839, 20869, 20898, 20928, 20957, 20987, 21016, 21046, 21076, 21105, 21135, 21164, 21194, 21223, 21253,
		21282, 21312, 21341, 21371, 21400, 21430, 21459, 21489, 21519, 21548, 21578, 21607, 21637, 21666, 21696, 21725, 21754, 21784, 21813, 21843,
		21873, 21902, 21932, 21962, 21991, 22021, 22050, 22080, 22109, 22138, 22168, 22197, 22227, 22256, 22286, 22316, 22346, 22375, 22405, 22434,
		22464, 22493, 22522, 22552, 22581, 22611, 22640, 22670, 22700, 22730, 22759, 22789, 22818, 22848, 22877, 22906, 22936, 22965, 22994, 23024,
		23054, 23083, 23113, 23143, 23173, 23202, 23232, 23261, 23290, 23320, 23349, 23379, 23408, 23438, 23467, 23497, 23527, 23556, 23586, 23616,
		23645, 23674, 23704, 23733, 23763, 23792, 23822, 23851, 23881, 23910, 23940, 23970, 23999, 24029, 24058, 24088, 24117, 24147, 24176, 24206,
		24235, 24265, 24294, 24324, 24353, 24383, 24413, 24442, 24472, 24501, 24531, 24560, 24590, 24619, 24648, 24678, 24707, 24737, 24767, 24796,
		24826, 24856, 24885, 24915, 24944, 24974, 25003, 25032, 25062, 25091, 25121, 25150, 25180, 25210, 25240, 25269, 25299, 25328, 25358, 25387,
		25416, 25446, 25475, 25505, 25534, 25564, 25594, 25624, 25653, 25683, 25712, 25742, 25771, 25800, 25830, 25859, 25888, 25918, 25948, 25977,
		26007, 26037, 26067, 26096, 26126, 26155, 26184, 26214, 26243, 26272, 26302, 26332, 26361, 26391, 26421, 26451, 26480, 26510, 26539, 26568,
		26598, 26627, 26656, 26686, 26715, 26745, 26775, 26805, 26834, 26864, 26893, 26923, 26952, 26982, 27011, 27041, 27070, 27099, 27129, 27159,
		27188, 27218, 27248, 27277, 27307, 27336, 27366, 27395, 27425, 27454, 27484, 27513, 27542, 27572, 27602, 27631, 27661, 27691, 27720, 27750,
		27779, 27809, 27838, 27868, 27897, 27926, 27956, 27985, 28015, 28045, 28074, 28104, 28134, 28163, 28193, 28222, 28252, 28281, 28310, 28340,
		28369, 28399, 28428, 28458, 28488, 28517, 28547, 28577];
	var newMoonIndex = 16260 - extended.length;
	var ummalqura = {
		ummalquraData: extended.concat([
                      28607, 28636, 28665, 28695, 28724, 28754, 28783, 28813, 28843, 28872, 28901, 28931, 28960, 28990, 29019, 29049, 29078, 29108, 29137, 29167,
                      29196, 29226, 29255, 29285, 29315, 29345, 29375, 29404, 29434, 29463, 29492, 29522, 29551, 29580, 29610, 29640, 29669, 29699, 29729, 29759,
                      29788, 29818, 29847, 29876, 29906, 29935, 29964, 29994, 30023, 30053, 30082, 30112, 30141, 30171, 30200, 30230, 30259, 30289, 30318, 30348,
                      30378, 30408, 30437, 30467, 30496, 30526, 30555, 30585, 30614, 30644, 30673, 30703, 30732, 30762, 30791, 30821, 30850, 30880, 30909, 30939,
                      30968, 30998, 31027, 31057, 31086, 31116, 31145, 31175, 31204, 31234, 31263, 31293, 31322, 31352, 31381, 31411, 31441, 31471, 31500, 31530,
                      31559, 31589, 31618, 31648, 31676, 31706, 31736, 31766, 31795, 31825, 31854, 31884, 31913, 31943, 31972, 32002, 32031, 32061, 32090, 32120,
                      32150, 32180, 32209, 32239, 32268, 32298, 32327, 32357, 32386, 32416, 32445, 32475, 32504, 32534, 32563, 32593, 32622, 32652, 32681, 32711,
                      32740, 32770, 32799, 32829, 32858, 32888, 32917, 32947, 32976, 33006, 33035, 33065, 33094, 33124, 33153, 33183, 33213, 33243, 33272, 33302,
                      33331, 33361, 33390, 33420, 33450, 33479, 33509, 33539, 33568, 33598, 33627, 33657, 33686, 33716, 33745, 33775, 33804, 33834, 33863, 33893,
                      33922, 33952, 33981, 34011, 34040, 34069, 34099, 34128, 34158, 34187, 34217, 34247, 34277, 34306, 34336, 34365, 34395, 34424, 34454, 34483,
                      34512, 34542, 34571, 34601, 34631, 34660, 34690, 34719, 34749, 34778, 34808, 34837, 34867, 34896, 34926, 34955, 34985, 35015, 35044, 35074,
                      35103, 35133, 35162, 35192, 35222, 35251, 35280, 35310, 35340, 35370, 35399, 35429, 35458, 35488, 35517, 35547, 35576, 35605, 35635, 35665,
                      35694, 35723, 35753, 35782, 35811, 35841, 35871, 35901, 35930, 35960, 35989, 36019, 36048, 36078, 36107, 36136, 36166, 36195, 36225, 36254,
                      36284, 36314, 36343, 36373, 36403, 36433, 36462, 36492, 36521, 36551, 36580, 36610, 36639, 36669, 36698, 36728, 36757, 36786, 36816, 36845,
                      36875, 36904, 36934, 36963, 36993, 37022, 37052, 37081, 37111, 37141, 37170, 37200, 37229, 37259, 37288, 37318, 37347, 37377, 37406, 37436,
                      37465, 37495, 37524, 37554, 37584, 37613, 37643, 37672, 37701, 37731, 37760, 37790, 37819, 37849, 37878, 37908, 37938, 37967, 37997, 38027,
                      38056, 38085, 38115, 38144, 38174, 38203, 38233, 38262, 38292, 38322, 38351, 38381, 38410, 38440, 38469, 38499, 38528, 38558, 38587, 38617,
                      38646, 38676, 38705, 38735, 38764, 38794, 38823, 38853, 38882, 38912, 38941, 38971, 39001, 39030, 39059, 39089, 39118, 39148, 39178, 39208,
                      39237, 39267, 39297, 39326, 39355, 39385, 39414, 39444, 39473, 39503, 39532, 39562, 39592, 39621, 39650, 39680, 39709, 39739, 39768, 39798,
                      39827, 39857, 39886, 39916, 39946, 39975, 40005, 40035, 40064, 40094, 40123, 40153, 40182, 40212, 40241, 40271, 40300, 40330, 40359, 40389,
                      40418, 40448, 40477, 40507, 40536, 40566, 40595, 40625, 40655, 40685, 40714, 40744, 40773, 40803, 40832, 40862, 40892, 40921, 40951, 40980,
                      41009, 41039, 41068, 41098, 41127, 41157, 41186, 41216, 41245, 41275, 41304, 41334, 41364, 41393, 41422, 41452, 41481, 41511, 41540, 41570,
                      41599, 41629, 41658, 41688, 41718, 41748, 41777, 41807, 41836, 41865, 41894, 41924, 41953, 41983, 42012, 42042, 42072, 42102, 42131, 42161,
                      42190, 42220, 42249, 42279, 42308, 42337, 42367, 42397, 42426, 42456, 42485, 42515, 42545, 42574, 42604, 42633, 42662, 42692, 42721, 42751,
                      42780, 42810, 42839, 42869, 42899, 42929, 42958, 42988, 43017, 43046, 43076, 43105, 43135, 43164, 43194, 43223, 43253, 43283, 43312, 43342,
                      43371, 43401, 43430, 43460, 43489, 43519, 43548, 43578, 43607, 43637, 43666, 43696, 43726, 43755, 43785, 43814, 43844, 43873, 43903, 43932,
                      43962, 43991, 44021, 44050, 44080, 44109, 44139, 44169, 44198, 44228, 44258, 44287, 44317, 44346, 44375, 44405, 44434, 44464, 44493, 44523,
                      44553, 44582, 44612, 44641, 44671, 44700, 44730, 44759, 44788, 44818, 44847, 44877, 44906, 44936, 44966, 44996, 45025, 45055, 45084, 45114,
                      45143, 45172, 45202, 45231, 45261, 45290, 45320, 45350, 45380, 45409, 45439, 45468, 45498, 45527, 45556, 45586, 45615, 45644, 45674, 45704,
                      45733, 45763, 45793, 45823, 45852, 45882, 45911, 45940, 45970, 45999, 46028, 46058, 46088, 46117, 46147, 46177, 46206, 46236, 46265, 46295,
                      46324, 46354, 46383, 46413, 46442, 46472, 46501, 46531, 46560, 46590, 46620, 46649, 46679, 46708, 46738, 46767, 46797, 46826, 46856, 46885,
                      46915, 46944, 46974, 47003, 47033, 47063, 47092, 47122, 47151, 47181, 47210, 47240, 47269, 47298, 47328, 47357, 47387, 47417, 47446, 47476,
                      47506, 47535, 47565, 47594, 47624, 47653, 47682, 47712, 47741, 47771, 47800, 47830, 47860, 47890, 47919, 47949, 47978, 48008, 48037, 48066,
                      48096, 48125, 48155, 48184, 48214, 48244, 48273, 48303, 48333, 48362, 48392, 48421, 48450, 48480, 48509, 48538, 48568, 48598, 48627, 48657,
                      48687, 48717, 48746, 48776, 48805, 48834, 48864, 48893, 48922, 48952, 48982, 49011, 49041, 49071, 49100, 49130, 49160, 49189, 49218, 49248,
                      49277, 49306, 49336, 49365, 49395, 49425, 49455, 49484, 49514, 49543, 49573, 49602, 49632, 49661, 49690, 49720, 49749, 49779, 49809, 49838,
                      49868, 49898, 49927, 49957, 49986, 50016, 50045, 50075, 50104, 50133, 50163, 50192, 50222, 50252, 50281, 50311, 50340, 50370, 50400, 50429,
                      50459, 50488, 50518, 50547, 50576, 50606, 50635, 50665, 50694, 50724, 50754, 50784, 50813, 50843, 50872, 50902, 50931, 50960, 50990, 51019,
                      51049, 51078, 51108, 51138, 51167, 51197, 51227, 51256, 51286, 51315, 51345, 51374, 51403, 51433, 51462, 51492, 51522, 51552, 51582, 51611,
                      51641, 51670, 51699, 51729, 51758, 51787, 51816, 51846, 51876, 51906, 51936, 51965, 51995, 52025, 52054, 52083, 52113, 52142, 52171, 52200,
                      52230, 52260, 52290, 52319, 52349, 52379, 52408, 52438, 52467, 52497, 52526, 52555, 52585, 52614, 52644, 52673, 52703, 52733, 52762, 52792,
                      52822, 52851, 52881, 52910, 52939, 52969, 52998, 53028, 53057, 53087, 53116, 53146, 53176, 53205, 53235, 53264, 53294, 53324, 53353, 53383,
                      53412, 53441, 53471, 53500, 53530, 53559, 53589, 53619, 53648, 53678, 53708, 53737, 53767, 53796, 53825, 53855, 53884, 53913, 53943, 53973,
                      54003, 54032, 54062, 54092, 54121, 54151, 54180, 54209, 54239, 54268, 54297, 54327, 54357, 54387, 54416, 54446, 54476, 54505, 54535, 54564,
                      54593, 54623, 54652, 54681, 54711, 54741, 54770, 54800, 54830, 54859, 54889, 54919, 54948, 54977, 55007, 55036, 55066, 55095, 55125, 55154,
                      55184, 55213, 55243, 55273, 55302, 55332, 55361, 55391, 55420, 55450, 55479, 55508, 55538, 55567, 55597, 55627, 55657, 55686, 55716, 55745,
                      55775, 55804, 55834, 55863, 55892, 55922, 55951, 55981, 56011, 56040, 56070, 56100, 56129, 56159, 56188, 56218, 56247, 56276, 56306, 56335,
                      56365, 56394, 56424, 56454, 56483, 56513, 56543, 56572, 56601, 56631, 56660, 56690, 56719, 56749, 56778, 56808, 56837, 56867, 56897, 56926,
                      56956, 56985, 57015, 57044, 57074, 57103, 57133, 57162, 57192, 57221, 57251, 57280, 57310, 57340, 57369, 57399, 57429, 57458, 57487, 57517,
                      57546, 57576, 57605, 57634, 57664, 57694, 57723, 57753, 57783, 57813, 57842, 57871, 57901, 57930, 57959, 57989, 58018, 58048, 58077, 58107,
                      58137, 58167, 58196, 58226, 58255, 58285, 58314, 58343, 58373, 58402, 58432, 58461, 58491, 58521, 58551, 58580, 58610, 58639, 58669, 58698,
                      58727, 58757, 58786, 58816, 58845, 58875, 58905, 58934, 58964, 58994, 59023, 59053, 59082, 59111, 59141, 59170, 59200, 59229, 59259, 59288,
                      59318, 59348, 59377, 59407, 59436, 59466, 59495, 59525, 59554, 59584, 59613, 59643, 59672, 59702, 59731, 59761, 59791, 59820, 59850, 59879,
                      59909, 59939, 59968, 59997, 60027, 60056, 60086, 60115, 60145, 60174, 60204, 60234, 60264, 60293, 60323, 60352, 60381, 60411, 60440, 60469,
                      60499, 60528, 60558, 60588, 60618, 60648, 60677, 60707, 60736, 60765, 60795, 60824, 60853, 60883, 60912, 60942, 60972, 61002, 61031, 61061,
                      61090, 61120, 61149, 61179, 61208, 61237, 61267, 61296, 61326, 61356, 61385, 61415, 61445, 61474, 61504, 61533, 61563, 61592, 61621, 61651,
                      61680, 61710, 61739, 61769, 61799, 61828, 61858, 61888, 61917, 61947, 61976, 62006, 62035, 62064, 62094, 62123, 62153, 62182, 62212, 62242,
                      62271, 62301, 62331, 62360, 62390, 62419, 62448, 62478, 62507, 62537, 62566, 62596, 62625, 62655, 62685, 62715, 62744, 62774, 62803, 62832,
                      62862, 62891, 62921, 62950, 62980, 63009, 63039, 63069, 63099, 63128, 63157, 63187, 63216, 63246, 63275, 63305, 63334, 63363, 63393, 63423,
                      63453, 63482, 63512, 63541, 63571, 63600, 63630, 63659, 63689, 63718, 63747, 63777, 63807, 63836, 63866, 63895, 63925, 63955, 63984, 64014,
                      64043, 64073, 64102, 64131, 64161, 64190, 64220, 64249, 64279, 64309, 64339, 64368, 64398, 64427, 64457, 64486, 64515, 64545, 64574, 64603,
                      64633, 64663, 64692, 64722, 64752, 64782, 64811, 64841, 64870, 64899, 64929, 64958, 64987, 65017, 65047, 65076, 65106, 65136, 65166, 65195,
                      65225, 65254, 65283, 65313, 65342, 65371, 65401, 65431, 65460, 65490, 65520, 65549, 65579, 65608, 65638, 65667, 65697, 65726, 65755, 65785,
                      65815, 65844, 65874, 65903, 65933, 65963, 65992, 66022, 66051, 66081, 66110, 66140, 66169, 66199, 66228, 66258, 66287, 66317, 66346, 66376,
                      66405, 66435, 66465, 66494, 66524, 66553, 66583, 66612, 66641, 66671, 66700, 66730, 66760, 66789, 66819, 66849, 66878, 66908, 66937, 66967,
                      66996, 67025, 67055, 67084, 67114, 67143, 67173, 67203, 67233, 67262, 67292, 67321, 67351, 67380, 67409, 67439, 67468, 67497, 67527, 67557,
                      67587, 67617, 67646, 67676, 67705, 67735, 67764, 67793, 67823, 67852, 67882, 67911, 67941, 67971, 68000, 68030, 68060, 68089, 68119, 68148,
                      68177, 68207, 68236, 68266, 68295, 68325, 68354, 68384, 68414, 68443, 68473, 68502, 68532, 68561, 68591, 68620, 68650, 68679, 68708, 68738,
                      68768, 68797, 68827, 68857, 68886, 68916, 68946, 68975, 69004, 69034, 69063, 69092, 69122, 69152, 69181, 69211, 69240, 69270, 69300, 69330,
                      69359, 69388, 69418, 69447, 69476, 69506, 69535, 69565, 69595, 69624, 69654, 69684, 69713, 69743, 69772, 69802, 69831, 69861, 69890, 69919,
                      69949, 69978, 70008, 70038, 70067, 70097, 70126, 70156, 70186, 70215, 70245, 70274, 70303, 70333, 70362, 70392, 70421, 70451, 70481, 70510,
                      70540, 70570, 70599, 70629, 70658, 70687, 70717, 70746, 70776, 70805, 70835, 70864, 70894, 70924, 70954, 70983, 71013, 71042, 71071, 71101,
                      71130, 71159, 71189, 71218, 71248, 71278, 71308, 71337, 71367, 71397, 71426, 71455, 71485, 71514, 71543, 71573, 71602, 71632, 71662, 71691,
                      71721, 71751, 71781, 71810, 71839, 71869, 71898, 71927, 71957, 71986, 72016, 72046, 72075, 72105, 72135, 72164, 72194, 72223, 72253, 72282,
                      72311, 72341, 72370, 72400, 72429, 72459, 72489, 72518, 72548, 72577, 72607, 72637, 72666, 72695, 72725, 72754, 72784, 72813, 72843, 72872,
                      72902, 72931, 72961, 72991, 73020, 73050, 73080, 73109, 73139, 73168, 73197, 73227, 73256, 73286, 73315, 73345, 73375, 73404, 73434, 73464,
                      73493, 73523, 73552, 73581, 73611, 73640, 73669, 73699, 73729, 73758, 73788, 73818, 73848, 73877, 73907, 73936, 73965, 73995, 74024, 74053,
                      74083, 74113, 74142, 74172, 74202, 74231, 74261, 74291, 74320, 74349, 74379, 74408, 74437, 74467, 74497, 74526, 74556, 74586, 74615, 74645,
                      74675, 74704, 74733, 74763, 74792, 74822, 74851, 74881, 74910, 74940, 74969, 74999, 75029, 75058, 75088, 75117, 75147, 75176, 75206, 75235,
                      75264, 75294, 75323, 75353, 75383, 75412, 75442, 75472, 75501, 75531, 75560, 75590, 75619, 75648, 75678, 75707, 75737, 75766, 75796, 75826,
                      75856, 75885, 75915, 75944, 75974, 76003, 76032, 76062, 76091, 76121, 76150, 76180, 76210, 76239, 76269, 76299, 76328, 76358, 76387, 76416,
                      76446, 76475, 76505, 76534, 76564, 76593, 76623, 76653, 76682, 76712, 76741, 76771, 76801, 76830, 76859, 76889, 76918, 76948, 76977, 77007,
                      77036, 77066, 77096, 77125, 77155, 77185, 77214, 77243, 77273, 77302, 77332, 77361, 77390, 77420, 77450, 77479, 77509, 77539, 77569, 77598,
                      77627, 77657, 77686, 77715, 77745, 77774, 77804, 77833, 77863, 77893, 77923, 77952, 77982, 78011, 78041, 78070, 78099, 78129, 78158, 78188,
                      78217, 78247, 78277, 78307, 78336, 78366, 78395, 78425, 78454, 78483, 78513, 78542, 78572, 78601, 78631, 78661, 78690, 78720, 78750, 78779,
                      78808, 78838, 78867, 78897, 78926, 78956, 78985, 79015, 79044, 79074, 79104, 79133, 79163, 79192, 79222, 79251, 79281, 79310, 79340, 79369,
                      79399, 79428, 79458, 79487, 79517, 79546, 79576, 79606, 79635, 79665, 79695, 79724, 79753, 79783, 79812, 79841, 79871, 79900, 79930, 79960,
                      79990])
	}

	var formattingTokens = /(\[[^\[]*\])|(\\)?i(Mo|MM?M?M?|Do|DDDo|DD?D?D?|w[o|w]?|YYYYY|YYYY|YY|gg(ggg?)?)|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
		localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g

	, parseTokenOneOrTwoDigits = /\d\d?/, parseTokenOneToThreeDigits = /\d{1,3}/, parseTokenThreeDigits = /\d{3}/, parseTokenFourDigits = /\d{1,4}/, parseTokenSixDigits = /[+\-]?\d{1,6}/, parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.?)|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, parseTokenT = /T/i, parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/

	, unitAliases = {
		hd: 'idate',
		hm: 'imonth',
		hy: 'iyear'
	}

	, formatFunctions = {}

	, ordinalizeTokens = 'DDD w M D'.split(' '), paddedTokens = 'M D w'.split(' ')

	, formatTokenFunctions = {
		iM: function () {
			return this.iMonth() + 1
		},
		iMMM: function (format) {
			return this.localeData().iMonthsShort(this, format)
		},
		iMMMM: function (format) {
			return this.localeData().iMonths(this, format)
		},
		iD: function () {
			return this.iDate()
		},
		iDDD: function () {
			return this.iDayOfYear()
		},
		iw: function () {
			return this.iWeek()
		},
		iYY: function () {
			return leftZeroFill(this.iYear() % 100, 2)
		},
		iYYYY: function () {
			return leftZeroFill(this.iYear(), 4)
		},
		iYYYYY: function () {
			return leftZeroFill(this.iYear(), 5)
		},
		igg: function () {
			return leftZeroFill(this.iWeekYear() % 100, 2)
		},
		igggg: function () {
			return this.iWeekYear()
		},
		iggggg: function () {
			return leftZeroFill(this.iWeekYear(), 5)
		}
	}, i

	function padToken(func, count) {
		return function (a) {
			return leftZeroFill(func.call(this, a), count)
		}
	}

	function ordinalizeToken(func, period) {
		return function (a) {
			return this.localeData().ordinal(func.call(this, a), period)
		}
	}

	while (ordinalizeTokens.length) {
		i = ordinalizeTokens.pop()
		formatTokenFunctions['i' + i + 'o'] = ordinalizeToken(formatTokenFunctions['i' + i], i)
	}
	while (paddedTokens.length) {
		i = paddedTokens.pop()
		formatTokenFunctions['i' + i + i] = padToken(formatTokenFunctions['i' + i], 2)
	}
	formatTokenFunctions.iDDDD = padToken(formatTokenFunctions.iDDD, 3)

	/************************************
      Helpers
  ************************************/

	function extend(a, b) {
		var key
		for (key in b)
			if (b.hasOwnProperty(key))
				a[key] = b[key]
		return a
	}

	function leftZeroFill(number, targetLength) {
		var output = number + ''
		while (output.length < targetLength)
			output = '0' + output
		return output
	}

	function isArray(input) {
		return Object.prototype.toString.call(input) === '[object Array]'
	}

	function normalizeUnits(units) {
		return units ? unitAliases[units] || units.toLowerCase().replace(/(.)s$/, '$1') : units
	}

	function setDate(moment, year, month, date) {
		var utc = moment._isUTC ? 'UTC' : ''
		moment._d['set' + utc + 'FullYear'](year)
		moment._d['set' + utc + 'Month'](month)
		moment._d['set' + utc + 'Date'](date)
	}

	function objectCreate(parent) {
		function F() {}
		F.prototype = parent
		return new F()
	}

	function getPrototypeOf(object) {
		if (Object.getPrototypeOf)
			return Object.getPrototypeOf(object)
		else if (''.__proto__) // jshint ignore:line
			return object.__proto__ // jshint ignore:line
		else
			return object.constructor.prototype
	}

	/************************************
      Languages
  ************************************/
	extend(getPrototypeOf(moment.localeData()), {
		_iMonths: ['Muharram'
                , 'Safar'
                , 'Rabi\' al-Awwal'
                , 'Rabi\' al-Thani'
                , 'Jumada al-Ula'
                , 'Jumada al-Alkhirah'
                , 'Rajab'
                , 'Sha’ban'
                , 'Ramadhan'
                , 'Shawwal'
                , 'Thul-Qi’dah'
                , 'Thul-Hijjah'
                ],
		iMonths: function (m) {
			return this._iMonths[m.iMonth()]
		}

		,
		_iMonthsShort: ['Muh'
                      , 'Saf'
                      , 'Rab-I'
                      , 'Rab-II'
                      , 'Jum-I'
                      , 'Jum-II'
                      , 'Raj'
                      , 'Sha'
                      , 'Ram'
                      , 'Shw'
                      , 'Dhu-Q'
                      , 'Dhu-H'
                      ],
		iMonthsShort: function (m) {
			return this._iMonthsShort[m.iMonth()]
		}

		,
		iMonthsParse: function (monthName) {
			var i, mom, regex
			if (!this._iMonthsParse)
				this._iMonthsParse = []
			for (i = 0; i < 12; i += 1) {
				// Make the regex if we don't have it already.
				if (!this._iMonthsParse[i]) {
					mom = hMoment([2000, (2 + i) % 12, 25])
					regex = '^' + this.iMonths(mom, '') + '$|^' + this.iMonthsShort(mom, '') + '$'
					this._iMonthsParse[i] = new RegExp(regex.replace('.', ''), 'i')
				}
				// Test the regex.
				if (this._iMonthsParse[i].test(monthName))
					return i
			}
		}
	});
	var iMonthNames = {
		iMonths: 'محرم_صفر_ربيع الأول_ربيع الثاني_جمادى الأولى_جمادى الآخرة_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split('_'),
		iMonthsShort: 'محرم_صفر_ربيع ١_ربيع ٢_جمادى ١_جمادى ٢_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split('_')
	};

	// Default to the momentjs 2.12+ API
	if (typeof moment.updateLocale === 'function') {
		moment.updateLocale('ar-sa', iMonthNames);
	} else {
		var oldLocale = moment.locale();
		moment.defineLocale('ar-sa', iMonthNames);
		moment.locale(oldLocale);
	}

	/************************************
      Formatting
  ************************************/

	function makeFormatFunction(format) {
		var array = format.match(formattingTokens),
			length = array.length,
			i

		for (i = 0; i < length; i += 1)
			if (formatTokenFunctions[array[i]])
				array[i] = formatTokenFunctions[array[i]]

		return function (mom) {
			var output = ''
			for (i = 0; i < length; i += 1)
				output += array[i] instanceof Function ? '[' + array[i].call(mom, format) + ']' : array[i]
			return output
		}
	}

	/************************************
      Parsing
  ************************************/

	function getParseRegexForToken(token, config) {
		switch (token) {
		case 'iDDDD':
			return parseTokenThreeDigits
		case 'iYYYY':
			return parseTokenFourDigits
		case 'iYYYYY':
			return parseTokenSixDigits
		case 'iDDD':
			return parseTokenOneToThreeDigits
		case 'iMMM':
		case 'iMMMM':
			return parseTokenWord
		case 'iMM':
		case 'iDD':
		case 'iYY':
		case 'iM':
		case 'iD':
			return parseTokenOneOrTwoDigits
		case 'DDDD':
			return parseTokenThreeDigits
		case 'YYYY':
			return parseTokenFourDigits
		case 'YYYYY':
			return parseTokenSixDigits
		case 'S':
		case 'SS':
		case 'SSS':
		case 'DDD':
			return parseTokenOneToThreeDigits
		case 'MMM':
		case 'MMMM':
		case 'dd':
		case 'ddd':
		case 'dddd':
			return parseTokenWord
		case 'a':
		case 'A':
			return moment.localeData(config._l)._meridiemParse
		case 'X':
			return parseTokenTimestampMs
		case 'Z':
		case 'ZZ':
			return parseTokenTimezone
		case 'T':
			return parseTokenT
		case 'MM':
		case 'DD':
		case 'YY':
		case 'HH':
		case 'hh':
		case 'mm':
		case 'ss':
		case 'M':
		case 'D':
		case 'd':
		case 'H':
		case 'h':
		case 'm':
		case 's':
			return parseTokenOneOrTwoDigits
		default:
			return new RegExp(token.replace('\\', ''))
		}
	}

	function addTimeToArrayFromToken(token, input, config) {
		var a, datePartArray = config._a

		switch (token) {
		case 'iM':
		case 'iMM':
			datePartArray[1] = input == null ? 0 : ~~input - 1
			break
		case 'iMMM':
		case 'iMMMM':
			a = moment.localeData(config._l).iMonthsParse(input)
			if (a != null)
				datePartArray[1] = a
			else
				config._isValid = false
			break
		case 'iD':
		case 'iDD':
		case 'iDDD':
		case 'iDDDD':
			if (input != null)
				datePartArray[2] = ~~input
			break
		case 'iYY':
			datePartArray[0] = ~~input + (~~input > 47 ? 1300 : 1400)
			break
		case 'iYYYY':
		case 'iYYYYY':
			datePartArray[0] = ~~input
		}
		if (input == null)
			config._isValid = false
	}

	function dateFromArray(config) {
		var g, h, hy = config._a[0],
			hm = config._a[1],
			hd = config._a[2]

		if ((hy == null) && (hm == null) && (hd == null))
			return [0, 0, 1]
		hy = hy || 0
		hm = hm || 0
		hd = hd || 1
		if (hd < 1 || hd > hMoment.iDaysInMonth(hy, hm))
			config._isValid = false
		g = toGregorian(hy, hm, hd)
		h = toHijri(g.gy, g.gm, g.gd)
		config._hDiff = 0
		if (~~h.hy !== hy)
			config._hDiff += 1
		if (~~h.hm !== hm)
			config._hDiff += 1
		if (~~h.hd !== hd)
			config._hDiff += 1
		return [g.gy, g.gm, g.gd]
	}

	function makeDateFromStringAndFormat(config) {
		var tokens = config._f.match(formattingTokens),
			string = config._i,
			len = tokens.length,
			i, token, parsedInput

		config._a = []

		for (i = 0; i < len; i += 1) {
			token = tokens[i]
			parsedInput = (getParseRegexForToken(token, config).exec(string) || [])[0];
			if (parsedInput)
				string = string.slice(string.indexOf(parsedInput) + parsedInput.length)
			if (formatTokenFunctions[token])
				addTimeToArrayFromToken(token, parsedInput, config)
		}
		if (string)
			config._il = string

		return dateFromArray(config)
	}

	function makeDateFromStringAndArray(config, utc) {
		var len = config._f.length
		, i
		, format
		, tempMoment
		, bestMoment
		, currentScore
		, scoreToBeat

		if (len === 0) {
			return makeMoment(new Date(NaN))
		}

		for (i = 0; i < len; i += 1) {
			format = config._f[i]
			currentScore = 0
			tempMoment = makeMoment(config._i, format, config._l, utc)

			if (!tempMoment.isValid()) continue

			currentScore += tempMoment._hDiff
			if (tempMoment._il)
				currentScore += tempMoment._il.length
			if (scoreToBeat == null || currentScore < scoreToBeat) {
				scoreToBeat = currentScore
				bestMoment = tempMoment
			}
		}

		return bestMoment
	}

	function removeParsedTokens(config) {
		var string = config._i,
			input = '',
			format = '',
			array = config._f.match(formattingTokens),
			len = array.length,
			i, match, parsed

		for (i = 0; i < len; i += 1) {
			match = array[i]
			parsed = (getParseRegexForToken(match, config).exec(string) || [])[0]
			if (parsed)
				string = string.slice(string.indexOf(parsed) + parsed.length)
			if (!(formatTokenFunctions[match] instanceof Function)) {
				format += match
				if (parsed)
					input += parsed
			}
		}
		config._i = input
		config._f = format
	}

	/************************************
      Week of Year
  ************************************/

	function iWeekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
		var end = firstDayOfWeekOfYear - firstDayOfWeek,
			daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
			adjustedMoment

		if (daysToDayOfWeek > end) {
			daysToDayOfWeek -= 7
		}
		if (daysToDayOfWeek < end - 7) {
			daysToDayOfWeek += 7
		}
		adjustedMoment = hMoment(mom).add(daysToDayOfWeek, 'd')
		return {
			week: Math.ceil(adjustedMoment.iDayOfYear() / 7),
			year: adjustedMoment.iYear()
		}
	}

	/************************************
      Top Level Functions
  ************************************/

	function makeMoment(input, format, lang, utc) {
		var config =
			{ _i: input
			, _f: format
			, _l: lang
			}
			, date
			, m
			, hm
		if (format) {
			if (isArray(format)) {
				return makeDateFromStringAndArray(config, utc)
			} else {
				date = makeDateFromStringAndFormat(config)
				removeParsedTokens(config)
				format = 'YYYY-MM-DD-' + config._f
				input = leftZeroFill(date[0], 4) + '-'
					+ leftZeroFill(date[1] + 1, 2) + '-'
					+ leftZeroFill(date[2], 2) + '-'
					+ config._i
			}
		}
		if (utc)
			m = moment.utc(input, format, lang)
		else
			m = moment(input, format, lang)
		if (config._isValid === false)
			m._isValid = false
		m._hDiff = config._hDiff || 0
		hm = objectCreate(hMoment.fn)
		extend(hm, m)
		return hm
	}

	function hMoment(input, format, lang) {
		return makeMoment(input, format, lang, false)
	}

	extend(hMoment, moment)
	hMoment.fn = objectCreate(moment.fn)

	hMoment.utc = function (input, format, lang) {
		return makeMoment(input, format, lang, true)
	}

	/************************************
      hMoment Prototype
  ************************************/

	hMoment.fn.format = function (format) {
		var i, replace, me = this

		if (format) {
			i = 5
			replace = function (input) {
				return me.localeData().longDateFormat(input) || input
			}
			while (i > 0 && localFormattingTokens.test(format)) {
				i -= 1
				format = format.replace(localFormattingTokens, replace)
			}
			if (!formatFunctions[format]) {
				formatFunctions[format] = makeFormatFunction(format)
			}
			format = formatFunctions[format](this)
		}
		return moment.fn.format.call(this, format)
	}

	hMoment.fn.iYear = function (input) {
		var lastDay, h, g
		if (typeof input === 'number') {
			h = toHijri(this.year(), this.month(), this.date())
			lastDay = Math.min(h.hd, hMoment.iDaysInMonth(input, h.hm))
			g = toGregorian(input, h.hm, lastDay)
			setDate(this, g.gy, g.gm, g.gd)
			//Workaround: sometimes moment wont set the date correctly if current day is the last in the month
			if (this.month() !== g.gm || this.date() !== g.gd || this.year() !== g.gy) {
				setDate(this, g.gy, g.gm, g.gd)
			}
			moment.updateOffset(this)
			return this
		} else {
			return toHijri(this.year(), this.month(), this.date()).hy
		}
	}

	hMoment.fn.iMonth = function (input) {
		var lastDay, h, g
		if (input != null) {
			if (typeof input === 'string') {
				input = this.localeData().iMonthsParse(input)
				if(input >= 0) {
					input -= 1
				} else {
					return this
				}
			}
			h = toHijri(this.year(), this.month(), this.date())
			lastDay = Math.min(h.hd, hMoment.iDaysInMonth(h.hy, input))
			this.iYear(h.hy + div(input, 12))
			input = mod(input, 12)
			if (input < 0) {
				input += 12
				this.iYear(this.iYear() - 1)
			}
			g = toGregorian(this.iYear(), input, lastDay)
			setDate(this, g.gy, g.gm, g.gd)
			//Workaround: sometimes moment wont set the date correctly if current day is the last in the month
			if (this.month() !== g.gm || this.date() !== g.gd || this.year() !== g.gy) {
				setDate(this, g.gy, g.gm, g.gd)
			}
			moment.updateOffset(this)
			return this
		} else {
			return toHijri(this.year(), this.month(), this.date()).hm
		}
	}

	hMoment.fn.iDate = function (input) {
		var h, g
		if (typeof input === 'number') {
			h = toHijri(this.year(), this.month(), this.date())
			g = toGregorian(h.hy, h.hm, input)
			setDate(this, g.gy, g.gm, g.gd)
			//Workaround: sometimes moment wont set the date correctly if current day is the last in the month
			if (this.month() !== g.gm || this.date() !== g.gd || this.year() !== g.gy) {
				setDate(this, g.gy, g.gm, g.gd)
			}
			moment.updateOffset(this)
			return this
		} else {
			return toHijri(this.year(), this.month(), this.date()).hd
		}
	}

	hMoment.fn.iDayOfYear = function (input) {
		var dayOfYear = Math.round((hMoment(this).startOf('day') - hMoment(this).startOf('iYear')) / 864e5) + 1
		return input == null ? dayOfYear : this.add(input - dayOfYear, 'd')
	}

	hMoment.fn.iDaysInMonth = function () {
		return parseInt(hMoment(this).endOf('iMonth').format('iDD'));
	}

	hMoment.fn.iWeek = function (input) {
		var week = iWeekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).week
		return input == null ? week : this.add( (input - week) * 7, 'd')
	}

	hMoment.fn.iWeekYear = function (input) {
		var year = iWeekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year
		return input == null ? year : this.add(input - year, 'y')
	}

	hMoment.fn.add = function (val, units) {
		var temp
		if (units !== null && !isNaN(+units)) {
			temp = val
			val = units
			units = temp
		}
		units = normalizeUnits(units)
		if (units === 'iyear') {
			this.iYear(this.iYear() + val)
		} else if (units === 'imonth') {
			this.iMonth(this.iMonth() + val)
		} else if (units === 'idate') {
			this.iDate(this.iDate() + val)
		}
		 else {
			moment.fn.add.call(this, val, units)
		}
		return this
	}

	hMoment.fn.subtract = function (val, units) {
		var temp
		if (units !== null && !isNaN(+units)) {
			temp = val
			val = units
			units = temp
		}
		units = normalizeUnits(units)
		if (units === 'iyear') {
			this.iYear(this.iYear() - val)
		} else if (units === 'imonth') {
			this.iMonth(this.iMonth() - val)
		} else if (units === 'idate') {
			this.iDate(this.iDate() - val)
		} else {
			moment.fn.subtract.call(this, val, units)
		}
		return this
	}

	hMoment.fn.startOf = function (units) {
		units = normalizeUnits(units)
		if (units === 'iyear' || units === 'imonth') {
			if (units === 'iyear') {
				this.iMonth(0)
			}
			this.iDate(1)
			this.hours(0)
			this.minutes(0)
			this.seconds(0)
			this.milliseconds(0)
			return this
		} else {
			return moment.fn.startOf.call(this, units)
		}
	}

	hMoment.fn.endOf = function (units) {
		units = normalizeUnits(units)
		if (units === undefined || units === 'milisecond') {
			return this
		}
		return this.startOf(units).add(1, (units === 'isoweek' ? 'week' : units)).subtract(1, 'milliseconds')
	}

	hMoment.fn.clone = function () {
		return hMoment(this)
	}

	hMoment.fn.iYears = hMoment.fn.iYear
	hMoment.fn.iMonths = hMoment.fn.iMonth
	hMoment.fn.iDates = hMoment.fn.iDate
	hMoment.fn.iWeeks = hMoment.fn.iWeek

	/************************************
      hMoment Statics
  ************************************/

	hMoment.iDaysInMonth = function (year, month) {
		var i = getNewMoonMJDNIndex(year, month + 1),
			daysInMonth = ummalqura.ummalquraData[i] - ummalqura.ummalquraData[i - 1]
		return daysInMonth
	}

	function toHijri(gy, gm, gd) {
		var h = d2h(g2d(gy, gm + 1, gd))
		h.hm -= 1
		return h
	}

	function toGregorian(hy, hm, hd) {
		var g = d2g(h2d(hy, hm + 1, hd))
		g.gm -= 1
		return g
	}

	hMoment.iConvert = {
		toHijri: toHijri,
		toGregorian: toGregorian
	}

	return hMoment

	/************************************
      Hijri Conversion
  ************************************/

	/*
    Utility helper functions.
  */

	function div(a, b) {
		return~~ (a / b)
	}

	function mod(a, b) {
		return a - ~~(a / b) * b
	}

	/*
    Converts a date of the Hijri calendar to the Julian Day number.

    @param hy Hijri year (1356 to 1500)
    @param hm Hijri month (1 to 12)
    @param hd Hijri day (1 to 29/30)
    @return Julian Day number
  */

	function h2d(hy, hm, hd) {
		var i = getNewMoonMJDNIndex(hy, hm),
			mjdn = hd + ummalqura.ummalquraData[i - 1] - 1,
			jdn = mjdn + 2400000;
		return jdn
	}

	/*
    Converts the Julian Day number to a date in the Hijri calendar.

    @param jdn Julian Day number
    @return
      hy: Hijri year (1356 to 1500)
      hm: Hijri month (1 to 12)
      hd: Hijri day (1 to 29/30)
  */

	function d2h(jdn) {
		var mjdn = jdn - 2400000,
			i = getNewMoonMJDNIndexByJDN(mjdn),
			totalMonths = i + newMoonIndex,
			cYears = Math.floor((totalMonths - 1) / 12),
			hy = cYears + 1,
			hm = totalMonths - 12 * cYears,
			hd = mjdn - ummalqura.ummalquraData[i - 1] + 1

		return {
			hy: hy,
			hm: hm,
			hd: hd
		}
	}

	/*
    Calculates the Julian Day number from Gregorian or Julian
    calendar dates. This integer number corresponds to the noon of
    the date (i.e. 12 hours of Universal Time).
    The procedure was tested to be good since 1 March, -100100 (of both
    calendars) up to a few million years into the future.

    @param gy Calendar year (years BC numbered 0, -1, -2, ...)
    @param gm Calendar month (1 to 12)
    @param gd Calendar day of the month (1 to 28/29/30/31)
    @return Julian Day number
  */

	function g2d(gy, gm, gd) {
		var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408
		d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752
		return d
	}

	/*
    Calculates Gregorian and Julian calendar dates from the Julian Day number
    (hdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
    calendars) to some millions years ahead of the present.

    @param jdn Julian Day number
    @return
      gy: Calendar year (years BC numbered 0, -1, -2, ...)
      gm: Calendar month (1 to 12)
      gd: Calendar day of the month M (1 to 28/29/30/31)
  */

	function d2g(jdn) {
		var j, i, gd, gm, gy
		j = 4 * jdn + 139361631
		j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908
		i = div(mod(j, 1461), 4) * 5 + 308
		gd = div(mod(i, 153), 5) + 1
		gm = mod(div(i, 153), 12) + 1
		gy = div(j, 1461) - 100100 + div(8 - gm, 6)
		return {
			gy: gy,
			gm: gm,
			gd: gd
		}
	}

	/*
    Returns the index of the modified Julian day number of the new moon
    by the given year and month

    @param hy: Hijri year (1356 to 1500)
    @param hm: Hijri month (1 to 12)
    @return
        i: the index of the new moon in modified Julian day number.
  */
	function getNewMoonMJDNIndex(hy, hm) {
		var cYears = hy - 1,
			totalMonths = (cYears * 12) + 1 + (hm - 1),
			i = totalMonths - newMoonIndex
		return i
	}

	/*
    Returns the nearest new moon

    @param jdn Julian Day number
    @return
      i: the index of a modified Julian day number.
  */
	function getNewMoonMJDNIndexByJDN(mjdn) {
		for (var i = 0; i < ummalqura.ummalquraData.length; i=i+1) {
			if (ummalqura.ummalquraData[i] > mjdn)
				return i
		}
	}

});
