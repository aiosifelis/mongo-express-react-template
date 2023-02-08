import config from 'config'
import { Format } from 'logform'
import winston, { Logger } from 'winston'
require('winston-mongodb')

export default async (traceId: string): Promise<Logger> => {
    try {
        const { createLogger, transports, format } = winston
        const { combine, timestamp, printf, colorize, label } = format

        const loggerFormat: Format = printf(
            (info: winston.Logform.TransformableInfo): string =>
                `${info.label}:[${info.timestamp}][${info.level}]:${info.message}`
        )

        return createLogger({
            format: combine(
                label({ label: traceId }),
                colorize(),
                timestamp(),
                loggerFormat
            ),
            transports: [
                new transports.Console(),
                // @ts-ignore
                new transports.MongoDB({
                    label: traceId,
                    decolorize: true,
                    db: config.mongoURI,
                    collection: 'logs',
                    capped: true,
                    cappedSize: 30000000,
                    options: {
                        useUnifiedTopology: true
                    }
                })
            ]
        })
    } catch (error) {
        throw error
    }
}
