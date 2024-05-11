import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { ApiResponce } from '../../utils/ApiResponce'
import { goalModel } from '../../models/goal.model'
import { GOAL_SCHEMA } from '../../utils/constants'
import { executeQuery } from '../../db/query'
import { REQUEST_OBJECT } from '../../@types'

export const setGoalController = asyncHandler(
    async (req: REQUEST_OBJECT, res: Response, next: NextFunction) => {
        const { name, target, unit } = req.body
        if (!name || !target || !unit) {
            return res.status(400).json(
                new ApiResponce({
                    data: null,
                    message: 'some of fields are missing',
                    statusCode: 400,
                    sucess: false,
                }),
            )
        }
        if (['water', 'sleep', 'steps'].includes(name.toLowerCase())) {
            await goalModel()

            let query = `
                SELECT * 
                FROM goal
                WHERE userId = ? AND createdAt = CURRENT_DATE() AND name=?;
            `

            const isGoalExist = await executeQuery(query, [
                req.user.id,
                name.toLowerCase(),
            ])

            if (isGoalExist && isGoalExist.length) {
                return res.status(400).json(
                    new ApiResponce({
                        data: null,
                        message: 'goal already exists',
                        statusCode: 400,
                        sucess: false,
                    }),
                )
            }

            query = `
                INSERT 
                INTO ${GOAL_SCHEMA} (name, target, unit, userId)
                VALUE ?;
            `
            const value = [[name, target, unit.toUpperCase(), req.user.id]]
            const responce = await executeQuery(query, [value])
            if (responce.affectedRows) {
                return res.status(201).json(
                    new ApiResponce({
                        data: null,
                        message: 'successfully set goal',
                        statusCode: 201,
                        sucess: true,
                    }),
                )
            }
        }
        return res.status(500).json(
            new ApiResponce({
                data: null,
                message: 'failed to set goal',
                statusCode: 500,
                sucess: false,
            }),
        )
    },
)
