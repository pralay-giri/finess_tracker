import dotenv from 'dotenv'
dotenv.config()
import { MysqlError } from 'mysql'
import { connection } from './db/connection'

import { app } from './app'

// * connecting to database
connection.connect((err: MysqlError, res: any) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log('DB connection succesfully established')
    app.listen(process.env.PORT, () => {
        console.log('server listening on port %d', process.env.PORT)
    })
})
