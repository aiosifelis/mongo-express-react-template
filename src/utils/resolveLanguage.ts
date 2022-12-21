import { languages } from 'typings/data'
import { Language } from 'typings/enums'
import { IRequest } from 'typings/interfaces'

export default (req: IRequest): Language => {
    const language: Language = req.header('Accept-Language') as Language
    const [defaultLanguage] = languages
    return languages.includes(language) ? language : defaultLanguage
}
