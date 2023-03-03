import { Router } from 'express'
import { SingUp,SingIn } from '../controllers/Auth.js'
import userSchema from '../models/userSchema.js'
import loginSchema from '../models/loginSchema.js'
import { validateJoi } from '../middlewares/ValidateJoi.js'
const router = Router()


router.post('/singup',validateJoi(userSchema),SingUp)
router.post('/singin', validateJoi(loginSchema),SingIn)




export default router
