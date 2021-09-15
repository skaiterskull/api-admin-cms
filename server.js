import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import mongoClient from './src/config/db.js'
const app = express()

const PORT = process.env.PORT || 8000

//Middlewares
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.urlencoded())
app.use(express.json())

//Connect MongoDB
mongoClient()

//Routers
import userRouter from './src/routers/userRouter.js'
app.use('/api/v1/user', userRouter)

app.use('/', (req, res) => {
  res.send('You have reached the end of the router list')
})

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`Server is running at http://localhost:${PORT}`)
})
