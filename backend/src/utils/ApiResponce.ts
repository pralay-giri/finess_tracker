import { API_RESPONSE_INFER } from '../@types'

export class ApiResponce implements API_RESPONSE_INFER {
    data = {}
    message = ''
    sucess = true
    statusCode = 200
    constructor({ data, message, sucess, statusCode }: API_RESPONSE_INFER) {
        this.data = data
        this.message = message
        this.sucess = sucess
        this.statusCode = statusCode
    }
}
