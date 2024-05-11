import { Response } from 'express'
import { REQUEST_OBJECT } from '../../@types'
import { executeQuery } from '../../db/query'
import { asyncHandler } from '../../utils/asyncHandler'
import { GOAL_SCHEMA } from '../../utils/constants'
import { ApiResponce } from '../../utils/ApiResponce'

export const getUserGoalController = asyncHandler(
    async (req: REQUEST_OBJECT, res: Response) => {
        let query = `
        SELECT * 
        FROM ${GOAL_SCHEMA}
        WHERE userId = ? AND createdAt = CURRENT_DATE();
    `
        const respose = await executeQuery(query, [req.user.id])
        res.status(202).json(
            new ApiResponce({
                data: respose,
                message: 'successfully fetch data',
                sucess: true,
                statusCode: 202,
            }),
        )
    },
)
