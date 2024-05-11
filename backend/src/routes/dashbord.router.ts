import express from 'express'
import { auth } from '../middlewares/auth.middleware'
import { dashbordControler } from '../controlers/dashbord/dashbord.controler'
export const dashbordRouter = express.Router()

dashbordRouter.get('/', auth, dashbordControler)
