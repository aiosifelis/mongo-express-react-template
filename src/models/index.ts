import config from 'config/server'
import * as mongoose from 'mongoose'
import { createLogger } from 'utils'
import { Logger } from 'winston'

const ns: string = 'models/index'

export { default as Token } from './token'
export { default as User } from './user'

export default async (): Promise<void> => {
    const { mongoURI } = config

    const databaseLogger: Logger = await createLogger('Database')
    try {
        mongoose.connection.on('connecting', () =>
            databaseLogger.info(`${ns} Connecting...`)
        )

        mongoose.connection.on('connected', () =>
            databaseLogger.info(`${ns} Connected!`)
        )

        mongoose.connection.on('disconnecting', () =>
            databaseLogger.info(`${ns} Disconnecting...`)
        )

        mongoose.connection.on('disconnected', () =>
            databaseLogger.info(`${ns} Disconnected!`)
        )

        mongoose.connection.on('reconnected', () =>
            databaseLogger.info(`${ns} Reconnected!`)
        )

        mongoose.connection.on('error', (err) =>
            databaseLogger.info(`${ns} ${err}!`)
        )

        await mongoose.connect(mongoURI)
    } catch (error) {
        databaseLogger.error(ns, error)
    }
}
