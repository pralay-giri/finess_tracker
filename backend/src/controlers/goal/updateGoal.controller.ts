import { Response, NextFunction } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { REQUEST_OBJECT } from '../../@types'
import { ApiResponce } from '../../utils/ApiResponce'
import { GOAL_SCHEMA } from '../../utils/constants'
import { executeQuery } from '../../db/query'

export const updateGoalController = asyncHandler(
    async (req: REQUEST_OBJECT, res: Response, next: NextFunction) => {
        const { type, completed } = req.body

        // * find if its not a valid goal for update
        if (
            !(
                type.trim() &&
                completed &&
                ['water', 'sleep', 'calories', 'steps'].includes(
                    type.toLowerCase(),
                )
            )
        ) {
            return res.status(400).json(
                new ApiResponce({
                    data: null,
                    message: 'update failed',
                    statusCode: 400,
                    sucess: false,
                }),
            )
        }

        // * query finding the goal if its already done or not exist
        let query = `
            SELECT * FROM ${GOAL_SCHEMA}
            WHERE userId=? AND name=? AND isDone=false AND createdAt = CURRENT_DATE();
        `

        let response = await executeQuery(query, [
            req.user.id,
            type.toLowerCase(),
        ])

        if (!response.length) {
            return res.status(404).json(
                new ApiResponce({
                    data: null,
                    message: 'goal not found',
                    statusCode: 404,
                    sucess: false,
                }),
            )
        }

        const previousGoalValue = response[0].completed
        // * query for the updation of the goal
        query = `
            UPDATE ${GOAL_SCHEMA}
            SET completed=?, isDone = CASE WHEN completed >= target THEN 1 ELSE 0 END
            where userId=? AND name=?;
        `
        response = await executeQuery(query, [
            previousGoalValue + Number(completed),
            req.user.id,
            type.toLowerCase(),
        ])
        if (!response.affectedRows) {
            return res.status(400).json(
                new ApiResponce({
                    data: null,
                    message: 'update failed',
                    statusCode: 400,
                    sucess: false,
                }),
            )
        }
        return res.status(200).json(
            new ApiResponce({
                data: null,
                message: 'updated successfully',
                statusCode: 200,
                sucess: true,
            }),
        )
    },
)
