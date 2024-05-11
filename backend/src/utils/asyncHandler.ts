import { NextFunction, Request, Response } from 'express'

// * this is a higher order function that handle async function execution and handle errors
// * this function prevent the writing try catch block in all the functions that can be throw error

export const asyncHandler = (handler: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next)).catch((error) => {
            next(error)
        })
    }
}
