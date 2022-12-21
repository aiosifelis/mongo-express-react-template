import * as cookie from 'cookie'
import * as jwt from 'jsonwebtoken'
import { Server as SocketServer } from 'socket.io'
import { Channel, ErrorCode, SocketEvent } from 'typings/enums'
import { IServerConfig, ISession, ISocket } from 'typings/interfaces'
import { createLogger, getEncryptionKey } from 'utils'

const ns: string = 'socketServer'
let socketCount: number = 0

export default async (
    config: IServerConfig,
    socketServer: SocketServer
): Promise<void> => {
    socketServer.use(async (socket: ISocket, next: any) => {
        try {
            const {
                security: { sessionCookieName }
            } = config

            const {
                handshake: { headers, auth }
            } = socket

            const channel: Channel = auth.channel ? Channel.MOBILE : Channel.WEB

            socket.logger = await createLogger(`Socket-${socket.id}-${channel}`)

            socket.logger.info(
                `${ns} middleware socket.handshake.headers ${JSON.stringify(
                    socket.handshake.headers
                )}`
            )

            const cookies = cookie.parse(String(headers.cookie))

            const token = cookies[sessionCookieName]

            socket.logger.info(`${ns} token:${JSON.stringify(token)}`)

            const session: ISession = jwt.verify(
                token as string,
                getEncryptionKey()
            ) as ISession

            socket.session = session

            next()
        } catch (error) {
            socket.logger.error(`${ns} Access Denied ${error}`)
            return next(new Error(ErrorCode.ACCESS_DENIED))
        }
    })

    socketServer.on(SocketEvent.SOCKET_CONNECT, (socket: ISocket) => {
        socketCount++

        socket.logger.info(
            `${ns} Socket: ${socket.id} Connected. SocketCount: ${socketCount}`
        )

        socket.on(SocketEvent.SOCKET_DISCONNECT, async (reason: any) => {
            socketCount--
            socket.logger.info(
                `${ns} Socket: ${socket.id} Disconnected, Reason: ${reason}`
            )
        })
    })
}
