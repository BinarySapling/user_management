import express from 'express'
import userRouter from './routes/user.routes.js'

const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("User Management API is running")
})

app.use("/api/users", userRouter)

export default app;