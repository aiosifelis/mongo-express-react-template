import { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
    _id?: string
    firstName: string
    lastName: string
    picture: string
    email: string
    password: string
    lastLogin: Date
    createdAt: Date
}

const UserSchema: Schema = new Schema<IUser>({
    firstName: String,
    lastName: String,
    picture: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: {
        type: String,
        maxlength: 60,
        minlength: 60
    },
    lastLogin: Date,
    createdAt: Date
})

export default model<IUser>('User', UserSchema)
