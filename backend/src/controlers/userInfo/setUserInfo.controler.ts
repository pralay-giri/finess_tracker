import { NextFunction, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { ApiResponce } from '../../utils/ApiResponce'
import { userInfo_model } from '../../models/info.model'
import { USER_INFO_SCHEMA } from '../../utils/constants'
import { executeQuery } from '../../db/query'
import { REQUEST_OBJECT } from '../../@types'

export const setUserInfoControler = asyncHandler(
    async (req: REQUEST_OBJECT, res: Response, next: NextFunction) => {
        const { age, weight, height, heart } = req.body
        if (
            [age, weight, height, heart].some((value) => {
                if (!value) return true
            })
        ) {
            return res.status(400).json(
                new ApiResponce({
                    data: null,
                    message: 'some of the fields are missing',
                    sucess: false,
                    statusCode: 400,
                }),
            )
        }

        // * createing the user_info model if not exist
        await userInfo_model()

        // * add the fields to the usrInfo_model with the user id
        const query = `
            INSERT
            INTO ${USER_INFO_SCHEMA} (age, weight, height, heart, userId)
            VALUE ?;
        `

        const value = [[age, weight, height, heart, req.user.id]]
        const response = await executeQuery(query, [value])
        if (!response.affectedRows) next(new Error('internal error'))
        return res.status(201).json(
            new ApiResponce({
                data: null,
                message: 'user info added successfully',
                statusCode: 201,
                sucess: true,
            }),
        )
    },
)
