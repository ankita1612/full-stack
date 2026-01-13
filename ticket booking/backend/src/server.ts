import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import dbConnect from './config/db.config'
dbConnect()
import { router } from './routes/post.route'
import { eventRouter } from './routes/event.route'


const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
app.use('/api/v1/posts', router)
app.use('/api/v1/events', eventRouter)

//db connection then server connection

app.listen(process.env.PORT ||3000, () => console.log('Server is listening on port 3000'))

