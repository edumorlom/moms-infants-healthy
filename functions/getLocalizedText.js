const en_US = require('./en_US.json')
const es_ES = require('./es_ES.json')


module.exports = {
    translate: function (deviceLanguage, key) {
        if (!deviceLanguage) return en_US[key];
        if (deviceLanguage.includes("es")) return es_ES[key];
        if (deviceLanguage.includes("ca")) return es_ES[key];
        else return en_US[key];
    }
  };

