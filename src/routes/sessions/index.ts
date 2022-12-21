import { Router } from 'express'
import create from './create'

const router: Router = Router()

router.post('/', create)

export default router
