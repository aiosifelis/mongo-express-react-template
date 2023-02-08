import bodyParser from 'body-parser'
import config from 'config'
import cors from 'cors'
import { Express, NextFunction, Response } from 'express'
import fileUpload from 'express-fileupload'
import expressRequestId from 'express-request-id'
import useragent from 'express-useragent'
import { Server as SocketServer } from 'socket.io'
import { Channel, ErrorCode, Language } from 'typings/enums'
import { IRequest } from 'typings/interfaces'
import { createLogger, getCorsOptions, resolveLanguage, translate } from 'utils'
import { Logger } from 'winston'
const cookieParser = require('cookie-parser')

const ns: string = 'utils/middleware'

export default async (app: Express, io: SocketServer) => {
    app.use(cors(getCorsOptions(config)))

    app.use(expressRequestId())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(useragent.express())

    app.use(
        fileUpload({
            limits: {
                fileSize: 50 * 1024 * 1024
            },
            safeFileNames: false,
            abortOnLimit: true
        })
    )

    app.use(async (req: IRequest, res: Response, next: NextFunction) => {
        const channel: Channel = req.header('channel')
            ? Channel.MOBILE
            : Channel.WEB
        const logger: Logger = await createLogger(`${req.id}-${channel}`)
        try {
            const language: Language = resolveLanguage(req)

            req.channel = channel
            req.logger = logger
            req.config = config
            req.language = language
            req.translate = (key: string) => translate(language, key)
            req.io = io

            next()
        } catch (error) {
            logger.error(`${ns} ${error}`)
            res.status(500).json({
                error: error.message || ErrorCode.BAD_REQUEST
            })
        }
    })

    app.use((req: IRequest, _: Response, next: NextFunction) => {
        const { logger, params, query, body, path } = req

        const loggerBody = {
            ...body
        }

        if (loggerBody.pin && process.env.NODE_ENV === 'production') {
            loggerBody.pin = '*********'
        }

        if (loggerBody.password && process.env.NODE_ENV === 'production') {
            loggerBody.password = '*********'
        }

        logger.info(
            `${ns} Path: ${path}, Headers: ${JSON.stringify(
                req.headers
            )},Params: ${JSON.stringify(params)}, Query: ${JSON.stringify(
                query
            )}, Body: ${JSON.stringify(loggerBody)}`
        )

        next()
    })
}
