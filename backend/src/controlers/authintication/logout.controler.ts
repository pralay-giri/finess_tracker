import { Response } from 'express'
import { REQUEST_OBJECT } from '../../@types'
import { asyncHandler } from '../../utils/asyncHandler'
import { ApiResponce } from '../../utils/ApiResponce'

export const logoutControler = asyncHandler(
    (req: REQUEST_OBJECT, res: Response) => {
        // * removing the cookie and heders from the requested client
        res.clearCookie('accesstoken')
        res.clearCookie('refreshtoken')
        res.removeHeader('accesstoken')
        res.removeHeader('refreshtoken')

        res.status(200).json(
            new ApiResponce({
                data: null,
                message: 'successfully logout',
                statusCode: 200,
                sucess: true,
            }),
        )
    },
)
