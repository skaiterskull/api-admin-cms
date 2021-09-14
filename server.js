import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
const app = express()

const PORT = process.env.PORT || 8000

app.use(helmet())
app.use(cors())
app.use(morgan())

app.use('/', (req, res) => {
  res.send('You have reached the end of the router list')
})

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error)
  }
  console.log(`Server is running at http://localhost:${PORT}`)
})
