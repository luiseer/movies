import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config({path: './config.env'})

const db = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: process.env.DB,
    dialect: 'postgres',
    logging: false
})

export default db
