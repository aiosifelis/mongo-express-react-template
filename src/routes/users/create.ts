import bcrypt from 'bcrypt'
import { CookieOptions, Response } from 'express'
import { Token, User } from 'models'
import { IRegisterData, IToken } from 'models/token'
import { IUser } from 'models/user'
import { ErrorCode, TokenType } from 'typings/enums'
import { IRequest } from 'typings/interfaces'
import { getCookieOptions } from 'utils'

const ns: string = 'routes/users/create'

interface ICreateUserInput {
    pin: string
    password: string
}

export default async (req: IRequest, res: Response): Promise<void> => {
    const {
        logger,
        body,
        config: {
            security: { registerCookieName }
        }
    } = req

    try {
        const registerCookie: string = req.cookies[registerCookieName]

        const token: IToken = await Token.findOne({
            _id: registerCookie,
            type: TokenType.REGISTER,
            expiresAt: { $gt: new Date() }
        })

        if (!token) {
            throw ErrorCode.INVALID_TOKEN
        }

        const { data } = token

        const { firstName, lastName, email, pin } = data as IRegisterData

        const { password } = body as ICreateUserInput

        const isPinValid: boolean = await bcrypt.compare(body.pin, pin)

        if (!isPinValid) {
            throw ErrorCode.INVALID_PIN
        }

        const existingUser: IUser = await User.findOne({ email })

        if (existingUser) {
            throw ErrorCode.EMAIL_EXISTS
        }

        const newUser: IUser = await User.create({
            firstName,
            lastName,
            picture: '',
            email,
            password: await bcrypt.hash(password, 10),
            lastLogin: new Date(),
            createdAt: new Date()
        })

        res.clearCookie(registerCookieName, {
            ...getCookieOptions(),
            expires: new Date(),
            maxAge: 0
        } as CookieOptions)

        await Token.updateOne(
            { _id: registerCookie },
            {
                user: newUser._id,
                expiresAt: new Date()
            }
        )

        res.status(200).json(true)
    } catch (error: any) {
        logger.error(`${ns}, ${error}`)
        res.status(400).json({
            error: error.message || error
        })
    }
}
