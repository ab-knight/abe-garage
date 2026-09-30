import 'dotenv/config'

import cors from 'cors'
import express from 'express'

import routes from './routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, Abe Garage!')
})

app.use(routes)

export default app