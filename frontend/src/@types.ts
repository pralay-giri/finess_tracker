export type METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export const GOAL_OPTIONS_UNIT: { [key: string]: string } = {
    steps: 'COUNT',
    water: 'L',
    sleep: 'H',
}

export interface RESPONSE_INFER {
    data: any
    message: string
    sucess: boolean
    statusCode: number
}
