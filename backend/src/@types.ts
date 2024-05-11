import { Request } from 'express'

// * type for the register handler payload data
export interface REGISTER_PAYLOAD_INFER {
    name: string
    email: string
    password: string
}

// * type for the api payload data
export interface API_RESPONSE_INFER {
    data: any
    message: string
    sucess: boolean
    statusCode: number
}

export interface REQUEST_OBJECT extends Request {
    [key: string]: any
}
