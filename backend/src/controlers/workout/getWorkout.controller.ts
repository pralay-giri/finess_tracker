import { Response } from 'express'
import { REQUEST_OBJECT } from '../../@types'
import { asyncHandler } from '../../utils/asyncHandler'
import { WORKOUT_SCHEMA } from '../../utils/constants'
import { executeQuery } from '../../db/query'
import { ApiResponce } from '../../utils/ApiResponce'

// * returns all the workouts that are added in the current date
export const getWorkoutController = asyncHandler(
    async (req: REQUEST_OBJECT, res: Response) => {
        const { id: userId } = req.user
        let query = `
            SELECT * 
            FROM ${WORKOUT_SCHEMA}
            WHERE userId = ? AND createdAt = CURRENT_DATE();
        `
        const response = await executeQuery(query, [userId])

        if (response) {
            return res.status(200).json(
                new ApiResponce({
                    data: response,
                    message: 'returning all the workouts',
                    statusCode: 200,
                    sucess: true,
                }),
            )
        }
        return res.status(400).json(
            new ApiResponce({
                data: response,
                message: 'retry',
                statusCode: 400,
                sucess: true,
            }),
        )
    },
)
