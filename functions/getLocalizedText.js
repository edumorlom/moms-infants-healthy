const en_US = require('./en_US.json');
const es_ES = require('./es_ES.json');
const ht_HT = require('./ht_HT.json');

/* The purpose of this function is to translate the weekly messages to the different languages
key1 is the outter property e.g. week1 or week3
key2 is the inner property e.g. Mother or Baby
Check the json files inside the functions folder for better understanding */
module.exports = {
  translate(deviceLanguage, key1, key2) {
    if (!deviceLanguage) return en_US[key1][key2];
    if (deviceLanguage.includes('es')) return es_ES[key1][key2];
    if (deviceLanguage.includes('ca')) return es_ES[key1][key2];
    if (deviceLanguage.includes('ht')) return ht_HT[key1][key2];
    return en_US[key1][key2];
  },
};
