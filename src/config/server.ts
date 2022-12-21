import { IServerConfig } from 'typings/interfaces'

const pkg = require('../../package.json')

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const serverConfig: IServerConfig = {
    port: Number(process.env.PORT || process.env.SERVER_PORT),
    mongoURI: String(process.env.MONGO_URI),
    ftp: {
        host: '.ca',
        user: String(process.env.FTP_USER),
        password: String(process.env.FTP_PASS),
        port: 21,
        path: '/files.shemp.ca/images'
    },
    email: {
        service: String(process.env.EMAIL_SERVICE),
        auth: {
            user: String(process.env.EMAIL_USERNAME),
            pass: String(process.env.EMAIL_PASSWORD)
        },
        port: Number(process.env.EMAIL_PORT)
    },
    https: Boolean(process.env.HTTPS === 'true'),
    security: {
        domain: '.restless-mind.gr',
        sessionCookieName: 'x-auth-token',
        sessionCookieLife: 31540000,
        registerCookieName: 'x-register-token',
        registerCookieLife: 1800,
        resetCookieName: 'x-reset-token',
        resetCookieLife: 1800,
        systemEmail: 'admin@restless-mind.gr'
    },
    general: {
        appName: 'RestlessMind ERP',
        version: pkg.version,
        cacheLife: 30,
        dateFormat: 'DD/MM/YYYY',
        dateTimeFormat: 'DD/MM/YYYY HH:mm',
        timeFormat: 'HH:mm',
        allowedImageExtensions: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
        allowedFileExtensions: ['pdf', 'doc', 'docx', 'txt'],
        currency: {
            symbol: '$',
            label: 'CAD'
        }
    }
}

export default serverConfig
