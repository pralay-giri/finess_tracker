import express from 'express'
import { auth } from '../middlewares/auth.middleware'
import { getStatisticsController } from '../controlers/statistics/getStatistics.controller'
export const statisticsRouter = express.Router()

statisticsRouter.get('/getStatistics', auth, getStatisticsController)
