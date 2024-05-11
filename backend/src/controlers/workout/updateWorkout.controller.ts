import { Response } from 'express'
import { REQUEST_OBJECT } from '../../@types'
import { asyncHandler } from '../../utils/asyncHandler'
import { ApiResponce } from '../../utils/ApiResponce'
import { WORKOUT_SCHEMA } from '../../utils/constants'
import { executeQuery } from '../../db/query'

export const updateWorkoutController = asyncHandler(
    async (req: REQUEST_OBJECT, res: Response) => {
        const { totalWorkoutTime, workoutName, totalCaloriesBurned } = req.body
        if (
            !(
                workoutName.trim() &&
                totalWorkoutTime &&
                totalCaloriesBurned &&
                ['walking', 'running', 'cycling', 'swimming'].includes(
                    workoutName.trim().toLowerCase(),
                )
            )
        ) {
            return res.status(400).json(
                new ApiResponce({
                    data: null,
                    message: 'some of the fields are missing',
                    statusCode: 400,
                    sucess: false,
                }),
            )
        }

        // * find the workout is avalable
        let query = `
            SELECT * FROM ${WORKOUT_SCHEMA}
            WHERE userId=? AND name=? AND createdAt = CURRENT_DATE() LIMIT 1;
        `
        let response = await executeQuery(query, [
            req.user.id,
            workoutName.trim().toLowerCase(),
        ])

        // * check for not found
        if (!response.length) {
            return res.status(404).json(
                new ApiResponce({
                    data: null,
                    message: 'work out not found',
                    statusCode: 404,
                    sucess: false,
                }),
            )
        }

        const { totalTimeSpend, caloriesBurn } = response[0]

        query = `
            UPDATE ${WORKOUT_SCHEMA}
            SET totalTimeSpend=?, caloriesBurn=?
            WHERE name=? AND createdAt = CURRENT_DATE() AND userId=?;
        `

        response = await executeQuery(query, [
            totalTimeSpend + totalWorkoutTime,
            caloriesBurn + totalCaloriesBurned,
            workoutName.trim().toLowerCase(),
            req.user.id,
        ])

        if (!response.affectedRows) {
            return res.status(500).json(
                new ApiResponce({
                    data: null,
                    message: 'updation failed',
                    statusCode: 500,
                    sucess: false,
                }),
            )
        }

        return res.status(202).json(
            new ApiResponce({
                data: null,
                message: 'successfully updated workout',
                statusCode: 202,
                sucess: true,
            }),
        )
    },
)
