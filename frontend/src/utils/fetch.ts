import axios from 'axios'
import { METHODS, RESPONSE_INFER } from '../@types'

export const fetch = async (
    url: string,
    method: METHODS,
    payload: any,
): Promise<RESPONSE_INFER | null> => {
    if (!url.trim()) return null
    try {
        const response = await axios({
            method,
            url,
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}
