import { USER_SCHEMA } from '../utils/constants'
import { executeQuery } from '../db/query'

const query: string = `
    CREATE TABLE 
    IF NOT EXISTS 
    ${USER_SCHEMA} (
	    id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(24) NOT NULL,
        password VARCHAR(100) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        refresstoken VARCHAR(200) NOT NULL
    );
`

export const userModel = async () => {
    await executeQuery(query)
}
