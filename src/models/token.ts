import { Document, model, Schema } from 'mongoose'
import { TokenType } from 'typings/enums'
import { ISession } from 'typings/interfaces'

export interface IRegisterData {
    firstName: string
    lastName: string
    email: string
    pin: string
}

export interface IResetPasswordData {
    userId: string
    pin: string
}

export interface IToken extends Document {
    _id?: string
    user?: string
    type: TokenType
    data: ISession | IRegisterData | IResetPasswordData
    expiresAt: Date
    createdAt: Date
}

const TokenSchema: Schema = new Schema<IToken>({
    user: {
        type: String,
        index: true
    },
    type: {
        type: String,
        index: true
    },
    data: Schema.Types.Mixed,
    createdAt: Date,
    expiresAt: Date
})

export default model<IToken>('Token', TokenSchema)
