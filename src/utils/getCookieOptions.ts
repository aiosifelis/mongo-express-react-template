import config from 'config/server'
import { CookieOptions } from 'express'

const {
    https,
    security: { domain }
} = config

export default (): CookieOptions => ({
    httpOnly: true,
    secure: https,
    domain
})
