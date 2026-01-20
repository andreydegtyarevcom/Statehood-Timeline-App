import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Calendar, Globe2, Filter, ArrowUpDown } from 'lucide-react';

// Import data inline
const COUNTRIES_DATA = [{"name":"Egypt","root":{"year":-3100,"label":"Early Dynastic Period"},"branches":[{"label":"Early Dynastic","start":-3100,"end":-2686,"type":"kingdom"},{"label":"Old Kingdom","start":-2686,"end":-2181,"type":"kingdom"},{"label":"New Kingdom","start":-1550,"end":-1077,"type":"kingdom"},{"label":"Ptolemaic","start":-305,"end":-30,"type":"kingdom"},{"label":"Roman/Byzantine","start":-30,"end":641,"type":"colonial"},{"label":"Islamic Caliphates","start":641,"end":1517,"type":"caliphate"},{"label":"Ottoman","start":1517,"end":1867,"type":"colonial"},{"label":"Kingdom","start":1922,"end":1953,"type":"kingdom"},{"label":"Republic","start":1953,"end":null,"type":"republic"}]},{"name":"Iraq","root":{"year":-3000,"label":"Sumerian City-States"},"branches":[{"label":"Sumer","start":-3000,"end":-2000,"type":"civilization"},{"label":"Akkadian Empire","start":-2334,"end":-2154,"type":"empire"},{"label":"Babylonian Empire","start":-1894,"end":-539,"type":"empire"},{"label":"Islamic Caliphates","start":637,"end":1258,"type":"caliphate"},{"label":"Ottoman","start":1534,"end":1920,"type":"colonial"},{"label":"Kingdom","start":1932,"end":1958,"type":"kingdom"},{"label":"Republic","start":1958,"end":null,"type":"republic"}]},{"name":"India","root":{"year":-2600,"label":"Indus Valley Civilization"},"branches":[{"label":"Indus Valley","start":-2600,"end":-1900,"type":"civilization"},{"label":"Maurya Empire","start":-322,"end":-185,"type":"empire"},{"label":"Mughal Empire","start":1526,"end":1857,"type":"empire"},{"label":"British Raj","start":1858,"end":1947,"type":"colonial"},{"label":"Republic","start":1947,"end":null,"type":"republic"}]},{"name":"China","root":{"year":-2070,"label":"Xia Dynasty"},"branches":[{"label":"Xia Dynasty","start":-2070,"end":-1600,"type":"kingdom"},{"label":"Shang Dynasty","start":-1600,"end":-1046,"type":"kingdom"},{"label":"Qin Dynasty","start":-221,"end":-206,"type":"empire"},{"label":"Han Dynasty","start":-206,"end":220,"type":"empire"},{"label":"Tang Dynasty","start":618,"end":907,"type":"empire"},{"label":"Ming Dynasty","start":1368,"end":1644,"type":"empire"},{"label":"Qing Dynasty","start":1644,"end":1912,"type":"empire"},{"label":"PRC","start":1949,"end":null,"type":"republic"}]},{"name":"Greece","root":{"year":-2000,"label":"Minoan Civilization"},"branches":[{"label":"Minoan","start":-2000,"end":-1450,"type":"civilization"},{"label":"Mycenaean","start":-1600,"end":-1100,"type":"civilization"},{"label":"Classical City-States","start":-800,"end":-338,"type":"statehood"},{"label":"Byzantine Empire","start":330,"end":1453,"type":"empire"},{"label":"Ottoman","start":1453,"end":1821,"type":"colonial"},{"label":"Kingdom","start":1832,"end":1974,"type":"kingdom"},{"label":"Republic","start":1974,"end":null,"type":"republic"}]},{"name":"Iran","root":{"year":-2000,"label":"Elamite Civilization"},"branches":[{"label":"Elamite","start":-2000,"end":-550,"type":"kingdom"},{"label":"Achaemenid Empire","start":-550,"end":-330,"type":"empire"},{"label":"Sassanid Empire","start":224,"end":651,"type":"empire"},{"label":"Safavid Dynasty","start":1501,"end":1736,"type":"empire"},{"label":"Pahlavi Dynasty","start":1925,"end":1979,"type":"kingdom"},{"label":"Islamic Republic","start":1979,"end":null,"type":"republic"}]},{"name":"Syria","root":{"year":-2000,"label":"Ebla Kingdom"},"branches":[{"label":"Ancient Syrian Kingdoms","start":-2000,"end":-1200,"type":"kingdom"},{"label":"Islamic Caliphates","start":636,"end":1516,"type":"caliphate"},{"label":"Ottoman","start":1516,"end":1918,"type":"colonial"},{"label":"French Mandate","start":1920,"end":1946,"type":"colonial"},{"label":"Republic","start":1946,"end":null,"type":"republic"}]},{"name":"Lebanon","root":{"year":-1800,"label":"Phoenician City-States"},"branches":[{"label":"Phoenician","start":-1800,"end":-539,"type":"statehood"},{"label":"Ottoman","start":1516,"end":1918,"type":"colonial"},{"label":"French Mandate","start":1920,"end":1943,"type":"colonial"},{"label":"Republic","start":1943,"end":null,"type":"republic"}]},{"name":"Turkey","root":{"year":-1700,"label":"Hittite Empire"},"branches":[{"label":"Hittite Empire","start":-1700,"end":-1180,"type":"empire"},{"label":"Byzantine Empire","start":330,"end":1453,"type":"empire"},{"label":"Ottoman Empire","start":1299,"end":1922,"type":"empire"},{"label":"Republic","start":1923,"end":null,"type":"republic"}]},{"name":"Ethiopia","root":{"year":-1000,"label":"Kingdom of D'mt"},"branches":[{"label":"D'mt","start":-1000,"end":-400,"type":"kingdom"},{"label":"Aksum","start":-100,"end":940,"type":"kingdom"},{"label":"Ethiopian Empire","start":1270,"end":1974,"type":"empire"},{"label":"Federal Republic","start":1995,"end":null,"type":"republic"}]},{"name":"Israel","root":{"year":-1000,"label":"United Kingdom of Israel"},"branches":[{"label":"United Kingdom","start":-1000,"end":-930,"type":"kingdom"},{"label":"Kingdom of Judah","start":-930,"end":-586,"type":"kingdom"},{"label":"Ottoman","start":1517,"end":1917,"type":"colonial"},{"label":"British Mandate","start":1920,"end":1948,"type":"colonial"},{"label":"State of Israel","start":1948,"end":null,"type":"republic"}]},{"name":"Armenia","root":{"year":-860,"label":"Kingdom of Urartu"},"branches":[{"label":"Urartu","start":-860,"end":-590,"type":"kingdom"},{"label":"Kingdom of Armenia","start":-331,"end":428,"type":"kingdom"},{"label":"Bagratid Armenia","start":885,"end":1045,"type":"kingdom"},{"label":"Soviet Armenia","start":1920,"end":1991,"type":"republic"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Georgia","root":{"year":-700,"label":"Kingdom of Colchis"},"branches":[{"label":"Colchis","start":-700,"end":-164,"type":"kingdom"},{"label":"Kingdom of Georgia","start":1008,"end":1490,"type":"kingdom"},{"label":"Soviet Georgia","start":1921,"end":1991,"type":"republic"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Japan","root":{"year":-660,"label":"Foundation (legendary)"},"branches":[{"label":"Yamato Period","start":-660,"end":710,"type":"kingdom"},{"label":"Heian Period","start":794,"end":1185,"type":"empire"},{"label":"Edo Period","start":1603,"end":1868,"type":"shogunate"},{"label":"Empire","start":1868,"end":1947,"type":"empire"},{"label":"Constitutional Monarchy","start":1947,"end":null,"type":"monarchy"}]},{"name":"Italy","root":{"year":-753,"label":"Foundation of Rome"},"branches":[{"label":"Roman Kingdom","start":-753,"end":-509,"type":"kingdom"},{"label":"Roman Republic","start":-509,"end":-27,"type":"republic"},{"label":"Roman Empire","start":-27,"end":476,"type":"empire"},{"label":"Medieval States","start":476,"end":1861,"type":"statehood"},{"label":"Kingdom","start":1861,"end":1946,"type":"kingdom"},{"label":"Republic","start":1946,"end":null,"type":"republic"}]},{"name":"Yemen","root":{"year":-1000,"label":"Sabaean Kingdom"},"branches":[{"label":"Sabaean","start":-1000,"end":275,"type":"kingdom"},{"label":"Himyarite","start":110,"end":525,"type":"kingdom"},{"label":"Ottoman","start":1517,"end":1918,"type":"colonial"},{"label":"Kingdom","start":1918,"end":1962,"type":"kingdom"},{"label":"Republic","start":1990,"end":null,"type":"republic"}]},{"name":"North Macedonia","root":{"year":-808,"label":"Kingdom of Macedon"},"branches":[{"label":"Macedon","start":-808,"end":-168,"type":"kingdom"},{"label":"Ottoman","start":1371,"end":1912,"type":"colonial"},{"label":"Yugoslavia","start":1912,"end":1991,"type":"kingdom"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Sri Lanka","root":{"year":-543,"label":"Kingdom of Tambapanni"},"branches":[{"label":"Anuradhapura","start":-377,"end":1017,"type":"kingdom"},{"label":"Kandyan Kingdom","start":1469,"end":1815,"type":"kingdom"},{"label":"British Ceylon","start":1815,"end":1948,"type":"colonial"},{"label":"Republic","start":1972,"end":null,"type":"republic"}]},{"name":"San Marino","root":{"year":301,"label":"Foundation"},"branches":[{"label":"Republic","start":301,"end":null,"type":"republic"}]},{"name":"Denmark","root":{"year":700,"label":"Danish Kingdom"},"branches":[{"label":"Kingdom","start":700,"end":null,"type":"kingdom"}]},{"name":"Sudan","root":{"year":700,"label":"Kingdom of Makuria"},"branches":[{"label":"Makuria","start":700,"end":1504,"type":"kingdom"},{"label":"Funj Sultanate","start":1504,"end":1821,"type":"sultanate"},{"label":"Anglo-Egyptian","start":1899,"end":1956,"type":"colonial"},{"label":"Republic","start":1956,"end":null,"type":"republic"}]},{"name":"Bulgaria","root":{"year":681,"label":"First Bulgarian Empire"},"branches":[{"label":"First Empire","start":681,"end":1018,"type":"empire"},{"label":"Second Empire","start":1185,"end":1396,"type":"empire"},{"label":"Ottoman","start":1396,"end":1878,"type":"colonial"},{"label":"Kingdom","start":1908,"end":1946,"type":"kingdom"},{"label":"Republic","start":1990,"end":null,"type":"republic"}]},{"name":"Ghana","root":{"year":750,"label":"Ghana Empire"},"branches":[{"label":"Ghana Empire","start":750,"end":1076,"type":"empire"},{"label":"Ashanti Empire","start":1670,"end":1902,"type":"empire"},{"label":"British Gold Coast","start":1867,"end":1957,"type":"colonial"},{"label":"Republic","start":1957,"end":null,"type":"republic"}]},{"name":"Oman","root":{"year":751,"label":"Imamate of Oman"},"branches":[{"label":"Imamate","start":751,"end":1406,"type":"imamate"},{"label":"Al Said Dynasty","start":1744,"end":1970,"type":"sultanate"},{"label":"Sultanate","start":1970,"end":null,"type":"sultanate"}]},{"name":"Serbia","root":{"year":768,"label":"Serbian Principality"},"branches":[{"label":"Principality","start":768,"end":1217,"type":"principality"},{"label":"Kingdom","start":1217,"end":1346,"type":"kingdom"},{"label":"Serbian Empire","start":1346,"end":1371,"type":"empire"},{"label":"Ottoman","start":1459,"end":1878,"type":"colonial"},{"label":"Yugoslavia","start":1918,"end":1992,"type":"kingdom"},{"label":"Republic","start":2006,"end":null,"type":"republic"}]},{"name":"Morocco","root":{"year":789,"label":"Idrisid Dynasty"},"branches":[{"label":"Idrisid","start":789,"end":974,"type":"dynasty"},{"label":"Almoravid","start":1040,"end":1147,"type":"dynasty"},{"label":"Alaouite Dynasty","start":1631,"end":1912,"type":"dynasty"},{"label":"Protectorate","start":1912,"end":1956,"type":"colonial"},{"label":"Kingdom","start":1956,"end":null,"type":"kingdom"}]},{"name":"Cambodia","root":{"year":802,"label":"Khmer Empire"},"branches":[{"label":"Khmer Empire","start":802,"end":1431,"type":"empire"},{"label":"Middle Period","start":1431,"end":1863,"type":"kingdom"},{"label":"French","start":1863,"end":1953,"type":"colonial"},{"label":"Kingdom","start":1993,"end":null,"type":"kingdom"}]},{"name":"France","root":{"year":843,"label":"West Francia"},"branches":[{"label":"West Francia","start":843,"end":987,"type":"kingdom"},{"label":"Kingdom","start":987,"end":1792,"type":"kingdom"},{"label":"First Republic","start":1792,"end":1804,"type":"republic"},{"label":"First Empire","start":1804,"end":1814,"type":"empire"},{"label":"Fifth Republic","start":1958,"end":null,"type":"republic"}]},{"name":"Germany","root":{"year":843,"label":"East Francia"},"branches":[{"label":"East Francia","start":843,"end":962,"type":"kingdom"},{"label":"Holy Roman Empire","start":962,"end":1806,"type":"empire"},{"label":"German Empire","start":1871,"end":1918,"type":"empire"},{"label":"Nazi Germany","start":1933,"end":1945,"type":"dictatorship"},{"label":"Federal Republic","start":1990,"end":null,"type":"republic"}]},{"name":"Myanmar","root":{"year":849,"label":"Pagan Kingdom"},"branches":[{"label":"Pagan","start":849,"end":1287,"type":"kingdom"},{"label":"Konbaung Dynasty","start":1752,"end":1885,"type":"dynasty"},{"label":"British Burma","start":1885,"end":1948,"type":"colonial"},{"label":"Myanmar","start":1989,"end":null,"type":"republic"}]},{"name":"Russia","root":{"year":862,"label":"Kievan Rus'"},"branches":[{"label":"Kievan Rus'","start":862,"end":1240,"type":"principality"},{"label":"Grand Duchy Moscow","start":1283,"end":1547,"type":"principality"},{"label":"Tsardom","start":1547,"end":1721,"type":"tsardom"},{"label":"Empire","start":1721,"end":1917,"type":"empire"},{"label":"Soviet Union","start":1922,"end":1991,"type":"union"},{"label":"Federation","start":1991,"end":null,"type":"federation"}]},{"name":"Ukraine","root":{"year":862,"label":"Kievan Rus'"},"branches":[{"label":"Kievan Rus'","start":862,"end":1240,"type":"principality"},{"label":"Cossack Hetmanate","start":1648,"end":1764,"type":"hetmanate"},{"label":"Ukrainian SSR","start":1922,"end":1991,"type":"republic"},{"label":"Ukraine","start":1991,"end":null,"type":"republic"}]},{"name":"Belarus","root":{"year":862,"label":"Kievan Rus'"},"branches":[{"label":"Kievan Rus'","start":862,"end":1240,"type":"principality"},{"label":"Grand Duchy Lithuania","start":1236,"end":1569,"type":"duchy"},{"label":"Byelorussian SSR","start":1919,"end":1991,"type":"republic"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Portugal","root":{"year":868,"label":"County of Portugal"},"branches":[{"label":"County","start":868,"end":1139,"type":"county"},{"label":"Kingdom","start":1139,"end":1910,"type":"kingdom"},{"label":"First Republic","start":1910,"end":1926,"type":"republic"},{"label":"Republic","start":1974,"end":null,"type":"republic"}]},{"name":"Czech Republic","root":{"year":870,"label":"Great Moravia"},"branches":[{"label":"Great Moravia","start":870,"end":907,"type":"principality"},{"label":"Kingdom of Bohemia","start":1198,"end":1918,"type":"kingdom"},{"label":"Czechoslovakia","start":1918,"end":1993,"type":"republic"},{"label":"Czech Republic","start":1993,"end":null,"type":"republic"}]},{"name":"Slovakia","root":{"year":870,"label":"Great Moravia"},"branches":[{"label":"Great Moravia","start":870,"end":907,"type":"principality"},{"label":"Kingdom of Hungary","start":1000,"end":1918,"type":"kingdom"},{"label":"Czechoslovakia","start":1918,"end":1993,"type":"republic"},{"label":"Slovak Republic","start":1993,"end":null,"type":"republic"}]},{"name":"Norway","root":{"year":872,"label":"Kingdom unified"},"branches":[{"label":"Kingdom","start":872,"end":1397,"type":"kingdom"},{"label":"Denmark-Norway","start":1523,"end":1814,"type":"union"},{"label":"Union with Sweden","start":1814,"end":1905,"type":"union"},{"label":"Kingdom","start":1905,"end":null,"type":"kingdom"}]},{"name":"Hungary","root":{"year":895,"label":"Hungarian Conquest"},"branches":[{"label":"Principality","start":895,"end":1000,"type":"principality"},{"label":"Kingdom","start":1000,"end":1526,"type":"kingdom"},{"label":"Austria-Hungary","start":1867,"end":1918,"type":"empire"},{"label":"People's Republic","start":1949,"end":1989,"type":"republic"},{"label":"Republic","start":1989,"end":null,"type":"republic"}]},{"name":"England","root":{"year":927,"label":"Kingdom unified"},"branches":[{"label":"Kingdom of England","start":927,"end":1707,"type":"kingdom"},{"label":"Great Britain","start":1707,"end":1801,"type":"kingdom"},{"label":"United Kingdom","start":1801,"end":null,"type":"kingdom"}]},{"name":"United Kingdom","root":{"year":927,"label":"Kingdom of England"},"branches":[{"label":"England","start":927,"end":1707,"type":"kingdom"},{"label":"Great Britain","start":1707,"end":1801,"type":"kingdom"},{"label":"United Kingdom","start":1801,"end":null,"type":"kingdom"}]},{"name":"Iceland","root":{"year":930,"label":"Icelandic Commonwealth"},"branches":[{"label":"Commonwealth","start":930,"end":1262,"type":"commonwealth"},{"label":"Danish Iceland","start":1523,"end":1944,"type":"colonial"},{"label":"Republic","start":1944,"end":null,"type":"republic"}]},{"name":"Vietnam","root":{"year":938,"label":"Independence from China"},"branches":[{"label":"Lý Dynasty","start":1009,"end":1225,"type":"dynasty"},{"label":"Nguyễn Dynasty","start":1802,"end":1945,"type":"dynasty"},{"label":"French Indochina","start":1887,"end":1954,"type":"colonial"},{"label":"Socialist Republic","start":1976,"end":null,"type":"republic"}]},{"name":"Luxembourg","root":{"year":963,"label":"County"},"branches":[{"label":"County","start":963,"end":1354,"type":"county"},{"label":"Duchy","start":1354,"end":1795,"type":"duchy"},{"label":"Grand Duchy","start":1815,"end":null,"type":"duchy"}]},{"name":"Poland","root":{"year":966,"label":"Baptism of Poland"},"branches":[{"label":"Kingdom","start":966,"end":1569,"type":"kingdom"},{"label":"Commonwealth","start":1569,"end":1795,"type":"union"},{"label":"Partitions","start":1795,"end":1918,"type":"colonial"},{"label":"Second Republic","start":1918,"end":1939,"type":"republic"},{"label":"Third Republic","start":1989,"end":null,"type":"republic"}]},{"name":"Sweden","root":{"year":970,"label":"Kingdom"},"branches":[{"label":"Kingdom","start":970,"end":1397,"type":"kingdom"},{"label":"Kalmar Union","start":1397,"end":1523,"type":"union"},{"label":"Kingdom","start":1523,"end":null,"type":"kingdom"}]},{"name":"Tanzania","root":{"year":975,"label":"Kilwa Sultanate"},"branches":[{"label":"Kilwa","start":975,"end":1513,"type":"sultanate"},{"label":"Omani Zanzibar","start":1698,"end":1890,"type":"sultanate"},{"label":"German East Africa","start":1885,"end":1918,"type":"colonial"},{"label":"British","start":1918,"end":1961,"type":"colonial"},{"label":"United Republic","start":1964,"end":null,"type":"republic"}]},{"name":"Austria","root":{"year":976,"label":"Margraviate"},"branches":[{"label":"Margraviate","start":976,"end":1156,"type":"margraviate"},{"label":"Austrian Empire","start":1804,"end":1867,"type":"empire"},{"label":"Austria-Hungary","start":1867,"end":1918,"type":"empire"},{"label":"Second Republic","start":1955,"end":null,"type":"republic"}]},{"name":"Nigeria","root":{"year":1000,"label":"Kanem-Bornu Empire"},"branches":[{"label":"Kanem-Bornu","start":1000,"end":1893,"type":"empire"},{"label":"British Nigeria","start":1861,"end":1960,"type":"colonial"},{"label":"Federal Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Somalia","root":{"year":1000,"label":"Somali Sultanates"},"branches":[{"label":"Adal Sultanate","start":1415,"end":1577,"type":"sultanate"},{"label":"Italian/British","start":1884,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Lithuania","root":{"year":1009,"label":"First mention"},"branches":[{"label":"Grand Duchy","start":1236,"end":1569,"type":"duchy"},{"label":"Commonwealth","start":1569,"end":1795,"type":"union"},{"label":"Lithuanian SSR","start":1940,"end":1990,"type":"republic"},{"label":"Republic","start":1990,"end":null,"type":"republic"}]},{"name":"Montenegro","root":{"year":1042,"label":"Principality of Duklja"},"branches":[{"label":"Duklja","start":1042,"end":1186,"type":"principality"},{"label":"Kingdom","start":1910,"end":1918,"type":"kingdom"},{"label":"Yugoslavia","start":1918,"end":2006,"type":"kingdom"},{"label":"Montenegro","start":2006,"end":null,"type":"republic"}]},{"name":"Rwanda","root":{"year":1081,"label":"Kingdom"},"branches":[{"label":"Kingdom","start":1081,"end":1894,"type":"kingdom"},{"label":"German/Belgian","start":1894,"end":1962,"type":"colonial"},{"label":"Republic","start":1962,"end":null,"type":"republic"}]},{"name":"Maldives","root":{"year":1153,"label":"Sultanate"},"branches":[{"label":"Sultanate","start":1153,"end":1965,"type":"sultanate"},{"label":"Republic","start":1965,"end":null,"type":"republic"}]},{"name":"Bosnia and Herzegovina","root":{"year":1154,"label":"Banate"},"branches":[{"label":"Banate","start":1154,"end":1377,"type":"banate"},{"label":"Kingdom","start":1377,"end":1463,"type":"kingdom"},{"label":"Ottoman","start":1463,"end":1878,"type":"colonial"},{"label":"Republic","start":1992,"end":null,"type":"republic"}]},{"name":"Ireland","root":{"year":1171,"label":"Lordship"},"branches":[{"label":"Lordship","start":1171,"end":1542,"type":"lordship"},{"label":"Kingdom","start":1542,"end":1801,"type":"kingdom"},{"label":"United Kingdom","start":1801,"end":1922,"type":"union"},{"label":"Irish Free State","start":1922,"end":1937,"type":"dominion"},{"label":"Republic","start":1937,"end":null,"type":"republic"}]},{"name":"Albania","root":{"year":1190,"label":"Principality of Arbanon"},"branches":[{"label":"Arbanon","start":1190,"end":1255,"type":"principality"},{"label":"Ottoman","start":1479,"end":1912,"type":"colonial"},{"label":"Republic","start":1992,"end":null,"type":"republic"}]},{"name":"Cyprus","root":{"year":1192,"label":"Kingdom"},"branches":[{"label":"Kingdom","start":1192,"end":1489,"type":"kingdom"},{"label":"Ottoman","start":1571,"end":1878,"type":"colonial"},{"label":"British","start":1878,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Latvia","root":{"year":1201,"label":"Livonian Confederation"},"branches":[{"label":"Livonian","start":1201,"end":1561,"type":"confederation"},{"label":"Russian Empire","start":1721,"end":1918,"type":"colonial"},{"label":"Latvian SSR","start":1940,"end":1991,"type":"republic"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Estonia","root":{"year":1219,"label":"Danish Estonia"},"branches":[{"label":"Danish","start":1219,"end":1346,"type":"colonial"},{"label":"Swedish","start":1561,"end":1721,"type":"colonial"},{"label":"Russian Empire","start":1721,"end":1918,"type":"colonial"},{"label":"Estonian SSR","start":1940,"end":1991,"type":"republic"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Zimbabwe","root":{"year":1220,"label":"Kingdom of Zimbabwe"},"branches":[{"label":"Kingdom","start":1220,"end":1450,"type":"kingdom"},{"label":"Mutapa Empire","start":1430,"end":1760,"type":"empire"},{"label":"British Rhodesia","start":1890,"end":1965,"type":"colonial"},{"label":"Republic","start":1980,"end":null,"type":"republic"}]},{"name":"Mali","root":{"year":1230,"label":"Mali Empire"},"branches":[{"label":"Mali Empire","start":1230,"end":1670,"type":"empire"},{"label":"French Sudan","start":1880,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Thailand","root":{"year":1238,"label":"Sukhothai Kingdom"},"branches":[{"label":"Sukhothai","start":1238,"end":1438,"type":"kingdom"},{"label":"Ayutthaya","start":1351,"end":1767,"type":"kingdom"},{"label":"Rattanakosin","start":1782,"end":null,"type":"kingdom"}]},{"name":"Andorra","root":{"year":1278,"label":"Paréage"},"branches":[{"label":"Co-Principality","start":1278,"end":null,"type":"principality"}]},{"name":"Switzerland","root":{"year":1291,"label":"Old Swiss Confederacy"},"branches":[{"label":"Old Confederacy","start":1291,"end":1798,"type":"confederation"},{"label":"Swiss Confederation","start":1848,"end":null,"type":"confederation"}]},{"name":"Indonesia","root":{"year":1293,"label":"Majapahit Empire"},"branches":[{"label":"Majapahit","start":1293,"end":1527,"type":"empire"},{"label":"Dutch East Indies","start":1800,"end":1942,"type":"colonial"},{"label":"Republic","start":1945,"end":null,"type":"republic"}]},{"name":"Monaco","root":{"year":1297,"label":"House of Grimaldi"},"branches":[{"label":"Lordship","start":1297,"end":1612,"type":"lordship"},{"label":"Principality","start":1612,"end":null,"type":"principality"}]},{"name":"Uganda","root":{"year":1300,"label":"Kingdom of Buganda"},"branches":[{"label":"Buganda","start":1300,"end":1894,"type":"kingdom"},{"label":"British","start":1894,"end":1962,"type":"colonial"},{"label":"Republic","start":1962,"end":null,"type":"republic"}]},{"name":"Finland","root":{"year":1323,"label":"Treaty of Nöteborg"},"branches":[{"label":"Swedish Finland","start":1323,"end":1809,"type":"colonial"},{"label":"Grand Duchy","start":1809,"end":1917,"type":"duchy"},{"label":"Republic","start":1917,"end":null,"type":"republic"}]},{"name":"Romania","root":{"year":1330,"label":"Principality of Wallachia"},"branches":[{"label":"Wallachia","start":1330,"end":1859,"type":"principality"},{"label":"United Principalities","start":1859,"end":1881,"type":"principality"},{"label":"Kingdom","start":1881,"end":1947,"type":"kingdom"},{"label":"Romania","start":1989,"end":null,"type":"republic"}]},{"name":"Senegal","root":{"year":1350,"label":"Jolof Empire"},"branches":[{"label":"Jolof Empire","start":1350,"end":1549,"type":"empire"},{"label":"French Senegal","start":1850,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Laos","root":{"year":1353,"label":"Lan Xang Kingdom"},"branches":[{"label":"Lan Xang","start":1353,"end":1707,"type":"kingdom"},{"label":"French","start":1893,"end":1953,"type":"colonial"},{"label":"Kingdom","start":1953,"end":1975,"type":"kingdom"},{"label":"PDR","start":1975,"end":null,"type":"republic"}]},{"name":"Brunei","root":{"year":1368,"label":"Sultanate"},"branches":[{"label":"Sultanate","start":1368,"end":1888,"type":"sultanate"},{"label":"British Protectorate","start":1888,"end":1984,"type":"protectorate"},{"label":"Brunei Darussalam","start":1984,"end":null,"type":"sultanate"}]},{"name":"Moldova","root":{"year":1359,"label":"Principality of Moldavia"},"branches":[{"label":"Moldavia","start":1359,"end":1859,"type":"principality"},{"label":"Moldavian SSR","start":1940,"end":1991,"type":"republic"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Angola","root":{"year":1390,"label":"Kingdom of Ndongo"},"branches":[{"label":"Ndongo","start":1390,"end":1671,"type":"kingdom"},{"label":"Portuguese","start":1575,"end":1975,"type":"colonial"},{"label":"People's Republic","start":1975,"end":null,"type":"republic"}]},{"name":"Democratic Republic of the Congo","root":{"year":1395,"label":"Kingdom of Kongo"},"branches":[{"label":"Kongo","start":1395,"end":1914,"type":"kingdom"},{"label":"Belgian Congo","start":1908,"end":1960,"type":"colonial"},{"label":"Zaire","start":1971,"end":1997,"type":"republic"},{"label":"DRC","start":1997,"end":null,"type":"republic"}]},{"name":"Malaysia","root":{"year":1400,"label":"Malacca Sultanate"},"branches":[{"label":"Malacca","start":1400,"end":1511,"type":"sultanate"},{"label":"British Malaya","start":1826,"end":1957,"type":"colonial"},{"label":"Malaysia","start":1963,"end":null,"type":"federation"}]},{"name":"Cape Verde","root":{"year":1456,"label":"Portuguese discovery"},"branches":[{"label":"Portuguese","start":1456,"end":1975,"type":"colonial"},{"label":"Republic","start":1975,"end":null,"type":"republic"}]},{"name":"Spain","root":{"year":1469,"label":"Union of Crowns"},"branches":[{"label":"Catholic Monarchs","start":1469,"end":1516,"type":"union"},{"label":"Spanish Empire","start":1516,"end":1812,"type":"empire"},{"label":"Kingdom","start":1975,"end":null,"type":"kingdom"}]},{"name":"São Tomé and Príncipe","root":{"year":1470,"label":"Portuguese discovery"},"branches":[{"label":"Portuguese","start":1470,"end":1975,"type":"colonial"},{"label":"Republic","start":1975,"end":null,"type":"republic"}]},{"name":"Malawi","root":{"year":1480,"label":"Maravi Empire"},"branches":[{"label":"Maravi","start":1480,"end":1891,"type":"empire"},{"label":"British Nyasaland","start":1891,"end":1964,"type":"colonial"},{"label":"Republic","start":1964,"end":null,"type":"republic"}]},{"name":"Mozambique","root":{"year":1498,"label":"Portuguese arrival"},"branches":[{"label":"Portuguese","start":1498,"end":1975,"type":"colonial"},{"label":"People's Republic","start":1975,"end":null,"type":"republic"}]},{"name":"Algeria","root":{"year":1516,"label":"Regency of Algiers"},"branches":[{"label":"Regency","start":1516,"end":1830,"type":"regency"},{"label":"French Algeria","start":1830,"end":1962,"type":"colonial"},{"label":"Republic","start":1962,"end":null,"type":"republic"}]},{"name":"Malta","root":{"year":1530,"label":"Knights of Malta"},"branches":[{"label":"Knights Hospitaller","start":1530,"end":1798,"type":"order"},{"label":"British Malta","start":1800,"end":1964,"type":"colonial"},{"label":"Republic","start":1964,"end":null,"type":"republic"}]},{"name":"Madagascar","root":{"year":1540,"label":"Merina Kingdom"},"branches":[{"label":"Merina","start":1540,"end":1897,"type":"kingdom"},{"label":"French","start":1897,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Libya","root":{"year":1551,"label":"Ottoman Tripolitania"},"branches":[{"label":"Ottoman","start":1551,"end":1911,"type":"colonial"},{"label":"Italian Libya","start":1911,"end":1943,"type":"colonial"},{"label":"Kingdom","start":1951,"end":1969,"type":"kingdom"},{"label":"State of Libya","start":2011,"end":null,"type":"republic"}]},{"name":"Tunisia","root":{"year":1574,"label":"Ottoman Tunisia"},"branches":[{"label":"Ottoman Regency","start":1574,"end":1705,"type":"regency"},{"label":"Beylik","start":1705,"end":1881,"type":"beylik"},{"label":"French Protectorate","start":1881,"end":1956,"type":"colonial"},{"label":"Republic","start":1956,"end":null,"type":"republic"}]},{"name":"Netherlands","root":{"year":1581,"label":"Act of Abjuration"},"branches":[{"label":"Dutch Republic","start":1581,"end":1795,"type":"republic"},{"label":"Kingdom","start":1815,"end":null,"type":"kingdom"}]},{"name":"Benin","root":{"year":1600,"label":"Kingdom of Dahomey"},"branches":[{"label":"Dahomey","start":1600,"end":1894,"type":"kingdom"},{"label":"French Dahomey","start":1894,"end":1960,"type":"colonial"},{"label":"People's Republic","start":1975,"end":null,"type":"republic"}]},{"name":"Kuwait","root":{"year":1613,"label":"Bani Utbah settlement"},"branches":[{"label":"Sheikhdom","start":1613,"end":1899,"type":"sheikhdom"},{"label":"British Protectorate","start":1899,"end":1961,"type":"protectorate"},{"label":"State of Kuwait","start":1961,"end":null,"type":"emirate"}]},{"name":"Bhutan","root":{"year":1616,"label":"Tibetan invasion"},"branches":[{"label":"Unified Bhutan","start":1616,"end":1907,"type":"theocracy"},{"label":"Kingdom","start":1907,"end":null,"type":"kingdom"}]},{"name":"Mauritius","root":{"year":1638,"label":"Dutch Mauritius"},"branches":[{"label":"Dutch","start":1638,"end":1710,"type":"colonial"},{"label":"French","start":1715,"end":1810,"type":"colonial"},{"label":"British","start":1810,"end":1968,"type":"colonial"},{"label":"Republic","start":1968,"end":null,"type":"republic"}]},{"name":"South Africa","root":{"year":1652,"label":"Dutch Cape Colony"},"branches":[{"label":"Dutch Cape","start":1652,"end":1795,"type":"colonial"},{"label":"British Cape","start":1806,"end":1910,"type":"colonial"},{"label":"Union","start":1910,"end":1961,"type":"dominion"},{"label":"Republic","start":1961,"end":null,"type":"republic"}]},{"name":"Burundi","root":{"year":1680,"label":"Kingdom"},"branches":[{"label":"Kingdom","start":1680,"end":1890,"type":"kingdom"},{"label":"German/Belgian","start":1890,"end":1962,"type":"colonial"},{"label":"Republic","start":1962,"end":null,"type":"republic"}]},{"name":"East Timor","root":{"year":1702,"label":"Portuguese Timor"},"branches":[{"label":"Portuguese","start":1702,"end":1975,"type":"colonial"},{"label":"Indonesian Occupation","start":1975,"end":1999,"type":"occupation"},{"label":"Democratic Republic","start":2002,"end":null,"type":"republic"}]},{"name":"Afghanistan","root":{"year":1709,"label":"Hotak Dynasty"},"branches":[{"label":"Hotak","start":1709,"end":1738,"type":"dynasty"},{"label":"Durrani Empire","start":1747,"end":1826,"type":"empire"},{"label":"Emirate","start":1826,"end":1973,"type":"emirate"},{"label":"Islamic Emirate","start":2021,"end":null,"type":"emirate"}]},{"name":"Liechtenstein","root":{"year":1719,"label":"Principality"},"branches":[{"label":"Principality","start":1719,"end":null,"type":"principality"}]},{"name":"Saudi Arabia","root":{"year":1744,"label":"First Saudi State"},"branches":[{"label":"First State","start":1744,"end":1818,"type":"emirate"},{"label":"Second State","start":1824,"end":1891,"type":"emirate"},{"label":"Third State","start":1902,"end":1932,"type":"emirate"},{"label":"Kingdom","start":1932,"end":null,"type":"kingdom"}]},{"name":"Eswatini","root":{"year":1745,"label":"Swazi Kingdom"},"branches":[{"label":"Kingdom","start":1745,"end":1894,"type":"kingdom"},{"label":"British Protectorate","start":1894,"end":1968,"type":"colonial"},{"label":"Kingdom","start":1968,"end":null,"type":"kingdom"}]},{"name":"Vatican City","root":{"year":756,"label":"Papal States"},"branches":[{"label":"Papal States","start":756,"end":1870,"type":"theocracy"},{"label":"Vatican City State","start":1929,"end":null,"type":"theocracy"}]},{"name":"Nepal","root":{"year":1768,"label":"Kingdom unified"},"branches":[{"label":"Kingdom","start":1768,"end":2008,"type":"kingdom"},{"label":"Federal Republic","start":2008,"end":null,"type":"republic"}]},{"name":"Seychelles","root":{"year":1770,"label":"French Seychelles"},"branches":[{"label":"French","start":1770,"end":1811,"type":"colonial"},{"label":"British","start":1811,"end":1976,"type":"colonial"},{"label":"Republic","start":1976,"end":null,"type":"republic"}]},{"name":"Equatorial Guinea","root":{"year":1778,"label":"Spanish Guinea"},"branches":[{"label":"Spanish","start":1778,"end":1968,"type":"colonial"},{"label":"Republic","start":1968,"end":null,"type":"republic"}]},{"name":"Bahrain","root":{"year":1783,"label":"Al Khalifa Dynasty"},"branches":[{"label":"Al Khalifa","start":1783,"end":1861,"type":"kingdom"},{"label":"British Protectorate","start":1861,"end":1971,"type":"protectorate"},{"label":"Kingdom","start":1971,"end":null,"type":"kingdom"}]},{"name":"Sierra Leone","root":{"year":1787,"label":"British Sierra Leone"},"branches":[{"label":"British Colony","start":1787,"end":1961,"type":"colonial"},{"label":"Republic","start":1961,"end":null,"type":"republic"}]},{"name":"Gambia","root":{"year":1816,"label":"British Gambia"},"branches":[{"label":"British","start":1816,"end":1965,"type":"colonial"},{"label":"The Gambia","start":1965,"end":null,"type":"republic"}]},{"name":"Singapore","root":{"year":1819,"label":"British founding"},"branches":[{"label":"British","start":1819,"end":1963,"type":"colonial"},{"label":"Part of Malaysia","start":1963,"end":1965,"type":"federation"},{"label":"Republic","start":1965,"end":null,"type":"republic"}]},{"name":"United Arab Emirates","root":{"year":1820,"label":"Trucial States"},"branches":[{"label":"Trucial States","start":1820,"end":1971,"type":"protectorate"},{"label":"UAE","start":1971,"end":null,"type":"federation"}]},{"name":"Liberia","root":{"year":1822,"label":"ACS settlement"},"branches":[{"label":"Commonwealth","start":1822,"end":1847,"type":"colony"},{"label":"Republic","start":1847,"end":null,"type":"republic"}]},{"name":"Lesotho","root":{"year":1822,"label":"Basutoland"},"branches":[{"label":"Basutoland","start":1822,"end":1868,"type":"kingdom"},{"label":"British Protectorate","start":1868,"end":1966,"type":"colonial"},{"label":"Kingdom","start":1966,"end":null,"type":"kingdom"}]},{"name":"Belgium","root":{"year":1830,"label":"Belgian Revolution"},"branches":[{"label":"Kingdom","start":1830,"end":null,"type":"kingdom"}]},{"name":"Gabon","root":{"year":1839,"label":"French Gabon"},"branches":[{"label":"French","start":1839,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Comoros","root":{"year":1841,"label":"French protectorate"},"branches":[{"label":"French","start":1841,"end":1975,"type":"colonial"},{"label":"Union","start":1975,"end":null,"type":"republic"}]},{"name":"Djibouti","root":{"year":1862,"label":"French Somaliland"},"branches":[{"label":"French Somaliland","start":1862,"end":1967,"type":"colonial"},{"label":"Republic","start":1977,"end":null,"type":"republic"}]},{"name":"Qatar","root":{"year":1868,"label":"Qatari-British Treaty"},"branches":[{"label":"Ottoman Qatar","start":1871,"end":1916,"type":"colonial"},{"label":"British Protectorate","start":1916,"end":1971,"type":"protectorate"},{"label":"State of Qatar","start":1971,"end":null,"type":"emirate"}]},{"name":"Guinea-Bissau","root":{"year":1879,"label":"Portuguese Guinea"},"branches":[{"label":"Portuguese","start":1879,"end":1973,"type":"colonial"},{"label":"Republic","start":1973,"end":null,"type":"republic"}]},{"name":"Republic of the Congo","root":{"year":1880,"label":"French Congo"},"branches":[{"label":"French","start":1880,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Togo","root":{"year":1884,"label":"German Togoland"},"branches":[{"label":"German","start":1884,"end":1914,"type":"colonial"},{"label":"French","start":1916,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Namibia","root":{"year":1884,"label":"German South West Africa"},"branches":[{"label":"German","start":1884,"end":1915,"type":"colonial"},{"label":"South African mandate","start":1915,"end":1990,"type":"colonial"},{"label":"Republic","start":1990,"end":null,"type":"republic"}]},{"name":"Cameroon","root":{"year":1884,"label":"German Kamerun"},"branches":[{"label":"German","start":1884,"end":1916,"type":"colonial"},{"label":"French/British","start":1916,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Botswana","root":{"year":1885,"label":"British Bechuanaland"},"branches":[{"label":"British","start":1885,"end":1966,"type":"colonial"},{"label":"Republic","start":1966,"end":null,"type":"republic"}]},{"name":"Central African Republic","root":{"year":1889,"label":"French Ubangi-Shari"},"branches":[{"label":"French","start":1889,"end":1960,"type":"colonial"},{"label":"CAR","start":1960,"end":null,"type":"republic"}]},{"name":"Zambia","root":{"year":1889,"label":"British South Africa Company"},"branches":[{"label":"Northern Rhodesia","start":1889,"end":1964,"type":"colonial"},{"label":"Republic","start":1964,"end":null,"type":"republic"}]},{"name":"Eritrea","root":{"year":1890,"label":"Italian Eritrea"},"branches":[{"label":"Italian","start":1890,"end":1941,"type":"colonial"},{"label":"Ethiopian Federation","start":1952,"end":1962,"type":"federation"},{"label":"State of Eritrea","start":1993,"end":null,"type":"republic"}]},{"name":"Guinea","root":{"year":1891,"label":"French Guinea"},"branches":[{"label":"French","start":1891,"end":1958,"type":"colonial"},{"label":"Republic","start":1958,"end":null,"type":"republic"}]},{"name":"Ivory Coast","root":{"year":1893,"label":"French Ivory Coast"},"branches":[{"label":"French","start":1893,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Kenya","root":{"year":1895,"label":"British East Africa"},"branches":[{"label":"British","start":1895,"end":1963,"type":"colonial"},{"label":"Republic","start":1963,"end":null,"type":"republic"}]},{"name":"Burkina Faso","root":{"year":1896,"label":"French Upper Volta"},"branches":[{"label":"French","start":1896,"end":1960,"type":"colonial"},{"label":"Burkina Faso","start":1984,"end":null,"type":"republic"}]},{"name":"Chad","root":{"year":1900,"label":"French Chad"},"branches":[{"label":"French","start":1900,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Mauritania","root":{"year":1903,"label":"French Mauritania"},"branches":[{"label":"French","start":1903,"end":1960,"type":"colonial"},{"label":"Islamic Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Jordan","root":{"year":1921,"label":"Emirate of Transjordan"},"branches":[{"label":"Emirate","start":1921,"end":1946,"type":"emirate"},{"label":"Hashemite Kingdom","start":1946,"end":null,"type":"kingdom"}]},{"name":"Niger","root":{"year":1922,"label":"French Niger"},"branches":[{"label":"French","start":1922,"end":1960,"type":"colonial"},{"label":"Republic","start":1960,"end":null,"type":"republic"}]},{"name":"Pakistan","root":{"year":1947,"label":"Partition of India"},"branches":[{"label":"Dominion","start":1947,"end":1956,"type":"dominion"},{"label":"Islamic Republic","start":1956,"end":null,"type":"republic"}]},{"name":"South Sudan","root":{"year":1956,"label":"Part of Sudan"},"branches":[{"label":"Part of Sudan","start":1956,"end":2011,"type":"colonial"},{"label":"Republic","start":2011,"end":null,"type":"republic"}]},{"name":"Bangladesh","root":{"year":1971,"label":"Independence from Pakistan"},"branches":[{"label":"People's Republic","start":1971,"end":null,"type":"republic"}]},{"name":"Palestine","root":{"year":1988,"label":"Declaration of Independence"},"branches":[{"label":"State of Palestine","start":1988,"end":null,"type":"republic"}]},{"name":"Croatia","root":{"year":925,"label":"Kingdom"},"branches":[{"label":"Kingdom","start":925,"end":1102,"type":"kingdom"},{"label":"Personal Union Hungary","start":1102,"end":1526,"type":"union"},{"label":"Habsburg Croatia","start":1527,"end":1918,"type":"kingdom"},{"label":"Yugoslavia","start":1918,"end":1991,"type":"kingdom"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Slovenia","root":{"year":623,"label":"Carantania"},"branches":[{"label":"Carantania","start":623,"end":828,"type":"principality"},{"label":"Yugoslavia","start":1918,"end":1991,"type":"kingdom"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Dominica","root":{"year":1978,"label":"Independence"},"branches":[{"label":"Commonwealth of Dominica","start":1978,"end":null,"type":"republic"}]},{"name":"Saint Lucia","root":{"year":1979,"label":"Independence"},"branches":[{"label":"Saint Lucia","start":1979,"end":null,"type":"monarchy"}]},{"name":"Saint Vincent and the Grenadines","root":{"year":1979,"label":"Independence"},"branches":[{"label":"SVG","start":1979,"end":null,"type":"monarchy"}]},{"name":"Antigua and Barbuda","root":{"year":1981,"label":"Independence"},"branches":[{"label":"Antigua and Barbuda","start":1981,"end":null,"type":"monarchy"}]},{"name":"Belize","root":{"year":1981,"label":"Independence"},"branches":[{"label":"Belize","start":1981,"end":null,"type":"monarchy"}]},{"name":"Vanuatu","root":{"year":1980,"label":"Independence"},"branches":[{"label":"Republic of Vanuatu","start":1980,"end":null,"type":"republic"}]},{"name":"Saint Kitts and Nevis","root":{"year":1983,"label":"Independence"},"branches":[{"label":"Federation","start":1983,"end":null,"type":"monarchy"}]},{"name":"Marshall Islands","root":{"year":1986,"label":"Independence"},"branches":[{"label":"Republic","start":1986,"end":null,"type":"republic"}]},{"name":"Micronesia","root":{"year":1986,"label":"Independence"},"branches":[{"label":"Federated States","start":1986,"end":null,"type":"republic"}]},{"name":"Kiribati","root":{"year":1979,"label":"Independence"},"branches":[{"label":"Republic","start":1979,"end":null,"type":"republic"}]},{"name":"Tuvalu","root":{"year":1978,"label":"Independence"},"branches":[{"label":"Tuvalu","start":1978,"end":null,"type":"monarchy"}]},{"name":"Nauru","root":{"year":1968,"label":"Independence"},"branches":[{"label":"Republic","start":1968,"end":null,"type":"republic"}]},{"name":"Palau","root":{"year":1994,"label":"Independence"},"branches":[{"label":"Republic","start":1994,"end":null,"type":"republic"}]},{"name":"Solomon Islands","root":{"year":1978,"label":"Independence"},"branches":[{"label":"Solomon Islands","start":1978,"end":null,"type":"monarchy"}]},{"name":"Samoa","root":{"year":1962,"label":"Independence"},"branches":[{"label":"Independent State","start":1962,"end":null,"type":"republic"}]},{"name":"Tonga","root":{"year":1845,"label":"Kingdom unified"},"branches":[{"label":"Kingdom","start":1845,"end":null,"type":"kingdom"}]},{"name":"Fiji","root":{"year":1970,"label":"Independence"},"branches":[{"label":"Republic","start":1987,"end":null,"type":"republic"}]},{"name":"Papua New Guinea","root":{"year":1975,"label":"Independence"},"branches":[{"label":"Independent State","start":1975,"end":null,"type":"monarchy"}]},{"name":"Australia","root":{"year":1901,"label":"Federation"},"branches":[{"label":"Commonwealth","start":1901,"end":null,"type":"monarchy"}]},{"name":"New Zealand","root":{"year":1907,"label":"Dominion status"},"branches":[{"label":"Dominion","start":1907,"end":1947,"type":"dominion"},{"label":"Realm","start":1947,"end":null,"type":"monarchy"}]},{"name":"Canada","root":{"year":1867,"label":"Confederation"},"branches":[{"label":"Dominion","start":1867,"end":1931,"type":"dominion"},{"label":"Realm of Canada","start":1931,"end":null,"type":"monarchy"}]},{"name":"United States","root":{"year":1776,"label":"Declaration of Independence"},"branches":[{"label":"United States","start":1776,"end":null,"type":"republic"}]},{"name":"Mexico","root":{"year":1821,"label":"Independence from Spain"},"branches":[{"label":"First Empire","start":1821,"end":1823,"type":"empire"},{"label":"First Republic","start":1824,"end":1864,"type":"republic"},{"label":"Second Empire","start":1864,"end":1867,"type":"empire"},{"label":"United Mexican States","start":1867,"end":null,"type":"republic"}]},{"name":"Guatemala","root":{"year":1821,"label":"Independence"},"branches":[{"label":"Republic","start":1847,"end":null,"type":"republic"}]},{"name":"Honduras","root":{"year":1821,"label":"Independence"},"branches":[{"label":"Republic","start":1838,"end":null,"type":"republic"}]},{"name":"El Salvador","root":{"year":1821,"label":"Independence"},"branches":[{"label":"Republic","start":1841,"end":null,"type":"republic"}]},{"name":"Nicaragua","root":{"year":1821,"label":"Independence"},"branches":[{"label":"Republic","start":1838,"end":null,"type":"republic"}]},{"name":"Costa Rica","root":{"year":1821,"label":"Independence"},"branches":[{"label":"Republic","start":1838,"end":null,"type":"republic"}]},{"name":"Panama","root":{"year":1903,"label":"Independence from Colombia"},"branches":[{"label":"Republic","start":1903,"end":null,"type":"republic"}]},{"name":"Colombia","root":{"year":1810,"label":"Independence"},"branches":[{"label":"Gran Colombia","start":1819,"end":1831,"type":"republic"},{"label":"Republic","start":1831,"end":null,"type":"republic"}]},{"name":"Venezuela","root":{"year":1811,"label":"Independence"},"branches":[{"label":"Gran Colombia","start":1819,"end":1830,"type":"republic"},{"label":"Republic","start":1830,"end":null,"type":"republic"}]},{"name":"Ecuador","root":{"year":1809,"label":"Independence"},"branches":[{"label":"Gran Colombia","start":1822,"end":1830,"type":"republic"},{"label":"Republic","start":1830,"end":null,"type":"republic"}]},{"name":"Peru","root":{"year":1821,"label":"Independence"},"branches":[{"label":"Republic","start":1821,"end":null,"type":"republic"}]},{"name":"Bolivia","root":{"year":1825,"label":"Independence"},"branches":[{"label":"Republic","start":1825,"end":null,"type":"republic"}]},{"name":"Chile","root":{"year":1818,"label":"Independence"},"branches":[{"label":"Republic","start":1818,"end":null,"type":"republic"}]},{"name":"Argentina","root":{"year":1816,"label":"Independence"},"branches":[{"label":"Argentine Republic","start":1816,"end":null,"type":"republic"}]},{"name":"Uruguay","root":{"year":1828,"label":"Independence"},"branches":[{"label":"Oriental Republic","start":1828,"end":null,"type":"republic"}]},{"name":"Paraguay","root":{"year":1811,"label":"Independence"},"branches":[{"label":"Republic","start":1811,"end":null,"type":"republic"}]},{"name":"Brazil","root":{"year":1822,"label":"Independence"},"branches":[{"label":"Empire","start":1822,"end":1889,"type":"empire"},{"label":"Federative Republic","start":1889,"end":null,"type":"republic"}]},{"name":"Guyana","root":{"year":1966,"label":"Independence"},"branches":[{"label":"Co-operative Republic","start":1970,"end":null,"type":"republic"}]},{"name":"Suriname","root":{"year":1975,"label":"Independence"},"branches":[{"label":"Republic","start":1975,"end":null,"type":"republic"}]},{"name":"Trinidad and Tobago","root":{"year":1962,"label":"Independence"},"branches":[{"label":"Republic","start":1976,"end":null,"type":"republic"}]},{"name":"Jamaica","root":{"year":1962,"label":"Independence"},"branches":[{"label":"Jamaica","start":1962,"end":null,"type":"monarchy"}]},{"name":"Barbados","root":{"year":1966,"label":"Independence"},"branches":[{"label":"Barbados","start":1966,"end":2021,"type":"monarchy"},{"label":"Republic","start":2021,"end":null,"type":"republic"}]},{"name":"Grenada","root":{"year":1974,"label":"Independence"},"branches":[{"label":"Grenada","start":1974,"end":null,"type":"monarchy"}]},{"name":"Bahamas","root":{"year":1973,"label":"Independence"},"branches":[{"label":"Commonwealth","start":1973,"end":null,"type":"monarchy"}]},{"name":"Cuba","root":{"year":1902,"label":"Independence"},"branches":[{"label":"Republic","start":1902,"end":1959,"type":"republic"},{"label":"Socialist Republic","start":1959,"end":null,"type":"republic"}]},{"name":"Haiti","root":{"year":1804,"label":"Independence"},"branches":[{"label":"First Empire","start":1804,"end":1806,"type":"empire"},{"label":"Republic","start":1859,"end":null,"type":"republic"}]},{"name":"Dominican Republic","root":{"year":1844,"label":"Independence"},"branches":[{"label":"Republic","start":1844,"end":null,"type":"republic"}]},{"name":"Azerbaijan","root":{"year":1918,"label":"Azerbaijan Democratic Republic"},"branches":[{"label":"First Republic","start":1918,"end":1920,"type":"republic"},{"label":"Soviet Azerbaijan","start":1920,"end":1991,"type":"republic"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Kazakhstan","root":{"year":1936,"label":"Kazakh SSR"},"branches":[{"label":"Kazakh SSR","start":1936,"end":1991,"type":"republic"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Uzbekistan","root":{"year":1924,"label":"Uzbek SSR"},"branches":[{"label":"Uzbek SSR","start":1924,"end":1991,"type":"republic"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Turkmenistan","root":{"year":1924,"label":"Turkmen SSR"},"branches":[{"label":"Turkmen SSR","start":1924,"end":1991,"type":"republic"},{"label":"Turkmenistan","start":1991,"end":null,"type":"republic"}]},{"name":"Kyrgyzstan","root":{"year":1936,"label":"Kirghiz SSR"},"branches":[{"label":"Kirghiz SSR","start":1936,"end":1991,"type":"republic"},{"label":"Kyrgyz Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Tajikistan","root":{"year":1929,"label":"Tajik SSR"},"branches":[{"label":"Tajik SSR","start":1929,"end":1991,"type":"republic"},{"label":"Republic","start":1991,"end":null,"type":"republic"}]},{"name":"Mongolia","root":{"year":1206,"label":"Mongol Empire"},"branches":[{"label":"Mongol Empire","start":1206,"end":1368,"type":"empire"},{"label":"People's Republic","start":1924,"end":1992,"type":"republic"},{"label":"Mongolia","start":1992,"end":null,"type":"republic"}]},{"name":"North Korea","root":{"year":1948,"label":"Founding"},"branches":[{"label":"DPRK","start":1948,"end":null,"type":"republic"}]},{"name":"South Korea","root":{"year":1948,"label":"Founding"},"branches":[{"label":"Republic of Korea","start":1948,"end":null,"type":"republic"}]},{"name":"Philippines","root":{"year":1898,"label":"Independence from Spain"},"branches":[{"label":"First Republic","start":1899,"end":1901,"type":"republic"},{"label":"US Commonwealth","start":1935,"end":1946,"type":"commonwealth"},{"label":"Republic","start":1946,"end":null,"type":"republic"}]}];

const CountryCard = ({ country, isExpanded, onToggle, index, translations, language, explanations }) => {
  const formatYear = (year) => {
    if (year === null) return translations.present;
    const isRussian = translations.bce !== undefined;
    if (year < 0) {
      return isRussian ? `${Math.abs(year)} ${translations.bce}` : `${Math.abs(year)} BCE`;
    }
    return isRussian ? `${year} ${translations.ce}` : `${year} CE`;
  };

  const getTypeColor = (type) => {
    const colors = {
      civilization: 'bg-amber-100 text-amber-900 border-amber-200',
      empire: 'bg-purple-100 text-purple-900 border-purple-200',
      kingdom: 'bg-blue-100 text-blue-900 border-blue-200',
      republic: 'bg-green-100 text-green-900 border-green-200',
      sultanate: 'bg-rose-100 text-rose-900 border-rose-200',
      caliphate: 'bg-teal-100 text-teal-900 border-teal-200',
      colonial: 'bg-gray-200 text-gray-800 border-gray-300',
      union: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      federation: 'bg-cyan-100 text-cyan-900 border-cyan-200',
      default: 'bg-slate-100 text-slate-900 border-slate-200'
    };
    return colors[type] || colors.default;
  };

  const age = 2026 - country.root.year;

  return (
    <div className="bg-white rounded-lg border-2 border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between bg-gradient-to-r from-slate-50 to-white"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {index}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                {translations.countries && translations.countries[country.name] ? translations.countries[country.name] : country.name}
              </h3>
              <a 
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(country.name.replace(/ /g, '_'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
                title={translations.countries && translations.countries[country.name] ? `Wikipedia: ${translations.countries[country.name]}` : `Wikipedia: ${country.name}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
                  <path d="M11 11h2v6h-2zm0-4h2v2h-2z"/>
                </svg>
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span className="font-semibold">{formatYear(country.root.year)}</span>
              <span className="text-slate-400">•</span>
              <span className="text-xs">
                {translations.labels && translations.labels[country.root.label] ? translations.labels[country.root.label] : country.root.label}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-medium text-blue-600">{age.toLocaleString()} {translations.years}</span>
            </div>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </div>
      
      {isExpanded && (
        <div className="p-4 pt-0 space-y-2 animate-fadeIn">
          <div className="text-xs font-semibold text-slate-500 mb-2 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span>{translations.branches} ({country.branches.length}):</span>
            <span className="text-xs font-normal text-slate-400 italic">
              💡 {language === 'ru' ? 'Наведите курсор на тип для объяснения' : 'Hover over type for explanation'}
            </span>
          </div>
          {country.branches.map((branch, idx) => (
            <div key={idx} className="flex items-start gap-2 py-2 px-3 rounded bg-slate-50 border border-slate-100">
              <div className="flex-1">
                <div className="font-semibold text-sm text-slate-800">
                  {translations.labels && translations.labels[branch.label] ? translations.labels[branch.label] : branch.label}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  {formatYear(branch.start)} → {formatYear(branch.end)}
                  <span className="text-slate-400 mx-1">•</span>
                  <span className="text-slate-500">{branch.end ? Math.abs(branch.end - branch.start) : Math.abs(2026 - branch.start)} {translations.years}</span>
                </div>
              </div>
              <span 
                className={`text-xs px-2 py-1 rounded border font-medium ${getTypeColor(branch.type)} cursor-help transition-all hover:scale-105 hover:shadow-md relative group`}
                title={explanations[branch.type] || branch.type}
              >
                {translations.types && translations.types[branch.type] ? translations.types[branch.type] : branch.type}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></span>
              </span>
            </div>
          ))}
          
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-500 mb-2">
              {translations.sources || 'SOURCES'}:
            </div>
            <div className="flex flex-wrap gap-2">
              <a 
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(country.name.replace(/ /g, '_'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.09 13.119c-.936 1.932-2.217 3.588-3.697 4.769-.42.341-.893.599-1.394.77-1.138.388-2.395.255-3.375-.399-.334-.223-.57-.523-.734-.84-.378-.728-.294-1.647.227-2.297.682-.853 1.745-1.513 2.961-1.906.515-.167 1.061-.261 1.619-.24.557.021 1.097.139 1.603.344.253.102.499.228.732.368l.314.169c-.14.038-.28.074-.421.107-.919.217-1.83.614-2.605 1.173-.776.56-1.38 1.316-1.66 2.169-.056.171-.082.344-.076.515.006.188.053.368.142.527.178.318.483.553.848.673.726.239 1.574.041 2.168-.455.595-.497 1.021-1.199 1.293-1.986.272-.787.39-1.662.39-2.539 0-.878-.118-1.753-.39-2.54-.272-.787-.698-1.489-1.293-1.986-.595-.497-1.442-.694-2.168-.455-.365.12-.67.355-.848.673-.089.159-.136.339-.142.527-.006.171.02.344.076.515.28.853.884 1.609 1.66 2.169.776.56 1.686.956 2.605 1.173.141.033.281.069.421.107l-.314.169c-.233.14-.479.266-.732.368-.506.205-1.046.323-1.603.344-.558.021-1.104-.073-1.619-.24-1.216-.393-2.279-1.053-2.961-1.906-.521-.65-.605-1.569-.227-2.297.164-.317.4-.617.734-.84.98-.654 2.237-.787 3.375-.399.501.171.974.429 1.394.77 1.48 1.181 2.761 2.837 3.697 4.769.936-1.932 2.217-3.588 3.697-4.769.42-.341.893-.599 1.394-.77 1.138-.388 2.395-.255 3.375.399.334.223.57.523.734.84.378.728.294 1.647-.227 2.297-.682.853-1.745 1.513-2.961 1.906-.515.167-1.061.261-1.619.24-.557-.021-1.097-.139-1.603-.344-.253-.102-.499-.228-.732-.368l-.314-.169c.14-.038.28-.074.421-.107.919-.217 1.83-.614 2.605-1.173.776-.56 1.38-1.316 1.66-2.169.056-.171.082-.344.076-.515-.006-.188-.053-.368-.142-.527-.178-.318-.483-.553-.848-.673-.726-.239-1.574-.041-2.168.455-.595.497-1.021 1.199-1.293 1.986-.272.787-.39 1.662-.39 2.539 0 .878.118 1.753.39 2.54.272.787.698 1.489 1.293 1.986.595.497 1.442.694 2.168.455.365-.12.67-.355.848-.673.089-.159.136-.339.142-.527.006-.171-.02-.344-.076-.515-.28-.853-.884-1.609-1.66-2.169-.776-.56-1.686-.956-2.605-1.173-.141-.033-.281-.069-.421-.107l.314-.169c.233-.14.479-.266.732-.368.506-.205 1.046-.323 1.603-.344.558-.021 1.104.073 1.619.24 1.216.393 2.279 1.053 2.961 1.906.521.65.605 1.569.227 2.297-.164.317-.4.617-.734.84-.98.654-2.237.787-3.375.399-.501-.171-.974-.429-1.394-.77-1.48-1.181-2.761-2.837-3.697-4.769z"/>
                </svg>
                Wikipedia
              </a>
              <a 
                href={`https://www.britannica.com/place/${encodeURIComponent(country.name.replace(/ /g, '-'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 hover:bg-green-100 transition-colors"
              >
                📚 Britannica
              </a>
              <a 
                href={`https://www.cia.gov/the-world-factbook/countries/${encodeURIComponent(country.name.toLowerCase().replace(/ /g, '-'))}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full border border-purple-200 hover:bg-purple-100 transition-colors"
              >
                🌍 CIA Factbook
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [sortOrder, setSortOrder] = useState('oldest');
  const [filterType, setFilterType] = useState('all');
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      title: 'Statehood Timeline',
      subtitle: 'Complete database of all 195 countries sorted by historical origin',
      unMembers: 'UN Members',
      observerStates: 'Observer States',
      displayed: 'Displayed',
      searchPlaceholder: 'Search countries or origins...',
      sortOldest: 'Oldest First',
      sortNewest: 'Newest First',
      sortAlpha: 'Alphabetical',
      filterAll: 'All Types',
      republic: 'Republic',
      kingdom: 'Kingdom',
      monarchy: 'Monarchy',
      federation: 'Federation',
      sultanate: 'Sultanate',
      emirate: 'Emirate',
      theocracy: 'Theocracy',
      branches: 'STATEHOOD BRANCHES',
      years: 'years',
      present: 'Present',
      sources: 'SOURCES',
      countries: {}
    },
    ru: {
      title: 'Хронология государственности',
      subtitle: 'Полная база данных всех 195 стран, отсортированных по историческому происхождению',
      unMembers: 'Членов ООН',
      observerStates: 'Государств-наблюдателей',
      displayed: 'Показано',
      searchPlaceholder: 'Поиск стран или происхождения...',
      sortOldest: 'Сначала старые',
      sortNewest: 'Сначала новые',
      sortAlpha: 'По алфавиту',
      filterAll: 'Все типы',
      republic: 'Республика',
      kingdom: 'Королевство',
      monarchy: 'Монархия',
      federation: 'Федерация',
      sultanate: 'Султанат',
      emirate: 'Эмират',
      theocracy: 'Теократия',
      branches: 'ВЕТВИ ГОСУДАРСТВЕННОСТИ',
      years: 'лет',
      present: 'Настоящее время',
      bce: 'до н.э.',
      ce: 'н.э.',
      sources: 'ИСТОЧНИКИ',
      countries: {
        "Egypt": "Египет", "Iraq": "Ирак", "India": "Индия", "China": "Китай", "Greece": "Греция",
        "Iran": "Иран", "Syria": "Сирия", "Lebanon": "Ливан", "Turkey": "Турция", "Ethiopia": "Эфиопия",
        "Israel": "Израиль", "Armenia": "Армения", "Georgia": "Грузия", "Japan": "Япония", "Italy": "Италия",
        "Yemen": "Йемен", "North Macedonia": "Северная Македония", "Sri Lanka": "Шри-Ланка", "San Marino": "Сан-Марино",
        "Denmark": "Дания", "Sudan": "Судан", "Bulgaria": "Болгария", "Ghana": "Гана", "Oman": "Оман",
        "Serbia": "Сербия", "Morocco": "Марокко", "Cambodia": "Камбоджа", "France": "Франция", "Germany": "Германия",
        "Myanmar": "Мьянма", "Russia": "Россия", "Ukraine": "Украина", "Belarus": "Беларусь", "Portugal": "Португалия",
        "Czech Republic": "Чехия", "Slovakia": "Словакия", "Norway": "Норвегия", "Hungary": "Венгрия",
        "England": "Англия", "United Kingdom": "Великобритания", "Iceland": "Исландия", "Vietnam": "Вьетнам",
        "Luxembourg": "Люксембург", "Poland": "Польша", "Sweden": "Швеция", "Tanzania": "Танзания",
        "Austria": "Австрия", "Nigeria": "Нигерия", "Somalia": "Сомали", "Lithuania": "Литва",
        "Montenegro": "Черногория", "Rwanda": "Руанда", "Maldives": "Мальдивы", "Bosnia and Herzegovina": "Босния и Герцеговина",
        "Ireland": "Ирландия", "Albania": "Албания", "Cyprus": "Кипр", "Latvia": "Латвия",
        "Estonia": "Эстония", "Zimbabwe": "Зимбабве", "Mali": "Мали", "Thailand": "Таиланд",
        "Andorra": "Андорра", "Switzerland": "Швейцария", "Indonesia": "Индонезия", "Monaco": "Монако",
        "Uganda": "Уганда", "Finland": "Финляндия", "Romania": "Румыния", "Senegal": "Сенегал",
        "Laos": "Лаос", "Brunei": "Бруней", "Moldova": "Молдова", "Angola": "Ангола",
        "Democratic Republic of the Congo": "Дем. Респ. Конго", "Malaysia": "Малайзия", "Cape Verde": "Кабо-Верде",
        "Spain": "Испания", "São Tomé and Príncipe": "Сан-Томе и Принсипи", "Malawi": "Малави",
        "Mozambique": "Мозамбик", "Algeria": "Алжир", "Malta": "Мальта", "Madagascar": "Мадагаскар",
        "Libya": "Ливия", "Tunisia": "Тунис", "Netherlands": "Нидерланды", "Benin": "Бенин",
        "Kuwait": "Кувейт", "Bhutan": "Бутан", "Mauritius": "Маврикий", "South Africa": "ЮАР",
        "Burundi": "Бурунди", "East Timor": "Восточный Тимор", "Afghanistan": "Афганистан", "Liechtenstein": "Лихтенштейн",
        "Saudi Arabia": "Саудовская Аравия", "Eswatini": "Эсватини", "Vatican City": "Ватикан", "Nepal": "Непал",
        "Seychelles": "Сейшелы", "Equatorial Guinea": "Экв. Гвинея", "Bahrain": "Бахрейн", "Sierra Leone": "Сьерра-Леоне",
        "Gambia": "Гамбия", "Singapore": "Сингапур", "United Arab Emirates": "ОАЭ", "Liberia": "Либерия",
        "Lesotho": "Лесото", "Belgium": "Бельгия", "Gabon": "Габон", "Comoros": "Коморы",
        "Djibouti": "Джибути", "Qatar": "Катар", "Guinea-Bissau": "Гвинея-Бисау", "Republic of the Congo": "Респ. Конго",
        "Togo": "Того", "Namibia": "Намибия", "Cameroon": "Камерун", "Botswana": "Ботсвана",
        "Central African Republic": "ЦАР", "Zambia": "Замбия", "Eritrea": "Эритрея", "Guinea": "Гвинея",
        "Ivory Coast": "Кот-д'Ивуар", "Kenya": "Кения", "Burkina Faso": "Буркина-Фасо", "Chad": "Чад",
        "Mauritania": "Мавритания", "Jordan": "Иордания", "Niger": "Нигер", "Pakistan": "Пакистан",
        "South Sudan": "Южный Судан", "Bangladesh": "Бангладеш", "Palestine": "Палестина", "Croatia": "Хорватия",
        "Slovenia": "Словения", "Dominica": "Доминика", "Saint Lucia": "Сент-Люсия", "Saint Vincent and the Grenadines": "Сент-Винсент и Гренадины",
        "Antigua and Barbuda": "Антигуа и Барбуда", "Belize": "Белиз", "Vanuatu": "Вануату", "Saint Kitts and Nevis": "Сент-Китс и Невис",
        "Marshall Islands": "Маршалловы Острова", "Micronesia": "Микронезия", "Kiribati": "Кирибати", "Tuvalu": "Тувалу",
        "Nauru": "Науру", "Palau": "Палау", "Solomon Islands": "Соломоновы Острова", "Samoa": "Самоа",
        "Tonga": "Тонга", "Fiji": "Фиджи", "Papua New Guinea": "Папуа — Новая Гвинея", "Australia": "Австралия",
        "New Zealand": "Новая Зеландия", "Canada": "Канада", "United States": "США", "Mexico": "Мексика",
        "Guatemala": "Гватемала", "Honduras": "Гондурас", "El Salvador": "Сальвадор", "Nicaragua": "Никарагуа",
        "Costa Rica": "Коста-Рика", "Panama": "Панама", "Colombia": "Колумбия", "Venezuela": "Венесуэла",
        "Ecuador": "Эквадор", "Peru": "Перу", "Bolivia": "Боливия", "Chile": "Чили",
        "Argentina": "Аргентина", "Uruguay": "Уругвай", "Paraguay": "Парагвай", "Brazil": "Бразилия",
        "Guyana": "Гайана", "Suriname": "Суринам", "Trinidad and Tobago": "Тринидад и Тобаго", "Jamaica": "Ямайка",
        "Barbados": "Барбадос", "Grenada": "Гренада", "Bahamas": "Багамы", "Cuba": "Куба",
        "Haiti": "Гаити", "Dominican Republic": "Доминиканская Респ.", "Azerbaijan": "Азербайджан", "Kazakhstan": "Казахстан",
        "Uzbekistan": "Узбекистан", "Turkmenistan": "Туркменистан", "Kyrgyzstan": "Киргизия", "Tajikistan": "Таджикистан",
        "Mongolia": "Монголия", "North Korea": "Северная Корея", "South Korea": "Южная Корея", "Philippines": "Филиппины"
      },
      labels: {
        "Early Dynastic Period": "Раннединастический период",
        "Early Dynastic": "Раннединастический период",
        "Old Kingdom": "Древнее царство",
        "New Kingdom": "Новое царство",
        "Ptolemaic": "Птолемеевский период",
        "Roman/Byzantine": "Римско-византийский период",
        "Islamic Caliphates": "Исламские халифаты",
        "Ottoman": "Османский период",
        "Republic": "Республика",
        "Sumerian City-States": "Шумерские города-государства",
        "Sumer": "Шумер",
        "Akkadian Empire": "Аккадская империя",
        "Babylonian Empire": "Вавилонская империя",
        "Indus Valley Civilization": "Индская цивилизация",
        "Indus Valley": "Индская долина",
        "Maurya Empire": "Империя Маурьев",
        "Mughal Empire": "Империя Великих Моголов",
        "British Raj": "Британская Индия",
        "Xia Dynasty": "Династия Ся",
        "Shang Dynasty": "Династия Шан",
        "Qin Dynasty": "Династия Цинь",
        "Han Dynasty": "Династия Хань",
        "Tang Dynasty": "Династия Тан",
        "Ming Dynasty": "Династия Мин",
        "Qing Dynasty": "Династия Цин",
        "PRC": "КНР",
        "Minoan Civilization": "Минойская цивилизация",
        "Minoan": "Минойская",
        "Mycenaean": "Микенская",
        "Classical City-States": "Классические города-государства",
        "Byzantine Empire": "Византийская империя",
        "Hellenic Republic": "Греческая Республика",
        "Elamite Civilization": "Эламская цивилизация",
        "Elamite": "Эламитская",
        "Achaemenid Empire": "Империя Ахеменидов",
        "Sassanid Empire": "Империя Сасанидов",
        "Safavid Dynasty": "Династия Сефевидов",
        "Pahlavi Dynasty": "Династия Пехлеви",
        "Islamic Republic": "Исламская Республика",
        "Ebla Kingdom": "Королевство Эбла",
        "Ancient Syrian Kingdoms": "Древние сирийские царства",
        "French Mandate": "Французский мандат",
        "Phoenician City-States": "Финикийские города-государства",
        "Phoenician": "Финикийская",
        "Hittite Empire": "Хеттская империя",
        "Ottoman Empire": "Османская империя",
        "Kingdom of D'mt": "Королевство Дымт",
        "D'mt": "Дымт",
        "Aksum": "Аксум",
        "Ethiopian Empire": "Эфиопская империя",
        "Federal Republic": "Федеральная Республика",
        "United Kingdom of Israel": "Объединённое царство Израиля",
        "United Kingdom": "Объединённое царство",
        "Kingdom of Judah": "Иудейское царство",
        "British Mandate": "Британский мандат",
        "State of Israel": "Государство Израиль",
        "Kingdom of Urartu": "Королевство Урарту",
        "Urartu": "Урарту",
        "Kingdom of Armenia": "Армянское царство",
        "Bagratid Armenia": "Багратидская Армения",
        "Soviet Armenia": "Советская Армения",
        "Kingdom of Colchis": "Колхидское царство",
        "Colchis": "Колхида",
        "Kingdom of Georgia": "Грузинское царство",
        "Soviet Georgia": "Советская Грузия",
        "Foundation (legendary)": "Основание (легендарное)",
        "Yamato Period": "Период Ямато",
        "Heian Period": "Период Хэйан",
        "Edo Period": "Период Эдо",
        "Empire": "Империя",
        "Constitutional Monarchy": "Конституционная монархия",
        "Foundation of Rome": "Основание Рима",
        "Roman Kingdom": "Римское царство",
        "Roman Republic": "Римская республика",
        "Roman Empire": "Римская империя",
        "Medieval States": "Средневековые государства",
        "Italian Republic": "Итальянская Республика",
        "Sabaean Kingdom": "Сабейское царство",
        "Sabaean": "Сабейское",
        "Himyarite": "Химьяритское",
        "Kingdom of Macedon": "Македонское царство",
        "Macedon": "Македония",
        "Yugoslavia": "Югославия",
        "Kingdom of Tambapanni": "Королевство Тамбапанни",
        "Anuradhapura": "Анурадхапура",
        "Kandyan Kingdom": "Кандийское королевство",
        "British Ceylon": "Британский Цейлон",
        "Foundation": "Основание",
        "Danish Kingdom": "Датское королевство",
        "Kingdom of Makuria": "Королевство Макурия",
        "Makuria": "Макурия",
        "Funj Sultanate": "Султанат Фундж",
        "Anglo-Egyptian": "Англо-египетский",
        "First Bulgarian Empire": "Первое Болгарское царство",
        "First Empire": "Первая империя",
        "Second Empire": "Вторая империя",
        "Ghana Empire": "Империя Гана",
        "Ashanti Empire": "Империя Ашанти",
        "British Gold Coast": "Британский Золотой Берег",
        "Imamate of Oman": "Имамат Оман",
        "Imamate": "Имамат",
        "Al Said Dynasty": "Династия Аль Саид",
        "Serbian Principality": "Сербское княжество",
        "Serbian Empire": "Сербская империя",
        "FR Yugoslavia": "СР Югославия",
        "Republic of Serbia": "Республика Сербия",
        "Idrisid Dynasty": "Династия Идрисидов",
        "Idrisid": "Идрисиды",
        "Almoravid": "Альморавиды",
        "Alaouite Dynasty": "Династия Алауитов",
        "Protectorate": "Протекторат",
        "Khmer Empire": "Кхмерская империя",
        "Middle Period": "Средний период",
        "French": "Французский",
        "West Francia": "Западная Франкия",
        "First Republic": "Первая республика",
        "First Empire": "Первая империя",
        "Fifth Republic": "Пятая республика",
        "East Francia": "Восточная Франкия",
        "Holy Roman Empire": "Священная Римская империя",
        "German Empire": "Германская империя",
        "Nazi Germany": "Нацистская Германия",
        "Federal Republic": "Федеративная Республика",
        "Pagan Kingdom": "Паганское королевство",
        "Pagan": "Паган",
        "Konbaung Dynasty": "Династия Конбаунг",
        "British Burma": "Британская Бирма",
        "Myanmar": "Мьянма",
        "Kievan Rus'": "Киевская Русь",
        "Grand Duchy Moscow": "Московское великое княжество",
        "Tsardom": "Царство",
        "Soviet Union": "Советский Союз",
        "Cossack Hetmanate": "Казацкая гетманщина",
        "Ukrainian SSR": "Украинская ССР",
        "Ukraine": "Украина",
        "Grand Duchy Lithuania": "Великое княжество Литовское",
        "Byelorussian SSR": "Белорусская ССР",
        "County of Portugal": "Графство Португалия",
        "Estado Novo": "Эштаду Нову",
        "Portuguese Republic": "Португальская Республика",
        "Great Moravia": "Великая Моравия",
        "Kingdom of Bohemia": "Королевство Богемия",
        "Czechoslovakia": "Чехословакия",
        "Czech Republic": "Чешская Республика",
        "Slovak Republic": "Словацкая Республика",
        "Kingdom of Hungary": "Венгерское королевство",
        "Kingdom unified": "Объединение королевства",
        "Denmark-Norway": "Дания-Норвегия",
        "Union with Sweden": "Уния со Швецией",
        "Hungarian Conquest": "Венгерское завоевание",
        "Austria-Hungary": "Австро-Венгрия",
        "People's Republic": "Народная Республика",
        "Kingdom of England": "Королевство Англия",
        "Great Britain": "Великобритания",
        "Icelandic Commonwealth": "Исландское содружество",
        "Commonwealth": "Содружество",
        "Danish Iceland": "Датская Исландия",
        "Independence from China": "Независимость от Китая",
        "Lý Dynasty": "Династия Ли",
        "Nguyễn Dynasty": "Династия Нгуен",
        "French Indochina": "Французский Индокитай",
        "Socialist Republic": "Социалистическая Республика",
        "County": "Графство",
        "Duchy": "Герцогство",
        "Grand Duchy": "Великое герцогство",
        "Baptism of Poland": "Крещение Польши",
        "Commonwealth": "Речь Посполитая",
        "Partitions": "Разделы",
        "Second Republic": "Вторая республика",
        "Third Republic": "Третья республика",
        "Kingdom": "Королевство",
        "Kalmar Union": "Кальмарская уния",
        "Kilwa Sultanate": "Килванский султанат",
        "Kilwa": "Килва",
        "Omani Zanzibar": "Оманский Занзибар",
        "German East Africa": "Германская Восточная Африка",
        "British": "Британская",
        "United Republic": "Объединённая Республика",
        "Margraviate": "Маркграфство",
        "Austrian Empire": "Австрийская империя",
        "Second Republic": "Вторая республика",
        "Kanem-Bornu Empire": "Империя Канем-Борну",
        "Kanem-Bornu": "Канем-Борну",
        "British Nigeria": "Британская Нигерия",
        "Federal Republic of Nigeria": "Федеративная Республика Нигерия",
        "Somali Sultanates": "Сомалийские султанаты",
        "Adal Sultanate": "Султанат Адал",
        "Italian/British": "Итальянская/Британская",
        "First mention": "Первое упоминание",
        "Lithuanian SSR": "Литовская ССР",
        "Principality of Duklja": "Княжество Дукля",
        "Duklja": "Дукля",
        "Montenegro": "Черногория",
        "German/Belgian": "Германская/Бельгийская",
        "Sultanate": "Султанат",
        "Banate": "Банат",
        "Lordship": "Лордство",
        "Irish Free State": "Ирландское Свободное Государство",
        "Principality of Arbanon": "Княжество Арбанон",
        "Arbanon": "Арбанон",
        "Livonian Confederation": "Ливонская конфедерация",
        "Livonian": "Ливонская",
        "Russian Empire": "Российская империя",
        "Latvian SSR": "Латвийская ССР",
        "Danish Estonia": "Датская Эстония",
        "Danish": "Датская",
        "Swedish": "Шведская",
        "Estonian SSR": "Эстонская ССР",
        "Kingdom of Zimbabwe": "Королевство Зимбабве",
        "Mutapa Empire": "Империя Мутапа",
        "British Rhodesia": "Британская Родезия",
        "Mali Empire": "Империя Мали",
        "French Sudan": "Французский Судан",
        "Sukhothai Kingdom": "Королевство Сукхотай",
        "Sukhothai": "Сукхотай",
        "Ayutthaya": "Аюттхая",
        "Rattanakosin": "Раттанакосин",
        "Paréage": "Pareage (соглашение)",
        "Co-Principality": "Со-княжество",
        "Old Swiss Confederacy": "Старая Швейцарская конфедерация",
        "Old Confederacy": "Старая конфедерация",
        "Swiss Confederation": "Швейцарская Конфедерация",
        "Majapahit Empire": "Империя Маджапахит",
        "Majapahit": "Маджапахит",
        "Dutch East Indies": "Голландская Ост-Индия",
        "House of Grimaldi": "Дом Гримальди",
        "Kingdom of Buganda": "Королевство Буганда",
        "Buganda": "Буганда",
        "Treaty of Nöteborg": "Ореховский договор",
        "Swedish Finland": "Шведская Финляндия",
        "Principality of Wallachia": "Валашское княжество",
        "Wallachia": "Валахия",
        "United Principalities": "Объединённые княжества",
        "Romania": "Румыния",
        "Jolof Empire": "Империя Джолоф",
        "French Senegal": "Французский Сенегал",
        "Lan Xang Kingdom": "Королевство Лан Санг",
        "Lan Xang": "Лан Санг",
        "PDR": "НДР",
        "Principality of Moldavia": "Молдавское княжество",
        "Moldavia": "Молдавия",
        "Moldavian SSR": "Молдавская ССР",
        "Kingdom of Ndongo": "Королевство Ндонго",
        "Ndongo": "Ндонго",
        "Portuguese": "Португальская",
        "Kingdom of Kongo": "Королевство Конго",
        "Kongo": "Конго",
        "Belgian Congo": "Бельгийское Конго",
        "Zaire": "Заир",
        "DRC": "ДРК",
        "Malacca Sultanate": "Малаккский султанат",
        "Malacca": "Малакка",
        "British Malaya": "Британская Малайя",
        "Malaysia": "Малайзия",
        "Portuguese discovery": "Португальское открытие",
        "Union of Crowns": "Объединение корон",
        "Catholic Monarchs": "Католические короли",
        "Spanish Empire": "Испанская империя",
        "Maravi Empire": "Империя Марави",
        "Maravi": "Марави",
        "British Nyasaland": "Британский Ньясаленд",
        "Portuguese arrival": "Прибытие португальцев",
        "Regency of Algiers": "Алжирский регентство",
        "Regency": "Регентство",
        "French Algeria": "Французский Алжир",
        "Knights of Malta": "Мальтийские рыцари",
        "Knights Hospitaller": "Госпитальеры",
        "British Malta": "Британская Мальта",
        "Merina Kingdom": "Королевство Мерина",
        "Merina": "Мерина",
        "Ottoman Tripolitania": "Османская Триполитания",
        "Italian Libya": "Итальянская Ливия",
        "State of Libya": "Государство Ливия",
        "Ottoman Tunisia": "Османский Тунис",
        "Ottoman Regency": "Османское регентство",
        "Beylik": "Бейлик",
        "French Protectorate": "Французский протекторат",
        "Act of Abjuration": "Акт о низложении",
        "Dutch Republic": "Голландская республика",
        "Kingdom of Dahomey": "Королевство Дагомея",
        "Dahomey": "Дагомея",
        "French Dahomey": "Французская Дагомея",
        "Bani Utbah settlement": "Поселение Бани Утба",
        "Sheikhdom": "Шейхство",
        "State of Kuwait": "Государство Кувейт",
        "Tibetan invasion": "Тибетское вторжение",
        "Unified Bhutan": "Объединённый Бутан",
        "Dutch Mauritius": "Голландский Маврикий",
        "Dutch": "Голландская",
        "Dutch Cape Colony": "Голландская Капская колония",
        "Dutch Cape": "Голландская Капская",
        "British Cape": "Британская Капская",
        "Union": "Союз",
        "Portuguese Timor": "Португальский Тимор",
        "Indonesian Occupation": "Индонезийская оккупация",
        "Democratic Republic": "Демократическая Республика",
        "Hotak Dynasty": "Династия Хотаки",
        "Hotak": "Хотаки",
        "Durrani Empire": "Империя Дуррани",
        "Emirate": "Эмират",
        "Islamic Emirate": "Исламский эмират",
        "Principality": "Княжество",
        "First Saudi State": "Первое Саудовское государство",
        "First State": "Первое государство",
        "Second State": "Второе государство",
        "Third State": "Третье государство",
        "Swazi Kingdom": "Свазилендское королевство",
        "Papal States": "Папская область",
        "Vatican City State": "Государство-город Ватикан",
        "French Seychelles": "Французские Сейшелы",
        "Spanish Guinea": "Испанская Гвинея",
        "Spanish": "Испанская",
        "Al Khalifa Dynasty": "Династия Аль Халифа",
        "Al Khalifa": "Аль Халифа",
        "British Sierra Leone": "Британская Сьерра-Леоне",
        "British Colony": "Британская колония",
        "British Gambia": "Британская Гамбия",
        "The Gambia": "Гамбия",
        "British founding": "Британское основание",
        "Part of Malaysia": "Часть Малайзии",
        "Trucial States": "Договорные государства",
        "UAE": "ОАЭ",
        "ACS settlement": "Поселение АКО",
        "Basutoland": "Басутоленд",
        "Belgian Revolution": "Бельгийская революция",
        "French Gabon": "Французский Габон",
        "French protectorate": "Французский протекторат",
        "French Somaliland": "Французское Сомали",
        "Qatari-British Treaty": "Катарско-британский договор",
        "Ottoman Qatar": "Османский Катар",
        "State of Qatar": "Государство Катар",
        "Portuguese Guinea": "Португальская Гвинея",
        "French Congo": "Французское Конго",
        "German Togoland": "Германское Того",
        "German": "Германская",
        "German South West Africa": "Германская Юго-Западная Африка",
        "South African mandate": "Южноафриканский мандат",
        "German Kamerun": "Германский Камерун",
        "French/British": "Французская/Британская",
        "British Bechuanaland": "Британская Бечуаналенд",
        "French Ubangi-Shari": "Французский Убанги-Шари",
        "CAR": "ЦАР",
        "British South Africa Company": "Британская южноафриканская компания",
        "Northern Rhodesia": "Северная Родезия",
        "Italian Eritrea": "Итальянская Эритрея",
        "Italian": "Итальянская",
        "Ethiopian Federation": "Эфиопская федерация",
        "State of Eritrea": "Государство Эритрея",
        "French Guinea": "Французская Гвинея",
        "French Ivory Coast": "Французский Кот-д'Ивуар",
        "British East Africa": "Британская Восточная Африка",
        "French Upper Volta": "Французская Верхняя Вольта",
        "Burkina Faso": "Буркина-Фасо",
        "French Chad": "Французский Чад",
        "French Mauritania": "Французская Мавритания",
        "Islamic Republic of Mauritania": "Исламская Республика Мавритания",
        "Emirate of Transjordan": "Эмират Трансиордания",
        "Hashemite Kingdom": "Хашимитское королевство",
        "French Niger": "Французский Нигер",
        "Partition of India": "Раздел Индии",
        "Dominion": "Доминион",
        "Part of Sudan": "Часть Судана",
        "Independence from Pakistan": "Независимость от Пакистана",
        "Declaration of Independence": "Декларация независимости",
        "State of Palestine": "Государство Палестина",
        "Personal Union Hungary": "Личная уния с Венгрией",
        "Habsburg Croatia": "Габсбургская Хорватия",
        "Carantania": "Карантания",
        "Commonwealth of Dominica": "Содружество Доминики",
        "Saint Lucia": "Сент-Люсия",
        "SVG": "СВГ",
        "Antigua and Barbuda": "Антигуа и Барбуда",
        "Belize": "Белиз",
        "Republic of Vanuatu": "Республика Вануату",
        "Solomon Islands": "Соломоновы Острова",
        "Independent State": "Независимое государство",
        "Tuvalu": "Тувалу",
        "Federated States": "Федеративные Штаты",
        "Independence": "Независимость",
        "Founding": "Основание",
        "DPRK": "КНДР",
        "Republic of Korea": "Республика Корея",
        "Independence from Spain": "Независимость от Испании",
        "US Commonwealth": "Содружество США",
        "Independence from Colombia": "Независимость от Колумбии",
        "Gran Colombia": "Великая Колумбия",
        "United Mexican States": "Мексиканские Соединённые Штаты",
        "Oriental Republic": "Восточная Республика",
        "Federative Republic": "Федеративная Республика",
        "Co-operative Republic": "Кооперативная Республика",
        "Realm of Canada": "Королевство Канада",
        "United States": "Соединённые Штаты",
        "Argentine Republic": "Аргентинская Республика",
        "Azerbaijan Democratic Republic": "Азербайджанская Демократическая Республика",
        "Soviet Azerbaijan": "Советский Азербайджан",
        "Kazakh SSR": "Казахская ССР",
        "Uzbek SSR": "Узбекская ССР",
        "Turkmenistan": "Туркменистан",
        "Kirghiz SSR": "Киргизская ССР",
        "Kyrgyz Republic": "Кыргызская Республика",
        "Tajik SSR": "Таджикская ССР",
        "Mongol Empire": "Монгольская империя",
        "Mongolia": "Монголия",
        "Dominion status": "Статус доминиона",
        "Realm": "Королевство",
        "Confederation": "Конфедерация",
        "Federation": "Федерация",
        "Russian Federation": "Российская Федерация"
      },
      types: {
        "civilization": "цивилизация",
        "empire": "империя",
        "kingdom": "королевство",
        "republic": "республика",
        "sultanate": "султанат",
        "caliphate": "халифат",
        "colonial": "колония",
        "union": "союзная федерация",
        "federation": "федерация",
        "principality": "княжество",
        "duchy": "герцогство",
        "tsardom": "царство",
        "hetmanate": "гетманат",
        "county": "графство",
        "margraviate": "маркграфство",
        "banate": "банат",
        "lordship": "лордство",
        "confederation": "конфедерация",
        "commonwealth": "содружество",
        "dynasty": "династия",
        "regency": "регентство",
        "beylik": "бейлик",
        "order": "орден",
        "theocracy": "теократия",
        "sheikhdom": "шейхство",
        "protectorate": "протекторат",
        "emirate": "эмират",
        "imamate": "имамат",
        "shogunate": "сёгунат",
        "monarchy": "монархия",
        "dictatorship": "диктатура",
        "statehood": "государство",
        "occupation": "оккупация",
        "dominion": "доминион",
        "colony": "колония"
      }
    }
  };

  const typeExplanations = {
    en: {
      "civilization": "Early organized society with cities, writing, and social hierarchy",
      "empire": "Large state controlling multiple territories and peoples under single rule",
      "kingdom": "Monarchical state ruled by a king or queen",
      "republic": "State where power rests with elected representatives",
      "sultanate": "Islamic state ruled by a sultan",
      "caliphate": "Islamic state led by a caliph, religious and political successor to Muhammad",
      "colonial": "Territory under foreign control and administration",
      "union": "Political entity formed by merging multiple states",
      "federation": "Union of partially self-governing states under central government",
      "principality": "Territory ruled by a prince",
      "duchy": "Territory ruled by a duke",
      "tsardom": "Russian empire ruled by a tsar",
      "hetmanate": "Cossack state led by an elected hetman",
      "county": "Territory ruled by a count",
      "margraviate": "Border territory ruled by a margrave",
      "banate": "Medieval Balkan territory ruled by a ban",
      "lordship": "Territory under rule of a lord",
      "confederation": "Loose alliance of independent states",
      "commonwealth": "Political community founded for common good",
      "dynasty": "Succession of rulers from same family line",
      "regency": "Government by regent ruling in place of monarch",
      "beylik": "Turkish principality ruled by a bey",
      "order": "Religious military organization governing territory",
      "theocracy": "State governed by religious authority",
      "sheikhdom": "Territory ruled by a sheikh",
      "protectorate": "State under protection and control of another state",
      "emirate": "Territory ruled by an emir",
      "imamate": "Islamic state led by an imam",
      "shogunate": "Japanese military government led by a shogun",
      "monarchy": "State ruled by hereditary sovereign",
      "dictatorship": "Authoritarian rule by single leader or small group",
      "statehood": "General organized political entity",
      "occupation": "Territory under military control of foreign power",
      "dominion": "Self-governing territory within British Empire"
    },
    ru: {
      "civilization": "Ранняя организованная цивилизация с городами, письменностью и социальной иерархией",
      "empire": "Крупное государство, контролирующее множество территорий и народов под единой властью",
      "kingdom": "Монархическое государство, управляемое королем или королевой",
      "republic": "Государство, где власть принадлежит избранным представителям",
      "sultanate": "Исламское государство, управляемое султаном",
      "caliphate": "Исламское государство, возглавляемое халифом, религиозным и политическим преемником Мухаммеда",
      "colonial": "Территория под иностранным контролем и управлением",
      "union": "Союзное государство, объединение нескольких территорий под единой властью",
      "federation": "Союз частично самоуправляемых государств под центральным правительством",
      "principality": "Территория, управляемая князем",
      "duchy": "Территория, управляемая герцогом",
      "tsardom": "Русская империя, управляемая царём",
      "hetmanate": "Казацкое государство, возглавляемое избранным гетманом",
      "county": "Территория, управляемая графом",
      "margraviate": "Пограничная территория, управляемая маркграфом",
      "banate": "Средневековая балканская территория, управляемая баном",
      "lordship": "Территория под властью лорда",
      "confederation": "Свободный союз независимых государств",
      "commonwealth": "Политическое сообщество, основанное для общего блага",
      "dynasty": "Последовательность правителей из одной семейной линии",
      "regency": "Правление регента вместо монарха",
      "beylik": "Турецкое княжество, управляемое беем",
      "order": "Религиозная военная организация, управляющая территорией",
      "theocracy": "Государство, управляемое религиозной властью",
      "sheikhdom": "Территория, управляемая шейхом",
      "protectorate": "Государство под защитой и контролем другого государства",
      "emirate": "Территория, управляемая эмиром",
      "imamate": "Исламское государство, возглавляемое имамом",
      "shogunate": "Японское военное правительство, возглавляемое сёгуном",
      "monarchy": "Государство, управляемое наследственным монархом",
      "dictatorship": "Авторитарное правление одного лидера или малой группы",
      "statehood": "Общая организованная политическая единица",
      "occupation": "Территория под военным контролем иностранной державы",
      "dominion": "Самоуправляемая территория в составе Британской империи"
    }
  };

  const t = translations[language];
  const explanations = typeExplanations[language];

  // Sort and filter logic
  const sortedAndFilteredCountries = useMemo(() => {
    let filtered = COUNTRIES_DATA;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.root.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(c => {
        const currentType = c.branches[c.branches.length - 1].type;
        return currentType === filterType;
      });
    }
    
    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'oldest') {
        return a.root.year - b.root.year;
      } else if (sortOrder === 'newest') {
        return b.root.year - a.root.year;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    
    return sorted;
  }, [searchTerm, filterType, sortOrder]);

  const typeOptions = ['all', 'republic', 'kingdom', 'monarchy', 'federation', 'sultanate', 'emirate', 'theocracy'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Work+Sans:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Work Sans', sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'Crimson Pro', serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
      
      {/* Header */}
      <div className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Globe2 className="w-10 h-10 text-blue-400" />
              <h1 className="text-4xl font-bold text-white">{t.title}</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === 'en'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === 'ru'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                RU
              </button>
            </div>
          </div>
          <p className="text-slate-300 text-lg">{t.subtitle}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium">
              193 {t.unMembers}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
              2 {t.observerStates}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
              {sortedAndFilteredCountries.length} {t.displayed}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="glass rounded-xl p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/90 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-400"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-300" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 bg-white/90 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="oldest">{t.sortOldest}</option>
                <option value="newest">{t.sortNewest}</option>
                <option value="alphabetical">{t.sortAlpha}</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-300" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-white/90 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {typeOptions.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? t.filterAll : t[type] || type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Country List */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="space-y-3">
          {sortedAndFilteredCountries.map((country, idx) => (
            <CountryCard
              key={country.name}
              country={country}
              index={idx + 1}
              translations={t}
              language={language}
              explanations={explanations}
              isExpanded={expandedCountry === country.name}
              onToggle={() => setExpandedCountry(expandedCountry === country.name ? null : country.name)}
            />
          ))}
        </div>

        {/* Sources Section */}
        <div className="mt-12 glass rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            📚 {language === 'ru' ? 'Источники и методология' : 'Sources & Methodology'}
          </h3>
          <div className="text-slate-300 space-y-3 text-sm">
            <p>
              {language === 'ru' 
                ? 'Данные о государственности основаны на следующих научных и академических источниках:'
                : 'Statehood data is based on the following scholarly and academic sources:'}
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <a href="https://www.britannica.com/" target="_blank" rel="noopener noreferrer" 
                 className="block p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors">
                <div className="font-semibold text-blue-300">Encyclopedia Britannica</div>
                <div className="text-xs text-slate-400 mt-1">
                  {language === 'ru' ? 'Историческая энциклопедия' : 'Historical Encyclopedia'}
                </div>
              </a>
              <a href="https://en.wikipedia.org/wiki/List_of_sovereign_states_by_date_of_formation" 
                 target="_blank" rel="noopener noreferrer"
                 className="block p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors">
                <div className="font-semibold text-blue-300">Wikipedia</div>
                <div className="text-xs text-slate-400 mt-1">
                  {language === 'ru' ? 'Список суверенных государств по дате образования' : 'List of sovereign states by formation date'}
                </div>
              </a>
              <a href="https://www.un.org/en/about-us/member-states" target="_blank" rel="noopener noreferrer"
                 className="block p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors">
                <div className="font-semibold text-blue-300">United Nations</div>
                <div className="text-xs text-slate-400 mt-1">
                  {language === 'ru' ? 'Официальный список государств-членов ООН' : 'Official UN Member States List'}
                </div>
              </a>
              <a href="https://www.worldhistory.org/" target="_blank" rel="noopener noreferrer"
                 className="block p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors">
                <div className="font-semibold text-blue-300">World History Encyclopedia</div>
                <div className="text-xs text-slate-400 mt-1">
                  {language === 'ru' ? 'Энциклопедия всемирной истории' : 'Comprehensive world history resource'}
                </div>
              </a>
              <a href="https://www.britannica.com/topic/list-of-countries-1993160" target="_blank" rel="noopener noreferrer"
                 className="block p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors">
                <div className="font-semibold text-blue-300">Countries of the World</div>
                <div className="text-xs text-slate-400 mt-1">
                  {language === 'ru' ? 'Справочник стран мира' : 'Comprehensive country profiles'}
                </div>
              </a>
              <a href="https://www.cia.gov/the-world-factbook/" target="_blank" rel="noopener noreferrer"
                 className="block p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors">
                <div className="font-semibold text-blue-300">CIA World Factbook</div>
                <div className="text-xs text-slate-400 mt-1">
                  {language === 'ru' ? 'Справочник ЦРУ по странам мира' : 'Intelligence reference on world countries'}
                </div>
              </a>
            </div>
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded">
              <p className="text-amber-200 text-xs">
                <strong>{language === 'ru' ? '⚠️ Примечание:' : '⚠️ Note:'}</strong>{' '}
                {language === 'ru' 
                  ? 'Определение "начала государственности" является предметом научных дискуссий. Даты представляют наиболее ранние задокументированные формы организованного государства на данной территории и могут варьироваться в зависимости от исторической интерпретации.'
                  : 'Defining the "beginning of statehood" is subject to scholarly debate. Dates represent the earliest broadly documented state-level formations in each territory and may vary depending on historical interpretation.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
