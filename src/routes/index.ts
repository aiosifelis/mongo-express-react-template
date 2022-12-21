import { Express, Request, Response } from 'express'
import products from './products'
import sessions from './sessions'
import users from './users'

export default (app: Express) => {
    app.get('/api/health', (_: Request, res: Response) => {
        res.status(200).json({ message: 'ok' })
    })
    app.use('/api/products', products)
    app.use('/api/users', users)
    app.use('/api/sessions', sessions)
}
