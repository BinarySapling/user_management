import chalk from "chalk";
import { 
    createNewUser, 
    findUserById, 
    findAllUsers, 
    updateUserById, 
    deleteUserById 
} from "../services/user.service.js";

// Get a single user by ID
export const getUser = (req, res) => {
    const userId = req.params.id;
    const foundUser = findUserById(userId);
    
    if (!foundUser) {
        console.log(chalk.red(`✗ User not found: ${userId}`));
        return res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }
    
    console.log(chalk.green(`✓ User retrieved: ${foundUser.name} (${userId})`));
    res.status(200).json({ 
        success: true, 
        user: foundUser 
    });
};

// Update user (full update - requires all fields)
export const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    
    const updatedUser = updateUserById(userId, { name, email });

    if (!updatedUser) {
        console.log(chalk.red(`✗ Update failed: User not found (${userId})`));
        return res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }

    console.log(chalk.green(`✓ User updated: ${updatedUser.name} (${userId})`));
    res.status(200).json({ 
        success: true, 
        message: "User updated successfully", 
        user: updatedUser 
    });
};

// Patch user (partial update - can update any field)
export const patchUser = (req, res) => {
    const userId = req.params.id;
    const updatedFields = req.body;
    
    const patchedUser = updateUserById(userId, updatedFields);

    if (!patchedUser) {
        console.log(chalk.red(`✗ Patch failed: User not found (${userId})`));
        return res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }

    console.log(chalk.green(`✓ User patched: ${patchedUser.name} (${userId})`));
    res.status(200).json({ 
        success: true, 
        message: "User patched successfully", 
        user: patchedUser 
    });
};

// Delete a user
export const deleteUser = (req, res) => {
    const userId = req.params.id;
    const removedUser = deleteUserById(userId);

    if (!removedUser) {
        console.log(chalk.red(`✗ Delete failed: User not found (${userId})`));
        return res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }
    
    console.log(chalk.red.bold(`✗ User deleted: ${removedUser.name} (${userId})`));
    res.status(200).json({ 
        success: true, 
        message: "User deleted successfully", 
        user: removedUser 
    });
};

// Create a new user
export const createUser = (req, res) => {
    const { name, email } = req.body;
    
    const newUser = createNewUser(name, email);
    
    console.log(chalk.green.bold(`✓ User created: ${newUser.name} (${newUser.id})`));
    console.log(chalk.cyan(`  Email: ${newUser.email}`));
    
    res.status(201).json({ 
        success: true, 
        message: "User created successfully", 
        user: newUser 
    });
};

export const getAllUsers = (req, res) => {
    const allUsers = findAllUsers();
    
    console.log(chalk.green(`✓ Retrieved all users: ${allUsers.length} total`));
    return res.status(200).json({
        success: true,
        count: allUsers.length,
        users: allUsers
    });
};