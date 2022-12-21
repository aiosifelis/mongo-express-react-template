import { Format } from 'logform'
import winston, { Logger } from 'winston'
import { FileTransportOptions } from 'winston/lib/winston/transports'

export default async (traceId: string): Promise<Logger> => {
    try {
        const { createLogger, transports, format } = winston
        const { combine, timestamp, printf, colorize, label } = format

        const loggerFormat: Format = printf(
            (info: winston.Logform.TransformableInfo): string =>
                `${info.label}:[${info.timestamp}][${info.level}]:${info.message}`
        )

        const fileTransportOptions: FileTransportOptions = {
            dirname: './logs',
            maxsize: 5242880
        }

        return createLogger({
            format: combine(
                label({ label: traceId }),
                colorize(),
                timestamp(),
                loggerFormat
            ),
            transports: [
                new transports.Console(),
                new transports.File({
                    ...fileTransportOptions,
                    filename: 'warn.log',
                    level: 'warn'
                }),
                new transports.File({
                    ...fileTransportOptions,
                    filename: 'error.log',
                    level: 'error'
                }),
                new transports.File({
                    ...fileTransportOptions,
                    filename: 'info.log',
                    level: 'info'
                })
            ]
        })
    } catch (error) {
        throw error
    }
}
