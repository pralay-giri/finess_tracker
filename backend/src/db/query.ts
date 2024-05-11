import { USER_INFO_SCHEMA, USER_SCHEMA } from '../utils/constants'
import { connection } from './connection'

export const executeQuery = (
    query: string,
    data: Array<any> = [],
): Promise<any> => {
    if (!query.trim()) throw new Error('required query')

    return new Promise((resolve, reject) => {
        connection.query(query, data, (error, result, fields) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

export const findSingleUserQuery = `
    SELECT * 
    FROM ${USER_SCHEMA}
    WHERE email = ?
    LIMIT 1;
`

export const insertingUserQuery = `
    INSERT INTO ${USER_SCHEMA} (name, email, password, refresstoken)
    VALUES ?;
`
export const findUserInfoByUserId = `
    SELECT INFO.id AS infoId, INFO.weight, INFO.height, INFO.heart, INFO.updatedAt 
    FROM ${USER_SCHEMA} AS USER
    JOIN ${USER_INFO_SCHEMA} AS INFO
    ON USER.id=INFO.userId
    WHERE USER.id=?
`
