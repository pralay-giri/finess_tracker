import express from 'express'
import { auth } from '../middlewares/auth.middleware'
import { addWorkoutController } from '../controlers/workout/addWorkout.controller'
import { updateWorkoutController } from '../controlers/workout/updateWorkout.controller'
import { getWorkoutController } from '../controlers/workout/getWorkout.controller'
export const workoutRouter = express.Router()

workoutRouter.post('/add', auth, addWorkoutController)
workoutRouter.patch('/update', auth, updateWorkoutController)
workoutRouter.get('/getworkout', auth, getWorkoutController)
