import { NextFunction, Response } from 'express'
import { isEmpty } from 'lodash'
import { ErrorCode } from 'typings/enums'
import { IRequest, ISession } from 'typings/interfaces'
import { getSession, getStatusCode } from 'utils'

const ns: string = 'middlewares/session'

export default async (req: IRequest, res: Response, next: NextFunction) => {
    const { logger } = req
    try {
        const session: ISession = await getSession(req)

        if (isEmpty(session)) {
            throw ErrorCode.ACCESS_DENIED
        }

        req.session = session

        next()
    } catch (error) {
        logger.error(`${ns} Error: ${error}`)
        res.status(getStatusCode(error.message ? error.message : error)).json({
            error: error.message || ErrorCode.ACCESS_DENIED
        })
    }
}
