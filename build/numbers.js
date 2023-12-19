// Copyright (C) 2023 Bovination Productions, MIT License

import { WORDS } from "./words.js";
import { evalPossibleWords } from "./solver.js";

let fixedList = false;
export function getDateNumber() {
    const d = new Date();
    const year = d.getFullYear().toString();
    let month = (d.getMonth() + 1).toString();
    let date = d.getDate().toString();
    if (month.length === 1) {
        month = '0' + month;
    }
    if (date.length === 1) {
        date = '0' + date;
    }
    const d2 = Date.parse(`${ year }-${ month }-${ date }T04:00:00`);
    const d1 = Date.parse('2023-02-18T00:00:00');
    const numDaysSince = Math.floor((d2 - d1)/(1000.0 * 24 * 3600));
    return 20230218 + numDaysSince;
}

export function getYesterdaysWord() {
    const num = getWordNumber(getDateNumber() - 1);
    return WORDS[num];
}

export function getWordNumber(dateNumber) {
    if (devMode()) {
        return Math.floor(Math.random() * WORDS.length);
    } else {
        // bad starts at 2413
        const today = new Date();
        let origWordsLength = WORDS.length;
        let origPositionsLength = POSITIONS.length;
        // if (today.getMonth() === 3 && today.getDate() === 1) {
        if (today.getMonth() === 11 && today.getDate() === 17) {
            const yr = today.getFullYear() - 2024 + origWordsLength;
            if (!fixedList) {
                fixedList = true;
                WORDS.push('pwned', 'hygge', 'moops');
                POSITIONS.push(origWordsLength, origWordsLength + 1, origWordsLength + 2);
            } else {
                origWordsLength -= 2;
                origPositionsLength -= 2;
            }
            if (POSITIONS[yr] && WORDS[yr]) {
                return yr;
            }
        }
        const pos = POSITIONS[dateNumber % origPositionsLength];
        if (pos < origWordsLength) {
            return pos;
        }
        console.log(`Can't find position ${pos}, only have #{ WORDS.length } words`);
        // this cycles through the list sort of randomly but not really
        return ((dateNumber * 2 + 1) * 1793) % origWordsLength;
    }
}

export function devMode() {
    return (location.hostname === "localhost" || location.hostname === "127.0.0.1");// && Math.random() < 0.00000001;
}

export const POSITIONS = [787, 1732, 1385, 428, 1674, 2281, 931, 1154, 2108,
    891, 520, 1284, 1233, 839, 1787,
    1349, 897, 721, 656, 796, 1804, 2205, 1310, 833, 1781, 1661, 969, 1756, 3,
    2318, 1949, 1513, 1764, 1432, 886, 1424, 58, 1126, 1651, 2027, 442, 1005,
    64, 2277, 1941, 2263, 1235, 215, 351, 588, 2061, 1425, 1707, 1704, 1124,
    2287, 59, 117, 665, 1062, 1307, 1078, 687, 133, 2314, 1240, 1542, 1239, 224,
    1976, 908, 1216, 108, 2140, 986, 331, 592, 1074, 390, 445, 544, 760, 932,
    2190, 1190, 2409, 466, 834, 809, 1850, 1401, 297, 1409, 805, 292, 913, 2389,
    314, 1406, 1127, 788, 918, 829, 1460, 1602, 7, 2254, 77, 2392, 1610, 1267,
    955, 2340, 590, 1576, 1824, 432, 2059, 1920, 2009, 2099, 391, 1440, 968,
    483, 1748, 300, 1692, 1256, 1721, 2282, 706, 1193, 1996, 870, 813, 162, 228,
    1282, 1733, 2240, 2004, 953, 181, 217, 368, 1341, 1519, 505, 1953, 50, 755,
    1517, 820, 783, 528, 1676, 2121, 868, 885, 1152, 1326, 250, 1987, 1059,
    1419, 745, 784, 105, 793, 1176, 782, 2311, 2245, 1171, 1272, 54, 277, 541,
    1902, 178, 159, 1, 1220, 887, 1335, 620, 1417, 2283, 1811, 1682, 81, 456,
    319, 132, 675, 135, 1089, 1056, 106, 1538, 463, 1680, 209, 1003, 1402, 1404,
    1655, 681, 1868, 503, 1883, 768, 646, 1972, 500, 1541, 444, 1913, 1536,
    1325, 45, 726, 2371, 1182, 2376, 1048, 1932, 320, 679, 1204, 701, 1294,
    2118, 1065, 1444, 20, 1967, 582, 573, 1750, 973, 2202, 632, 417, 1573, 67,
    863, 737, 43, 412, 553, 652, 1571, 842, 281, 545, 2119, 2397, 355, 440,
    1360, 1843, 273, 1873, 2390, 1234, 549, 448, 2033, 650, 2385, 636, 744, 409,
    2215, 1776, 165, 1209, 1723, 555, 2191, 2285, 1340, 497, 689, 264, 1744,
    1380, 89, 1544, 1697, 972, 160, 1090, 1394, 2343, 1564, 255, 1013, 27, 619,
    1554, 1532, 126, 803, 2200, 24, 688, 749, 467, 85, 1318, 1694, 1408, 2329,
    1751, 1607, 1520, 194, 480, 254, 2330, 1560, 1526, 1070, 558, 2350, 1423,
    1927, 1683, 1407, 404, 229, 2367, 786, 1724, 1757, 948, 671, 1169, 2344,
    1474, 1555, 1997, 354, 468, 2165, 1019, 427, 565, 326, 818, 753, 2286, 1258,
    1893, 1986, 1355, 1427, 1184, 1752, 122, 169, 1791, 2164, 2181, 2244, 2048,
    1130, 807, 902, 1201, 1361, 2293, 2001, 678, 864, 996, 73, 925, 2120, 341,
    1275, 869, 2209, 1786, 172, 251, 1280, 472, 1488, 2203, 741, 2348, 584,
    2252, 551, 693, 459, 1495, 491, 2189, 1798, 55, 2243, 1141, 1765, 1228, 905,
    1128, 1082, 14, 1644, 2201, 36, 2032, 524, 450, 2046, 1327, 1421, 1222,
    2233, 904, 852, 674, 1808, 1832, 1316, 1478, 294, 1591, 1352, 1265, 552,
    1923, 776, 1403, 2223, 2026, 1762, 381, 183, 1502, 900, 794, 893, 1543,
    2049, 411, 1596, 484, 1763, 2360, 1722, 670, 2309, 2128, 2305, 1742, 1799,
    2249, 547, 1073, 241, 83, 2002, 1917, 540, 2145, 562, 1485, 958, 1000, 742,
    564, 954, 2141, 1577, 735, 987, 647, 1626, 2261, 1743, 405, 1219, 1363,
    2065, 1583, 728, 1696, 873, 1984, 604, 2322, 959, 2074, 1585, 1662, 1666,
    1122, 1058, 1834, 130, 1872, 41, 1115, 1496, 158, 49, 2236, 53, 2382, 1646,
    197, 1086, 452, 2301, 2317, 1709, 1774, 1434, 1289, 1797, 983, 151, 198,
    154, 1158, 1405, 1480, 1802, 2050, 225, 1839, 2273, 2183, 1172, 2369, 323,
    2185, 6, 1946, 2310, 2335, 426, 2007, 494, 369, 2036, 1698, 2226, 1598, 275,
    1004, 1734, 1833, 286, 1594, 1217, 268, 1347, 980, 443, 302, 2044, 830,
    2326, 1977, 1105, 649, 827, 134, 566, 1838, 245, 485, 94, 2265, 2393, 1860,
    714, 879, 2102, 1550, 1758, 149, 1575, 526, 1637, 2272, 945, 359, 639, 231,
    13, 919, 1726, 1788, 1870, 610, 1782, 752, 979, 2176, 560, 1099, 1885, 1943,
    88, 1101, 1333, 69, 2063, 700, 1393, 537, 1338, 1185, 1110, 465, 1448, 2135,
    661, 474, 1691, 2268, 137, 1259, 2386, 334, 482, 360, 176, 1173, 1377, 2084,
    141, 1702, 1153, 1268, 136, 1206, 516, 2170, 1188, 2237, 1236, 1247, 1040,
    2133, 917, 104, 271, 1739, 301, 1669, 274, 907, 994, 1356, 92, 150, 1905,
    1470, 335, 1679, 1175, 177, 447, 1858, 806, 1107, 1853, 352, 933, 1605,
    1027, 1699, 697, 1978, 10, 614, 1106, 375, 574, 1952, 1033, 1604, 1186,
    1761, 416, 2230, 393, 1007, 1918, 438, 187, 849, 1500, 1965, 2144, 1859,
    2092, 992, 684, 1170, 1522, 441, 865, 25, 1452, 2358, 1499, 347, 606, 2100,
    100, 1094, 285, 667, 878, 1681, 1309, 556, 2338, 70, 2297, 607, 731, 531,
    2172, 713, 2218, 82, 1312, 1492, 370, 1711, 550, 1018, 2129, 1299, 1322,
    963, 831, 1628, 2025, 2295, 1672, 1989, 1909, 719, 1373, 1486, 1295, 894,
    1668, 410, 664, 46, 2116, 1657, 2117, 371, 683, 1901, 2206, 961, 1306, 1457,
    2071, 218, 730, 758, 2304, 2231, 777, 1396, 379, 1904, 1998, 2395, 1840,
    1766, 1971, 93, 2319, 1597, 2015, 2123, 1371, 400, 1512, 2411, 80, 1664,
    1990, 1981, 272, 2315, 2136, 324, 2352, 1378, 1203, 1580, 91, 1467, 950,
    567, 1266, 2334, 1829, 1453, 981, 691, 1815, 1476, 222, 518, 765, 402, 1125,
    1055, 1549, 1111, 890, 279, 1677, 1047, 1827, 258, 534, 185, 1469, 835,
    1037, 492, 569, 1641, 1890, 1957, 1562, 1121, 1907, 1933, 1818, 1665, 2159,
    1772, 1286, 1441, 974, 781, 2193, 934, 1521, 2404, 1895, 856, 96, 608, 616,
    1008, 1906, 2005, 892, 395, 2154, 190, 1625, 1619, 1168, 720, 260, 660, 510,
    1146, 1202, 1161, 630, 1621, 2038, 2054, 1506, 121, 966, 1366, 1350, 1422,
    1010, 1767, 507, 31, 1581, 168, 1376, 586, 1113, 367, 103, 1770, 502, 66,
    1603, 219, 166, 860, 2270, 61, 1100, 1011, 2042, 1123, 2068, 923, 927, 1044,
    171, 5, 1149, 577, 648, 2020, 2043, 2023, 832, 97, 1755, 1710, 662, 29,
    2313, 1053, 2079, 1030, 1658, 2331, 1728, 876, 282, 2188, 1072, 1944, 1114,
    2066, 2035, 1359, 1057, 1612, 702, 57, 914, 139, 1963, 2410, 499, 1970, 127,
    2378, 2075, 15, 1880, 761, 2124, 2347, 1279, 2058, 2089, 280, 906, 1819,
    115, 2278, 1195, 1300, 595, 2403, 2072, 1888, 164, 634, 1712, 2207, 2224,
    204, 382, 422, 265, 211, 739, 44, 493, 1016, 1068, 659, 298, 657, 2407, 845,
    252, 1321, 1908, 1270, 581, 244, 2055, 1731, 857, 2106, 1740, 2097, 1548,
    2013, 1537, 1137, 512, 1395, 287, 9, 2379, 2028, 1009, 1643, 226, 538, 795,
    38, 498, 903, 182, 970, 2239, 554, 2394, 1255, 262, 1623, 522, 612, 1096,
    1238, 2197, 464, 1851, 240, 195, 589, 33, 668, 1497, 1390, 1845, 489, 1398,
    2126, 397, 2251, 1150, 2064, 496, 1207, 828, 398, 239, 332, 1618, 2372,
    2232, 1198, 143, 2320, 1848, 1381, 1348, 435, 2194, 591, 1849, 238, 848,
    597, 1429, 1950, 1252, 1336, 2151, 729, 1741, 2110, 909, 1456, 855, 299,
    1112, 2359, 2354, 175, 975, 2014, 1159, 533, 506, 2062, 113, 613, 872, 819,
    184, 128, 669, 2152, 338, 471, 2174, 234, 84, 1162, 1924, 2029, 236, 2096,
    1922, 1017, 101, 1785, 1558, 1438, 118, 2078, 922, 21, 199, 1237, 1572,
    1241, 1218, 756, 695, 2127, 723, 1210, 990, 2298, 140, 764, 2171, 698, 1397,
    1045, 976, 686, 2166, 1921, 1706, 988, 212, 2192, 1866, 1557, 1413, 1364,
    655, 515, 1841, 2391, 2368, 982, 1180, 2057, 708, 1263, 1928, 1988, 1025,
    1812, 321, 1835, 1760, 214, 2234, 1208, 1133, 2332, 1400, 2107, 110, 1249,
    263, 1889, 1985, 1034, 421, 284, 243, 572, 2363, 1449, 2373, 1212, 2316,
    2327, 517, 1418, 1994, 2323, 1042, 2375, 1092, 458, 30, 2178, 378, 1601,
    1615, 1777, 1820, 1962, 1514, 1465, 578, 261, 1713, 1529, 915, 1955, 2247,
    1293, 850, 288, 1088, 696, 1725, 2052, 580, 539, 1551, 1992, 408, 413, 1780,
    1412, 348, 1876, 138, 380, 643, 1882, 821, 2398, 1160, 826, 1136, 155, 1052,
    291, 997, 429, 2095, 120, 759, 1167, 329, 11, 356, 846, 2299, 1935, 1320,
    2280, 605, 2235, 1771, 377, 79, 862, 1650, 1831, 2208, 423, 1411, 495, 858,
    1415, 2321, 419, 2262, 2103, 1223, 310, 1445, 519, 2182, 293, 325, 1012,
    2076, 1391, 1450, 1104, 2085, 1382, 2122, 1281, 1630, 1283, 1178, 624, 570,
    789, 56, 2024, 800, 1227, 1093, 962, 2213, 425, 68, 1305, 2353, 2053, 1344,
    399, 1323, 1892, 1635, 1081, 1930, 40, 147, 1534, 985, 2087, 173, 322, 376,
    513, 313, 1035, 598, 1794, 1816, 880, 365, 333, 1642, 967, 2047, 2380, 838,
    535, 415, 430, 946, 774, 1608, 102, 1891, 1139, 2021, 680, 722, 357, 1916,
    2041, 51, 911, 1914, 1634, 2225, 2357, 1508, 1942, 509, 594, 2147, 2219,
    1041, 180, 2139, 640, 823, 1948, 896, 63, 364, 732, 1332, 1836, 2227, 8,
    815, 1701, 530, 1693, 2090, 952, 1852, 705, 1443, 317, 401, 170, 877, 1116,
    1292, 2067, 220, 2088, 2101, 1163, 2131, 889, 1384, 2149, 816, 1961, 898,
    940, 1616, 420, 2341, 1277, 1290, 1867, 383, 978, 2184, 716, 1461, 1108,
    623, 1353, 1884, 1001, 710, 431, 1846, 924, 711, 2229, 304, 1446, 1863,
    1613, 1874, 2155, 2228, 2143, 2012, 2370, 2212, 1109, 2351, 1148, 2328,
    1023, 1912, 1367, 1076, 403, 1703, 808, 791, 1768, 1627, 278, 1156, 1261,
    1343, 1966, 851, 223, 418, 1006, 929, 579, 1999, 1215, 144, 249, 1482, 1085,
    2150, 270, 767, 161, 394, 1462, 1690, 1269, 2349, 1313, 114, 1288, 205,
    2346, 921, 799, 1375, 1535, 1468, 1066, 1164, 207, 1654, 804, 202, 2279,
    763, 2377, 2400, 2169, 1685, 2130, 941, 1063, 1248, 2289, 1221, 1458, 339,
    766, 1118, 1821, 1365, 87, 1138, 462, 571, 1599, 703, 1050, 1783, 2294, 52,
    1837, 899, 2104, 775, 34, 1587, 2345, 283, 602, 1484, 1540, 2307, 1830, 311,
    611, 148, 847, 200, 1036, 1539, 2246, 751, 210, 1609, 523, 2134, 1021, 1368,
    1810, 362, 1437, 1959, 1589, 1271, 124, 1638, 736, 469, 1716, 1298, 2083,
    715, 1552, 575, 548, 62, 434, 1479, 1689, 1314, 694, 1862, 1250, 882, 2179,
    340, 1131, 191, 213, 587, 1675, 318, 125, 1775, 188, 991, 2216, 2196, 1328,
    1155, 615, 2387, 2292, 156, 949, 1708, 374, 1308, 2256, 1869, 1147, 1582,
    1784, 1511, 2039, 609, 1379, 645, 600, 2022, 470, 2325, 1530, 1979, 1324,
    1226, 446, 203, 1983, 16, 1956, 563, 727, 1945, 750, 2037, 690, 2250, 936,
    712, 971, 1243, 2168, 725, 1553, 90, 943, 1466, 1102, 1778, 1993, 867, 1246,
    1639, 1199, 2138, 1142, 1426, 1611, 457, 366, 995, 521, 2362, 2269, 350, 18,
    2094, 342, 2175, 1574, 1563, 1431, 1051, 109, 2177, 481, 1958, 1806, 601,
    508, 327, 511, 237, 37, 353, 1617, 1595, 1659, 1043, 1640, 475, 35, 1807,
    1847, 1331, 1369, 501, 1475, 1823, 303, 2204, 1600, 2081, 1527, 916, 1501,
    618, 186, 454, 1629, 757, 1143, 1214, 543, 1670, 792, 1064, 1649, 561, 1383,
    1877, 748, 1686, 2070, 2034, 1291, 65, 437, 230, 2383, 1951, 593, 330, 1165,
    1636, 939, 476, 145, 1103, 1075, 1896, 22, 2271, 998, 1060, 1796, 460, 1800,
    2045, 770, 699, 2186, 733, 1915, 1779, 48, 704, 123, 1330, 1342, 1969, 895,
    1968, 1197, 1002, 1974, 1735, 707, 1717, 1463, 2288, 642, 1566, 2361, 221,
    1524, 1592, 734, 1399, 26, 131, 163, 840, 676, 406, 1687, 1730, 1358, 1738,
    1795, 116, 1688, 947, 536, 747, 928, 2113, 1278, 392, 603, 771, 644, 951,
    1229, 1975, 824, 1900, 1370, 1442, 888, 2148, 844, 23, 627, 1435, 2242,
    1304, 1273, 259, 2306, 1494, 2312, 453, 2255, 2006, 1817, 153, 1606, 853,
    266, 71, 1828, 1079, 12, 778, 98, 1919, 2167, 32, 1181, 1471, 1673, 1177,
    822, 1718, 638, 2156, 1931, 673, 1039, 107, 308, 1098, 2342, 2221, 1049,
    1546, 631, 388, 1262, 2303, 396, 1183, 1067, 1455, 854, 1022, 167, 2173,
    1392, 486, 2003, 658, 1264, 1337, 1911, 1287, 738, 780, 529, 206, 874, 1515,
    478, 1481, 576, 1871, 1489, 2276, 1276, 129, 901, 1389, 762, 242, 2199,
    1523, 1937, 2241, 743, 937, 99, 373, 1991, 625, 2300, 1586, 1652, 1317,
    1087, 790, 328, 585, 192, 1656, 692, 76, 1729, 1120, 74, 1648, 641, 596,
    490, 1749, 1980, 276, 2011, 257, 1095, 1459, 1897, 1191, 1351, 2114, 1303,
    2337, 306, 2238, 2008, 1245, 1938, 1568, 1533, 2093, 2073, 4, 1015, 866,
    965, 920, 1939, 196, 1196, 1205, 1274, 1854, 1069, 1251, 253, 1134, 1940,
    1792, 1881, 1374, 2091, 2336, 1410, 1856, 2260, 1242, 152, 2374, 1509, 1531,
    439, 1132, 60, 651, 1077, 2217, 1296, 2195, 1903, 2220, 1844, 1135, 1014,
    1505, 1354, 1633, 1518, 157, 1719, 361, 2405, 345, 2017, 1805, 1083, 1556,
    532, 1678, 785, 628, 2364, 1420, 1769, 1545, 1472, 2401, 384, 999, 1024,
    1129, 599, 246, 1700, 1487, 1493, 2399, 984, 2396, 956, 385, 1144, 653, 309,
    2274, 964, 72, 2040, 1285, 387, 1954, 1388, 1936, 358, 2267, 2082, 1091,
    2259, 1947, 1297, 1119, 884, 1865, 1054, 542, 811, 1995, 1260, 315, 2098,
    1029, 635, 1790, 2198, 312, 1117, 1387, 2056, 142, 1525, 1973, 1032, 1864,
    883, 2153, 477, 1232, 1736, 1569, 942, 1773, 814, 1436, 769, 1151, 2258,
    1084, 179, 1747, 75, 2284, 1386, 1593, 1663, 1346, 2109, 2112, 2180, 461,
    296, 28, 1145, 1878, 372, 938, 2080, 1667, 881, 233, 487, 843, 1439, 1547,
    336, 1224, 666, 1028, 718, 1477, 1166, 1503, 2157, 2275, 837, 1822, 455,
    2356, 989, 583, 1745, 2406, 2000, 2266, 1934, 2308, 1430, 2333, 1803, 2163,
    1244, 1813, 1507, 289, 2146, 407, 1964, 2077, 677, 772, 343, 2366, 1875,
    1653, 2086, 812, 111, 2264, 568, 193, 801, 174, 247, 672, 1561, 1578, 935,
    1620, 1855, 1428, 912, 1614, 1046, 1372, 95, 1433, 2365, 1695, 2031, 626,
    1631, 1510, 802, 654, 1660, 414, 295, 1194, 1929, 629, 1257, 637, 1213, 337,
    930, 746, 1311, 235, 1528, 1031, 1814, 267, 1414, 146, 1570, 1565, 1925,
    1080, 436, 1253, 621, 1825, 859, 2160, 2339, 926, 2137, 227, 2222, 1879,
    546, 1982, 1345, 1645, 2125, 685, 871, 779, 1189, 42, 1315, 1061, 290, 1559,
    2324, 1632, 1727, 1192, 1826, 201, 2302, 1301, 17, 2115, 910, 663, 2290,
    2158, 2132, 389, 1187, 841, 2018, 1038, 1498, 2253, 709, 2408, 2019, 305,
    798, 2248, 1362, 1200, 1590, 1960, 1567, 1416, 216, 349, 2211, 1490, 1516,
    1020, 1887, 2402, 1684, 861, 1584, 525, 1579, 1097, 2388, 2030, 740, 189,
    2016, 724, 1588, 1705, 1714, 0, 1483, 2111, 622, 2210, 1231, 2187, 1861,
    1910, 1894, 1334, 1899, 2069, 1842, 1715, 208, 797, 836, 1671, 488, 2381,
    514, 449, 232, 1624, 504, 2384, 2412, 346, 363, 1801, 1071, 47, 1857, 1157,
    1746, 875, 256, 1473, 1211, 86, 19, 1254, 2257, 1789, 1898, 1454, 1491,
    1447, 2296, 557, 1451, 1793, 977, 269, 1647, 1329, 1179, 1754, 1225, 451,
    307, 1720, 386, 2291, 2142, 2162, 773, 316, 825, 1737, 1504, 1140, 633, 944,
    2060, 754, 682, 433, 617, 344, 1622, 479, 2, 473, 1753, 1230, 2214, 810, 39,
    1026, 2161, 960, 957, 817, 2051, 78, 559, 1319, 1357, 2355, 1809, 119, 1926,
    2010, 1339, 717, 1759, 1886, 2105, 527, 112, 424, 993, 248, 1464, 1174,
    1302];