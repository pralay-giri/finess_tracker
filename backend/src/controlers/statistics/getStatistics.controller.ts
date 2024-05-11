import { Response } from 'express'
import { REQUEST_OBJECT } from '../../@types'
import { asyncHandler } from '../../utils/asyncHandler'
import { GOAL_SCHEMA, WORKOUT_SCHEMA } from '../../utils/constants'
import { executeQuery } from '../../db/query'
import { ApiResponce } from '../../utils/ApiResponce'

export const getStatisticsController = asyncHandler(
    async (req: REQUEST_OBJECT, res: Response) => {
        const { interval, name } = req.query
        let query
        let value

        if (
            ![
                'calories',
                'goal',
                'steps',
                'sleep',
                'water',
                'weight',
                'height',
                'heart',
            ].includes(name as string)
        ) {
            return res.status(404).json(
                new ApiResponce({
                    data: null,
                    message: 'invalid request',
                    statusCode: 404,
                    sucess: false,
                }),
            )
        }

        // * finding the query respected to the name of field
        switch (name) {
            case 'calories': {
                query = `
                    SELECT createdAt AS date, SUM(caloriesBurn) AS data FROM ${WORKOUT_SCHEMA}
                    WHERE userId = ? AND createdAt <= CURRENT_DATE() AND createdAt >= DATE_SUB(CURRENT_DATE(), INTERVAL ${interval})
                    GROUP BY createdAt
                    ORDER BY createdAt;
                `
                value = [req.user.id]
                break
            }
            case 'goal': {
                query = `
                    SELECT createdAt AS date, floor((SUM(completed) / SUM(target)) * 100) AS data
                    FROM ${GOAL_SCHEMA}
                    WHERE userId = ?
                    AND createdAt <= CURRENT_DATE()
                    AND createdAt >= DATE_SUB(CURRENT_DATE(), INTERVAL ${interval})
                    GROUP BY createdAt
                    ORDER BY createdAt;
                                 
                `
                value = [req.user.id]
                break
            }
            case 'water':
            case 'sleep':
            case 'steps': {
                query = `
                    SELECT createdAt AS date, completed AS data
                    FROM ${GOAL_SCHEMA}
                    WHERE userId = ?
                    AND name = ? 
                    AND createdAt <= CURRENT_DATE() 
                    AND createdAt >= DATE_SUB(CURRENT_DATE(), INTERVAL ${interval})
                    ORDER BY createdAt;
                `
                value = [req.user.id, name]
                break
            }
            case 'age':
            case 'weight':
            case 'heart':
            case 'height': {
                query = `
                    SELECT createdAt AS date, ${name} AS data FROM user_info
                    WHERE userId = ?
                    AND createdAt <= CURRENT_DATE() 
                    AND createdAt >= DATE_SUB(CURRENT_DATE(), interval ${interval})
                    ORDER BY createdAt;
                `
                value = [req.user.id]
            }
        }

        if (query) {
            const response = await executeQuery(query, value)
            return res.status(200).json(
                new ApiResponce({
                    message: 'successfull',
                    data: response,
                    statusCode: 200,
                    sucess: true,
                }),
            )
        }
        return res.status(500).json(
            new ApiResponce({
                data: null,
                message: 'server error',
                statusCode: 500,
                sucess: false,
            }),
        )
    },
)
