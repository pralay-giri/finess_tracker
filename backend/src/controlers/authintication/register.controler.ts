import { NextFunction, Request, Response } from 'express'
import { REGISTER_PAYLOAD_INFER } from '../../@types'
import { userModel } from '../../models/user.model'
import { asyncHandler } from '../../utils/asyncHandler'
import { ApiResponce } from '../../utils/ApiResponce'
import {
    executeQuery,
    findSingleUserQuery,
    insertingUserQuery,
} from '../../db/query'
import { generateAccessToken, generateRefressToken } from '../../utils/jwt'
import { hashPassword } from '../../utils/Password'
import { USER_SCHEMA } from '../../utils/constants'

// * this controler is responsible for registering and signing users
export const registerControler = asyncHandler(
    async (req: Request, res: Response) => {
        // * creates user Schema object if not exist
        await userModel()

        const { name, email, password }: REGISTER_PAYLOAD_INFER = req.body

        // * Check for all the required fields
        if (
            [name, email, password].some((value) => {
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

        // * finding the user if it exists
        const [data] = await executeQuery(findSingleUserQuery, [email])
        if (data) {
            return res.status(400).json(
                new ApiResponce({
                    data: null,
                    message: 'already exists',
                    sucess: false,
                    statusCode: 400,
                }),
            )
        }

        // * generating and hashing the refresh, access token and password
        const accessToken = generateAccessToken({ email, name })
        const refreshToken = generateRefressToken({ email })
        const hashedPassword = await hashPassword(password)

        // * inserting the user into the db
        let values = [[name, email, hashedPassword, refreshToken]]
        let response = await executeQuery(insertingUserQuery, [values])
        if (!response.affectedRows) {
            return res.status(500).json(
                new ApiResponce({
                    data: null,
                    message: 'sign up faild',
                    sucess: false,
                    statusCode: 500,
                }),
            )
        }

        // * fetching the inserted user for sending the responce to the client
        response = await executeQuery(
            `SELECT * 
        FROM ${USER_SCHEMA}
        WHERE email = ?
        LIMIT 1;`,
            [email],
        )

        const payload = {
            id: response[0].id,
            name: response[0].name,
            email: response[0].email,
        }

        /**
         * setting the refresh and access token in the clients cookie and headers
         * access token will be expire in 2 days after creation and refresh token will be 30 days
         */
        const refreshTokenExpiry =
            new Date().getTime() +
            Number(process.env.REFRESH_TOKEN_EXPIRY_DAY) * 24 * 360000
        const accessTokenExpiry =
            new Date().getTime() +
            Number(process.env.ACCESS_TOKEN_EXPIRY_DAY) * 24 * 360000

        res.cookie('refreshtoken', refreshToken, {
            maxAge:
                Date.now() +
                Number(process.env.REFRESH_TOKEN_EXPIRY_DAY) * 24 * 360000,
            expires: new Date(refreshTokenExpiry),
            httpOnly: true,
        })

        res.cookie('accesstoken', accessToken, {
            maxAge:
                Date.now() +
                Number(process.env.ACCESS_TOKEN_EXPIRY_DAY) * 24 * 360000,
            expires: new Date(accessTokenExpiry),
            httpOnly: true,
        })
        res.setHeader('refreshtoken', refreshToken)
        res.setHeader('accesstoken', accessToken)

        return res.status(201).json(
            new ApiResponce({
                data: payload,
                sucess: true,
                message: 'successfully registered',
                statusCode: 201,
            }),
        )
    },
)
