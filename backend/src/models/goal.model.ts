import { executeQuery } from '../db/query'
import { GOAL_SCHEMA, USER_SCHEMA } from '../utils/constants'

const query = `
    CREATE TABLE 
    IF NOT EXISTS
    ${GOAL_SCHEMA} (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        target FLOAT NOT NULL,
        completed FLOAT DEFAULT(0.0),
        isDone BOOLEAN DEFAULT(false),
        unit VARCHAR(5),
        createdAt DATE DEFAULT(current_date()),
        userId INT,
        FOREIGN KEY (userId) REFERENCES ${USER_SCHEMA} (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );
`

export const goalModel = async () => await executeQuery(query)
