import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import mongoClient from './src/config/db.js'
const app = express()
import path from 'path'

const PORT = process.env.PORT || 8000

//Middlewares
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.urlencoded())
app.use(express.json())

//Connect MongoDB
mongoClient()

//Serve static files from public dir
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

//Routers
import userRouter from './src/routers/userRouter.js'
import categoryUser from './src/routers/categoryRouter.js'
import tokenRouter from './src/routers/tokenRouter.js'
import productRouter from './src/routers/productRouter.js'
import { isAdminAuth } from './src/middlewares/auth.middleware.js'

app.use('/api/v1/user', userRouter)
app.use('/api/v1/category', isAdminAuth, categoryUser)
app.use('/api/v1/token', tokenRouter)
app.use('/api/v1/product', isAdminAuth, productRouter)

app.use('/', (req, res) => {
  res.send('You have reached the end of the router list')
})

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`Server is running at http://localhost:${PORT}`)
})
