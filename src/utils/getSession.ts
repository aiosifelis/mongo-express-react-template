import { isEmpty } from 'lodash'
import { Token } from 'models'
import { IToken } from 'models/token'
import { TokenType } from 'typings/enums'
import { IRequest, ISession } from 'typings/interfaces'

export default async (req: IRequest): Promise<ISession | null> => {
    try {
        const {
            config: {
                security: { sessionCookieName }
            }
        } = req

        const cookie: string = req.cookies[sessionCookieName]

        if (isEmpty(cookie)) {
            return null
        }

        const token: IToken = await Token.findOne({
            _id: cookie,
            type: TokenType.SESSION,
            expiresAt: { $gt: new Date() }
        })

        if (!token) {
            return null
        }

        const session: ISession = token.data as ISession

        return session
    } catch (error) {
        return null
    }
}
