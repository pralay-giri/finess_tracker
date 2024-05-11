import express, { Errback, NextFunction, Request, Response } from 'express'
import cors from 'cors'
export const app = express()
import cookieParser from 'cookie-parser'

// middleware for all of the routes
app.use(
    cors({
        origin: process.env.FRONT_END_URL,
    }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser())

// middlewares for handeling the incomming requests
import { userRouter } from './routes/user.router'
import { dashbordRouter } from './routes/dashbord.router'
import { ApiResponce } from './utils/ApiResponce'
import { goalRouter } from './routes/goal.router'
import { workoutRouter } from './routes/workout.router'
import { statisticsRouter } from './routes/statistics.router'
app.use('/api/user', userRouter)
app.use('/api/dashboard', dashbordRouter)
app.use('/api/goal', goalRouter)
app.use('/api/workout', workoutRouter)
app.use('/api/statistics', statisticsRouter)

// * error handling for all the routes
app.use((error: Errback, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json(
        new ApiResponce({
            data: null,
            message: 'internal server error',
            statusCode: 500,
            sucess: false,
        }),
    )
})
