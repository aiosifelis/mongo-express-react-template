import { IServerConfig } from 'typings/interfaces'
const pkg = require('../package.json')
require('dotenv').config()

const serverConfig: IServerConfig = {
    port: Number(process.env.PORT || process.env.SERVER_PORT),
    mongoURI: String(process.env.MONGO_URI),
    ftp: {
        host: String(process.env.FTP_HOST),
        user: String(process.env.FTP_USER),
        password: String(process.env.FTP_PASS),
        port: 21,
        path: String(process.env.FTP_PATH)
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
        domain: '{DOMAIN}',
        sessionCookieName: '{SESSION_COOKIE_NAME}',
        sessionCookieLife: 0,
        registerCookieName: '{REGISTER_COOKIE_NAME}',
        registerCookieLife: 0,
        resetCookieName: '{REGISTER_COOKIE_NAME}',
        resetCookieLife: 0,
        systemEmail: '{SYSTEM_EmAIL}'
    },
    general: {
        appName: '{APP_NAME}',
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
