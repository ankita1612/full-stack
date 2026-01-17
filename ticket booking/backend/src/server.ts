import express from 'express'
import { Request, Response,NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

import dbConnect from './config/db.config'
dbConnect()
import { router } from './routes/post.route'
import { eventRouter } from './routes/event.route'
import { clockinRouter } from './routes/clockin.route'

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
app.use('/api/v1/posts', router)
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/clockin', clockinRouter)

app.listen(process.env.PORT ||3000, () => console.log('Server is listening on port 3000'))

app.use((err: any, req: Request, res: Response, next: NextFunction) => {      
  res.status(500).json({succes:false,message:err.message,data:err.stack})
})