import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";


dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.green.bold(`✓ MongoDB connected successfully`));
        console.log(chalk.cyan(`  Host: ${conn.connection.host}`));
        console.log(chalk.cyan(`  Database: ${conn.connection.name}`));
    } catch (error) {
        console.log(chalk.red.bold('✗ MongoDB connection failed:'), error.message);
        process.exit(1);
    }
};

export default connectDB;
