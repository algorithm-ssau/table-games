require('dotenv').config({path: __dirname+'/.env'})
const express = require('express')
const sequelize = require('./db')
const models = require('./src/models/models')
const cors = require('cors')
const router = require('./src/routes/index')
const errorHandler = require('./src/middleware/ErrorHadlingMiddleware')
const PORT = process.env.PORT

const app = express()
app.use(cors());
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)//Обработчик ошибок

const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Server started on ${3000}'))
    }
    catch(e){
        console.log(e)
    }
}
start()
