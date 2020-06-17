import en_US from '../en_US.json'
import es_ES from '../es_ES.json'
import pt_BR from '../pt_BR.json'
import zh_Hans from '../zh_Hans.json'


export default function getLocalizedText(deviceLanguage, key) {
    if (!deviceLanguage) return en_US[key];
    if (deviceLanguage.includes("es")) return es_ES[key];
    if (deviceLanguage.includes("ca")) return es_ES[key];
    if (deviceLanguage.includes("pt")) return pt_BR[key];
    if (deviceLanguage.includes("zh")) return zh_Hans[key];
    else return en_US[key];
}