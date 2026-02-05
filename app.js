import express from 'express'
import chalk from 'chalk'
import userRouter from './routes/user.routes.js'

const app = express()

app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(chalk.blue(`[${timestamp}]`), chalk.magenta(req.method), chalk.white(req.path));
    next();
});

app.get("/",(req,res)=>{
    res.send("User Management API is running")
})

app.use("/api/users", userRouter)

export default app;