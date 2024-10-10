import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routes from './routes.js'

const app = express()

app.use(bodyParser.json())

app.use(routes)

mongoose.connect(
  `mongodb://127.0.0.1:27017/banhang_tin_55`
)


app.listen(3000, () => {
  console.log('Web server is listening on port 3000.')
})
