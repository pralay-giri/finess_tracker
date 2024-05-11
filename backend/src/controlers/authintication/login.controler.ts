import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import { ApiResponce } from '../../utils/ApiResponce'
import { executeQuery, findSingleUserQuery } from '../../db/query'
import { verifyPassword } from '../../utils/Password'
import { generateAccessToken, generateRefressToken } from '../../utils/jwt'

export const loginControler = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, password } = req.body

        // * Check for all the required fields
        if (
            [email, password].some((value) => {
                if (!value.trim().length) return true
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

        // * finding the user if exists or not
        const response = await executeQuery(findSingleUserQuery, [email])
        if (!response.length) {
            return res.status(404).json(
                new ApiResponce({
                    data: null,
                    message: 'user not found',
                    sucess: false,
                    statusCode: 404,
                }),
            )
        }

        const isValidPassword: boolean = await verifyPassword(
            response[0].password,
            password,
        )
        if (!isValidPassword) {
            return res.status(403).json(
                new ApiResponce({
                    data: null,
                    message: 'authentication failed',
                    sucess: false,
                    statusCode: 403,
                }),
            )
        }

        const accessToken = generateAccessToken({
            email,
            name: response[0].name,
        })
        const refreshToken = generateRefressToken({ email })

        // * setting the refresh and access token in the clients cookie or headers
        res.cookie('refreshtoken', refreshToken, {
            maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY_DAY) * 24 * 3600000,
            httpOnly: true,
        })

        res.cookie('accesstoken', accessToken, {
            maxAge: Number(process.env.ACCESS_TOKEN_EXPIRY_DAY) * 24 * 3600000,
            httpOnly: true,
        })

        res.setHeader('refreshtoken', refreshToken)
        res.setHeader('accesstoken', accessToken)

        const payload = {
            id: response[0].id,
            name: response[0].name,
            email: response[0].email,
        }

        return res.status(200).json(
            new ApiResponce({
                data: payload,
                sucess: true,
                message: 'successfully login',
                statusCode: 200,
            }),
        )
    },
)
