import { Request } from 'express'
import SMTPConnection from 'nodemailer/lib/smtp-connection'
import { Server as SocketServer, Socket } from 'socket.io'
import { Logger } from 'winston'
import { Channel, EmailTemplate, Language } from './enums'
export interface IServerConfig {
    port: number
    mongoURI: string
    ftp: {
        host: string
        user: string
        password: string
        port: number
        path: string
    }
    email: {
        service: string
        auth: SMTPConnection.Credentials
        port: number
    }
    https: boolean
    security: {
        domain: string
        sessionCookieName: string
        sessionCookieLife: number
        registerCookieName: string
        registerCookieLife: number
        resetCookieName: string
        resetCookieLife: number
        systemEmail: string
    }
    general: {
        appName: string
        version: string
        cacheLife: number
        dateFormat: string
        timeFormat: string
        dateTimeFormat: string
        allowedFileExtensions: string[]
        allowedImageExtensions: string[]
        currency: {
            symbol: string
            label: string
        }
    }
}

export interface ISocket extends Socket {
    session?: ISession
    logger: Logger
}

export interface ISession {
    userId: string
    firstName: string
    lastName: string
    email: string
    picture: string
}

export interface IRequest extends Request {
    id: string
    config: IServerConfig
    logger: Logger
    translate?: (key: string) => string
    language: Language
    session: ISession
    io: SocketServer
    channel: Channel
}

export interface IEmailConfig {
    subject: string
    from?: string
    to: string[]
    template: EmailTemplate
    htmlVariables: { [key: string]: any }
}

export interface IProduct {
    id: string
}

export interface IUserProfile {
    _id: string
    firstName: string
    lastName: string
    email: string
    picture: string
    lastLogin: Date
    locations: any[]
    admin: boolean
}
