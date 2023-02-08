import bcrypt from 'bcrypt'
import { Response } from 'express'
import userHelper from 'helpers/userHelper'
import { Token, User } from 'models'
import { IToken } from 'models/token'
import { IUser } from 'models/user'
import moment from 'moment'
import { ErrorCode, TokenType } from 'typings/enums'
import { IRequest, ISession, IUserProfile } from 'typings/interfaces'
import { getCookieOptions, getStatusCode, validate } from 'utils'

const ns: string = 'routes/sessions/create'

interface ICreateSessionInput {
    email: string
    password: string
}

export default async (req: IRequest, res: Response): Promise<void> => {
    const {
        logger,
        body,
        config: {
            security: { sessionCookieLife, sessionCookieName }
        }
    } = req

    try {
        const { email, password } = body as ICreateSessionInput

        validate.email(email)

        const user: IUser = await User.findOne({ email })

        if (!user) {
            throw ErrorCode.ACCESS_DENIED
        }

        const isPasswordValid: boolean = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordValid) {
            throw ErrorCode.ACCESS_DENIED
        }

        const session: ISession = {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picture: user.picture
        }

        const expiresAt: Date = moment()
            .add(sessionCookieLife, 'seconds')
            .toDate()

        const token: IToken = await Token.create({
            type: TokenType.SESSION,
            user: user._id,
            data: session,
            createdAt: new Date(),
            expiresAt
        })

        res.cookie(sessionCookieName, token._id, {
            ...getCookieOptions(),
            expires: expiresAt
        })

        const userProfile: IUserProfile = await userHelper.getProfile(req, user)

        res.status(200).json(userProfile)
    } catch (error) {
        logger.error(`${ns}, ${error}`)
        res.status(getStatusCode(error)).json({
            error: error.message || error
        })
    }
}
