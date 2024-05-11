import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import jwt from 'jsonwebtoken'
import { generateAccessToken, verifyToken } from '../utils/jwt'
import { executeQuery, findSingleUserQuery } from '../db/query'
import { ApiResponce } from '../utils/ApiResponce'
import { REQUEST_OBJECT } from '../@types'

// * its a important middleware that handle the authintication for procted endpoints
export const auth = asyncHandler(
    async (req: REQUEST_OBJECT, res: Response, next: NextFunction) => {
        const { accesstoken, refreshtoken } = req.cookies

        if (accesstoken) {
            const jwtPayload: string | jwt.JwtPayload | null = verifyToken(
                accesstoken,
                process.env.ACCESS_TOKEN_SECRET as string,
            )
            if (jwtPayload) {
                // @ts-ignore
                const { email } = jwtPayload
                const response = await executeQuery(findSingleUserQuery, [
                    email,
                ])
                req.user = response[0]
                // * redirect to the dashbord controler (user is authenticated)
                return next()
            }
        }

        if (refreshtoken) {
            const jwtPayload: string | jwt.JwtPayload | null = verifyToken(
                refreshtoken,
                process.env.REFRESH_TOKEN_SECRET as string,
            )
            if (jwtPayload) {
                // @ts-ignore
                const { email } = jwtPayload
                const response = await executeQuery(findSingleUserQuery, [
                    email,
                ])
                req.user = response[0]
                const accesstoken = generateAccessToken({
                    email: response[0].email,
                    name: response[0].name,
                })
                res.cookie('accesstoken', accesstoken, {
                    maxAge:
                        Number(process.env.ACCESS_TOKEN_EXPIRY_DAY) *
                        24 *
                        3600000,
                    httpOnly: true,
                })
                res.setHeader('accesstoken', accesstoken)
                // * redirect to the dashbord route (user is authenticated)
                return next()
            }
        }

        // * if refresh token is not valid then send the error message to the client to log in
        return res.status(403).json(
            new ApiResponce({
                data: null,
                message: 'your session token is invalid please login',
                statusCode: 403,
                sucess: false,
            }),
        )
    },
)
