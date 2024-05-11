import { Response } from 'express'
import { REQUEST_OBJECT } from '../../@types'
import { asyncHandler } from '../../utils/asyncHandler'
import { ApiResponce } from '../../utils/ApiResponce'
import { WORKOUT_SCHEMA } from '../../utils/constants'
import { workoutModel } from '../../models/workout.model'
import { executeQuery } from '../../db/query'

export const addWorkoutController = asyncHandler(
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
                    message: 'invalid fields for a valid workout',
                    statusCode: 400,
                    sucess: false,
                }),
            )
        }

        // * creating the workout model if not exist
        await workoutModel()

        // * find the workout is added some times ago
        let query = `
            SELECT * FROM ${WORKOUT_SCHEMA}
            WHERE userId=? AND name=? AND createdAt = CURRENT_DATE() LIMIT 1;
        `
        let response = await executeQuery(query, [
            req.user.id,
            workoutName.trim().toLowerCase(),
        ])
        if (response.length) {
            return res.status(403).json(
                new ApiResponce({
                    data: null,
                    message: 'already added this workout',
                    statusCode: 403,
                    sucess: false,
                }),
            )
        }

        // * query for inserting a new workout
        query = `
            INSERT INTO ${WORKOUT_SCHEMA} (name, caloriesBurn, totalTimeSpend, userId)
            VALUES ?;
        `
        const value = [
            [
                workoutName.trim().toLowerCase(),
                totalCaloriesBurned,
                totalWorkoutTime,
                req.user.id,
            ],
        ]
        response = await executeQuery(query, [value])
        if (response.affectedRows) {
            return res.status(201).json(
                new ApiResponce({
                    data: null,
                    message: 'successfully added workout',
                    statusCode: 201,
                    sucess: true,
                }),
            )
        }

        return res.status(500).json(
            new ApiResponce({
                data: null,
                message: 'faild to add workout',
                statusCode: 500,
                sucess: false,
            }),
        )
    },
)
