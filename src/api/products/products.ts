import { Request, Response } from 'express'
import { IProduct } from 'typings/interfaces'

const ns: string = 'api/routes/products/products'

export default async (req: Request, res: Response): Promise<void> => {
    try {
        const products: IProduct[] = []
        res.status(200).json({
            message: 'ok---',
            products,
            ts: Date.now()
        })
    } catch (error) {
        console.log(ns, error)
        res.status(400).json({
            error
        })
    }
}
