import { Response } from 'express'
import { REQUEST_OBJECT } from '../../@types'
import { asyncHandler } from '../../utils/asyncHandler'
import { USER_INFO_SCHEMA, USER_SCHEMA } from '../../utils/constants'
import { executeQuery } from '../../db/query'
import { ApiResponce } from '../../utils/ApiResponce'

export const getInfoControler = asyncHandler(
    async (req: REQUEST_OBJECT, res: Response) => {
        let query = `
            SELECT UM.id, UM.name, UM.email, UI.age, UI.weight, UI.height, UI.heart, UI.updateTime
            FROM ${USER_SCHEMA} AS UM
            JOIN ${USER_INFO_SCHEMA} AS UI
            ON UM.id=UI.userId
            WHERE UM.id = ?
            ORDER BY updateTime DESC
            LIMIT 1;
        `

        const response = await executeQuery(query, [req.user.id])
        if (response) {
            if (response.length) {
                return res.status(200).json(
                    new ApiResponce({
                        data: response[0],
                        message: 'success',
                        statusCode: 200,
                        sucess: true,
                    }),
                )
            }
        }
        return res.status(400).json(
            new ApiResponce({
                data: null,
                message: 'error in request',
                statusCode: 400,
                sucess: false,
            }),
        )
    },
)
