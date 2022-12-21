import config from 'config/server'
import express, { Express, Response } from 'express'
import http from 'http'
import middlewares from 'middlewares'
import connectToDatabase from 'models'
import path from 'path'
import routes from 'routes'
import { Server as SocketServer } from 'socket.io'
import {
    createLogger,
    createSocketServer,
    getCookieOptions,
    getCorsOptions
} from 'utils'
import { Logger } from 'winston'

const ns: string = 'server'

const main = async () => {
    const serverLogger: Logger = await createLogger('Server')
    try {
        const { port, https } = config
        const app: Express = express()

        if (process.env.NODE_ENV !== 'production') {
            serverLogger.info(`${ns} ServerConfig: ${JSON.stringify(config)}`)
        }

        await connectToDatabase()

        app.use(express.static('build'))

        const httpServer: http.Server = http.createServer(app)

        const socketServerOptions = {
            serveClient: true,
            path: '/socket',
            cors: getCorsOptions(config),
            cookie: getCookieOptions()
        }

        if (process.env.NODE_ENV !== 'production') {
            serverLogger.info(
                `${ns} SocketServerOptions: ${JSON.stringify(
                    socketServerOptions
                )}`
            )
        }

        const socketServer: SocketServer = new SocketServer(
            httpServer,
            socketServerOptions
        )

        createSocketServer(config, socketServer)

        middlewares(app, socketServer)
        routes(app)

        app.get('/*', (_, res: Response) =>
            res.sendFile(path.join(__dirname, '../build', 'index.html'))
        )

        httpServer.listen(Number(port) || 3001)

        httpServer.on('listening', () => {
            const addr = httpServer.address()
            const bind =
                typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port
            serverLogger.info(`${ns} Listening on ${bind} https:${https}`)
        })

        httpServer.on('error', (error: Error) => {
            // @ts-ignore
            if (error.syscall !== 'listen') {
                throw error
            }

            const bind =
                typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

            // handle specific listen errors with friendly messages
            // @ts-ignore
            switch (error.code) {
                case 'EACCES':
                    serverLogger.error(
                        `${ns} ${bind} requires elevated privileges`
                    )
                    process.exit(1)
                case 'EADDRINUSE':
                    serverLogger.error(`${ns} ${bind} is already in use`)
                    process.exit(1)
                default:
                    throw error
            }
        })
    } catch (error) {
        serverLogger.error(`${ns} System error: ${error}`)
    }
}

main()
