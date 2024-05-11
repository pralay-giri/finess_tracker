import { NextFunction, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { REQUEST_OBJECT } from '../../@types'
import { executeQuery } from '../../db/query'
import { ApiResponce } from '../../utils/ApiResponce'
import {
    GOAL_SCHEMA,
    USER_INFO_SCHEMA,
    WORKOUT_SCHEMA,
} from '../../utils/constants'

interface PAYLOAD_INFER {
    [key: string]: any
}

export const dashbordControler = asyncHandler(
    async (req: REQUEST_OBJECT, res: Response, next: NextFunction) => {
        const payload: PAYLOAD_INFER = {}

        // * statistics for calories
        let query = `
            SELECT createdAt AS date, sum(caloriesBurn) AS data 
            FROM ${WORKOUT_SCHEMA}
            WHERE userId = ? AND createdAt <= CURRENT_DATE() AND createdAt >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH)
            GROUP BY createdAt
            ORDER BY createdAt;
        `
        let response = await executeQuery(query, [req.user.id])
        payload['caloriesStat'] = response

        // * total steps
        query = `
            SELECT name, completed AS data, unit
            FROM ${GOAL_SCHEMA}
            WHERE createdAt = CURRENT_DATE();
        `
        response = await executeQuery(query, [req.user.id, 'steps'])
        response.forEach((info: any) => {
            payload[info.name] = {
                data: info.data,
                unit: info.unit,
            }
        })

        // * goal completion status
        query = `
            SELECT createdAt, floor((completed / target) * 100) AS completed
            FROM ${GOAL_SCHEMA}
            WHERE userId=? AND createdAt = CURRENT_DATE();
        `
        response = await executeQuery(query, [req.user.id])
        if (!response.length) payload['goalData'] = null
        else {
            const sumOfPercentage = response.reduce(
                (a: number, c: any) => a + c.completed,
                0,
            )
            const totalPercentage = Math.floor(
                (sumOfPercentage / (response.length * 100)) * 100,
            )
            payload['goal'] = { data: totalPercentage, unit: '%' }
        }

        // * height, wight, heart
        query = `
            SELECT weight, height, heart FROM ${USER_INFO_SCHEMA}
            WHERE userId=?;
        `
        response = await executeQuery(query, [req.user.id])
        if (response.length) {
            payload['height'] = { data: response[0].height, unit: 'fit' }
            payload['weight'] = { data: response[0].weight, unit: 'kg' }
            payload['heart'] = { data: response[0].heart, unit: 'bmp' }
        }

        // * calories
        query = `
            SELECT SUM(caloriesBurn) AS totalCaloriesBurn 
            FROM ${WORKOUT_SCHEMA} 
            WHERE userId = ? AND createdAt = CURRENT_DATE();
        `

        response = await executeQuery(query, [req.user.id])
        payload['calories'] = {
            data: response[0].totalCaloriesBurn,
            unit: 'cal',
        }

        return res.status(200).json(
            new ApiResponce({
                data: payload,
                message: 'last 1 mounth of data',
                statusCode: 200,
                sucess: true,
            }),
        )
    },
)
