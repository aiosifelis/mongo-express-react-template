import { Document, model, Schema } from 'mongoose'
import { Language } from 'typings/enums'

export interface ITranslation extends Document {
    _id?: string
    language: Language
    code: string
    value: string
}

const TranslationSchema: Schema = new Schema<ITranslation>(
    {
        language: {
            type: String,
            index: true
        },
        code: {
            type: String,
            index: true
        },
        value: String
    },
    { timestamps: true }
)

export default model<ITranslation>('Translation', TranslationSchema)
