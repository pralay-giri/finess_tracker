import express from 'express'
export const goalRouter = express.Router()
import { auth } from '../middlewares/auth.middleware'
import { setGoalController } from '../controlers/goal/setGoal.controller'
import { updateGoalController } from '../controlers/goal/updateGoal.controller'
import { getUserGoalController } from '../controlers/goal/getUserGoal.controller'

goalRouter.post('/setgoal', auth, setGoalController)
goalRouter.patch('/updategoal', auth, updateGoalController)
goalRouter.get('/getusergoal', auth, getUserGoalController)
