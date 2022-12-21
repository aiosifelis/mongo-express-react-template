import { Router } from 'express'
import create from './create'
import register from './register'

const router: Router = Router()

router.post('/', create)
router.put('/', register)

export default router
