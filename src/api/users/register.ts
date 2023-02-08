import bcrypt from 'bcrypt'
import { CookieOptions, Response } from 'express'
import { Token, User } from 'models'
import { IRegisterData, IToken } from 'models/token'
import { IUser } from 'models/user'
import moment from 'moment'
import { EmailTemplate, ErrorCode, TokenType } from 'typings/enums'
import { IRequest } from 'typings/interfaces'
import { getCookieOptions, randomString, sendEmail, validate } from 'utils'

const ns: string = 'api/routes/users/register'

interface IRegisterInput {
    email: string
    firstName: string
    lastName: string
}

export default async (req: IRequest, res: Response): Promise<void> => {
    const {
        logger,
        body,
        config: {
            security: { registerCookieLife, registerCookieName },
            general: { appName }
        },
        translate
    } = req

    try {
        const { email, firstName, lastName } = body as IRegisterInput

        validate.email(email)
        validate.fullName(firstName, lastName)

        const user: IUser = await User.findOne({ email })

        if (user) {
            throw ErrorCode.EMAIL_EXISTS
        }

        const pin: string = randomString(6, 'numeric')

        const expiresAt: Date = moment()
            .add(registerCookieLife, 'seconds')
            .toDate()

        const newToken: IToken = await Token.create({
            user: null,
            type: TokenType.REGISTER,
            data: {
                firstName,
                lastName,
                email,
                pin: await bcrypt.hash(pin, 10)
            } as IRegisterData,
            createdAt: new Date(),
            expiresAt
        })

        await sendEmail(req, {
            subject: translate('EMAILS_REGISTER_SUBJECT').replace(
                '{__APP_NAME__}',
                appName
            ),
            template: EmailTemplate.REGISTER,
            to: [email],
            htmlVariables: {
                __PIN__: pin
            }
        })

        res.cookie(registerCookieName, newToken._id, {
            ...getCookieOptions(),
            expires: expiresAt
        } as CookieOptions)

        res.status(200).json(true)
    } catch (error: any) {
        logger.error(`${ns}, ${error}`)
        res.status(400).json({
            error: error.message || error
        })
    }
}
