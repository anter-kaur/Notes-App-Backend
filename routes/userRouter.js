import express from 'express'

import {register,login,dashboard,logout} from '../controllers/userController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const router=express.Router();



router.post('/register',register)
router.post('/login',login)

router.get('/logout',logout)
router.get('/dashboard',AuthMiddleware,dashboard)

export default router;