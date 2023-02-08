import { Router } from 'express'
import products from './products'

const router: Router = Router()

router.get('/', products)

export default router
