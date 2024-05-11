import { executeQuery } from '../db/query'
import { WORKOUT_SCHEMA } from '../utils/constants'

const query = `
    CREATE TABLE 
    IF NOT EXISTS
    ${WORKOUT_SCHEMA} (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        caloriesBurn FLOAT,
        totalTimeSpend FLOAT NOT NULL,
        createdAt DATE DEFAULT(current_date()),
        userId INT,
        FOREIGN KEY (userId) REFERENCES user_model (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );
`

export const workoutModel = async () => await executeQuery(query)
