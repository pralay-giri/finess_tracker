import { executeQuery } from '../db/query'
import { USER_INFO_SCHEMA, USER_SCHEMA } from '../utils/constants'

const query: string = `
    CREATE TABLE 
    IF NOT EXISTS
    ${USER_INFO_SCHEMA} (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        age INT NOT NULL,
        weight FLOAT NOT NULL,
        height FLOAT NOT NULL,
        heart FLOAT NOT NULL,
        updateTime DATETIME DEFAULT(CURRENT_TIME()),
        userId INT,
        FOREIGN KEY (userId) REFERENCES ${USER_SCHEMA} (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );
`

export const userInfo_model = async () => await executeQuery(query)
