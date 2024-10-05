import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { connectDB } from './config/db.js'
import userRoutes from './routes/userRoutes.js'
// dot env config this should be always on top
dotenv.config()

// connect to db
connectDB()
// using middleware
const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

// app routes
app.use('/api/v1/user', userRoutes)

app.listen(process.env.PORT ,()=>{
    console.log(`app is listening to port ${process.env.PORT}`)
})