import express from 'express'
import { loginControler } from '../controlers/authintication/login.controler'
import { registerControler } from '../controlers/authintication/register.controler'
import { auth } from '../middlewares/auth.middleware'
import { setUserInfoControler } from '../controlers/userInfo/setUserInfo.controler'
import { getInfoControler } from '../controlers/userInfo/getInfo.controler'
import { logoutControler } from '../controlers/authintication/logout.controler'
export const userRouter = express.Router()

// * this router use for handaling user specific routes
userRouter.post('/register', registerControler)
userRouter.post('/login', loginControler)
userRouter.delete('/logout', logoutControler)
userRouter.post('/setUserInfo', auth, setUserInfoControler)
userRouter.get('/getInfo', auth, getInfoControler)
