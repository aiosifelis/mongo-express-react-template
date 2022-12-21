import { isEmpty } from 'lodash'
import { languages } from 'typings/data'
import { Language } from 'typings/enums'

const en = require('i18n/en.json')
const el = require('i18n/el.json')

export default (language: Language, key: string) => {
    const messages = {
        [Language.EN]: en,
        [Language.EL]: el
    }
    const [defaultLanguage] = languages
    const lang = languages.includes(language) ? language : defaultLanguage
    const message = messages[lang][key]
    return isEmpty(message) ? key : message
}
