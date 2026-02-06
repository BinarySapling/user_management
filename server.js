import app from "./app.js";
import chalk from "chalk";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB().then(() => {
    // Start server only after DB connection
    app.listen(PORT, () => {
        console.log(chalk.green.bold(`✓ Server running at port ${PORT}`));
        console.log(chalk.cyan(`→ API endpoint: http://localhost:${PORT}`));
        console.log(chalk.yellow('⚡ Ready to accept requests...'));
    });
});