import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
import { User } from "../models/user.model.js";

// Load environment variables
dotenv.config();

const sampleUsers = [
    { name: "John Doe", email: "john.doe@example.com", password: "password123", role: "user", isActive: true },
    { name: "Jane Smith", email: "jane.smith@example.com", password: "password123", role: "admin", isActive: true },
    { name: "Mike Johnson", email: "mike.johnson@example.com", password: "password123", role: "user", isActive: true },
    { name: "Sarah Williams", email: "sarah.williams@example.com", password: "password123", role: "moderator", isActive: true },
    { name: "David Brown", email: "david.brown@example.com", password: "password123", role: "user", isActive: false },
    { name: "Emma Davis", email: "emma.davis@example.com", password: "password123", role: "user", isActive: true },
    { name: "James Wilson", email: "james.wilson@example.com", password: "password123", role: "admin", isActive: true },
    { name: "Olivia Moore", email: "olivia.moore@example.com", password: "password123", role: "user", isActive: true },
    { name: "William Taylor", email: "william.taylor@example.com", password: "password123", role: "moderator", isActive: false },
    { name: "Sophia Anderson", email: "sophia.anderson@example.com", password: "password123", role: "user", isActive: true },
    { name: "Benjamin Thomas", email: "benjamin.thomas@example.com", password: "password123", role: "user", isActive: true },
    { name: "Isabella Jackson", email: "isabella.jackson@example.com", password: "password123", role: "admin", isActive: true },
    { name: "Lucas White", email: "lucas.white@example.com", password: "password123", role: "user", isActive: false },
    { name: "Mia Harris", email: "mia.harris@example.com", password: "password123", role: "user", isActive: true },
    { name: "Henry Martin", email: "henry.martin@example.com", password: "password123", role: "moderator", isActive: true },
    { name: "Charlotte Thompson", email: "charlotte.thompson@example.com", password: "password123", role: "user", isActive: true },
    { name: "Alexander Garcia", email: "alexander.garcia@example.com", password: "password123", role: "user", isActive: true },
    { name: "Amelia Martinez", email: "amelia.martinez@example.com", password: "password123", role: "admin", isActive: false },
    { name: "Daniel Robinson", email: "daniel.robinson@example.com", password: "password123", role: "user", isActive: true },
    { name: "Harper Clark", email: "harper.clark@example.com", password: "password123", role: "user", isActive: true }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.green.bold("✓ Connected to MongoDB"));

        // Clear existing users (optional - comment out if you want to keep existing data)
        // await User.deleteMany({});
        // console.log(chalk.yellow("⚠ Cleared existing users"));

        // Insert sample users
        const insertedUsers = await User.insertMany(sampleUsers);
        console.log(chalk.green.bold(`✓ Successfully inserted ${insertedUsers.length} sample users`));

        // Display inserted users
        insertedUsers.forEach((user, index) => {
            console.log(chalk.cyan(`${index + 1}. ${user.name} - ${user.email} - ${user.role} - Active: ${user.isActive}`));
        });

        // Close connection
        await mongoose.connection.close();
        console.log(chalk.green.bold("\n✓ Database connection closed"));
        process.exit(0);
    } catch (error) {
        console.error(chalk.red.bold("✗ Error seeding database:"), error.message);
        process.exit(1);
    }
};

seedDatabase();
