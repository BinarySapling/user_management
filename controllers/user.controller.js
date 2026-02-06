import chalk from "chalk";
import { 
    createNewUser, 
    findUserById, 
    findAllUsers, 
    findActiveUsers,
    updateUserById, 
    deleteUserById,
    updatePasswordByEmail,
    updateNameByEmail,
    deletebyEmail
} from "../services/user.service.js";

// Get a single user by ID
export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const foundUser = await findUserById(userId);
        
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
    } catch (error) {
        console.log(chalk.red(`✗ Error retrieving user: ${error.message}`));
        res.status(500).json({ 
            success: false, 
            message: "Error retrieving user",
            error: error.message 
        });
    }
};

// Update user (full update - requires all fields)
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password, role, isActive } = req.body;
        
        const updateData = { name, email };
        if (password) updateData.password = password;
        if (role) updateData.role = role;
        if (isActive !== undefined) updateData.isActive = isActive;
        
        const updatedUser = await updateUserById(userId, updateData);

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
    } catch (error) {
        console.log(chalk.red(`✗ Error updating user: ${error.message}`));
        res.status(500).json({ 
            success: false, 
            message: "Error updating user",
            error: error.message 
        });
    }
};

// Patch user (partial update - can update any field)
export const 

patchUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedFields = req.body;
        
        const patchedUser = await updateUserById(userId, updatedFields);

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
    } catch (error) {
        console.log(chalk.red(`✗ Error patching user: ${error.message}`));
        res.status(500).json({ 
            success: false, 
            message: "Error patching user",
            error: error.message 
        });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const removedUser = await deleteUserById(userId);

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
    } catch (error) {
        console.log(chalk.red(`✗ Error deleting user: ${error.message}`));
        res.status(500).json({ 
            success: false, 
            message: "Error deleting user",
            error: error.message 
        });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role, isActive } = req.body;
        
        const newUser = await createNewUser(name, email, password, role, isActive);
        
        console.log(chalk.green.bold(`✓ User created: ${newUser.name} (${newUser._id})`));
        console.log(chalk.cyan(`  Email: ${newUser.email}`));
        
        res.status(201).json({ 
            success: true, 
            message: "User created successfully", 
            user: newUser 
        });
    } catch (error) {
        console.log(chalk.red(`✗ Error creating user: ${error.message}`));
        
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(409).json({ 
                success: false, 
                message: "Email already exists",
                error: "Duplicate email" 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: "Error creating user",
            error: error.message 
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await findAllUsers();
        
        console.log(chalk.green(`✓ Retrieved all users: ${allUsers.length} total`));
        return res.status(200).json({
            success: true,
            count: allUsers.length,
            users: allUsers
        });
    } catch (error) {
        console.log(chalk.red(`✗ Error retrieving users: ${error.message}`));
        res.status(500).json({ 
            success: false, 
            message: "Error retrieving users",
            error: error.message 
        });
    }
};

export const getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await findActiveUsers();
        
        console.log(chalk.green(`✓ Retrieved active users: ${activeUsers.length} total`));
        return res.status(200).json({
            success: true,
            count: activeUsers.length,
            users: activeUsers
        });
    } catch (error) {
        console.log(chalk.red(`✗ Error retrieving active users: ${error.message}`));
        res.status(500).json({ 
            success: false, 
            message: "Error retrieving active users",
            error: error.message 
        });
    }
};

export const updatePasswordByEmailController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            console.log(chalk.red(`✗ Email and password are required`));
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }
        
        // Validate password length
        if (password.length < 6) {
            console.log(chalk.red(`✗ Password must be at least 6 characters`));
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 6 characters" 
            });
        }
        
        const updatedUser = await updatePasswordByEmail(email, password);
        
        if (!updatedUser) {
            console.log(chalk.red(`✗ User not found with email: ${email}`));
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        console.log(chalk.green(`✓ Password updated for user: ${updatedUser.name} (${email})`));
        res.status(200).json({ 
            success: true, 
            message: "Password updated successfully",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            }
        });
    } catch (error) {
        console.log(chalk.red(`✗ Error updating password: ${error.message}`));
        res.status(500).json({ 
            success: false, 
            message: "Error updating password",
            error: error.message 
        });
    }
};

export const updateNameByEmailController = async (req, res) => {
    try {
        const { email, updatedata } = req.body;
        
        // Validate input
        if (!email || !updatedata || !updatedata.name) {
            console.log(chalk.red(`✗ Email and updatedata.name are required`));
            return res.status(400).json({ 
                success: false, 
                message: "Email and updatedata.name are required" 
            });
        }
        
        const name = updatedata.name;
        
        // Validate name length
        if (name.trim().length < 2) {
            console.log(chalk.red(`✗ Name must be at least 2 characters`));
            return res.status(400).json({ 
                success: false, 
                message: "Name must be at least 2 characters" 
            });
        }
        
        const updatedUser = await updateNameByEmail(email, name);
        
        if (!updatedUser) {
            console.log(chalk.red(`✗ User not found with email: ${email}`));
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        console.log(chalk.green(`✓ Name updated for user: ${updatedUser.name} (${email})`));
        res.status(200).json({ 
            success: true, 
            message: "Name updated successfully",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            }
        });
    } catch (error) {
        console.log(chalk.red(`✗ Error updating name: ${error.message}`));
        res.status(500).json({ 
            success: false, 
            message: "Error updating name",
            error: error.message 
        });
    }
};

export const deleteUserByEmailController = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Validate input
        if (!email) {
            console.log(chalk.red(`✗ Email is required`));
            return res.status(400).json({ 
                success: false, 
                message: "Email is required" 
            });
        }
        
        const deletedUser = await deletebyEmail(email);
        
        if (!deletedUser) {
            console.log(chalk.red(`✗ User not found with email: ${email}`));
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        console.log(chalk.red.bold(`✗ User deleted: ${deletedUser.name} (${email})`));
        res.status(200).json({ 
            success: true, 
            message: "User deleted successfully",
            user: {
                _id: deletedUser._id,
                name: deletedUser.name,
                email: deletedUser.email
            }
        });
    } catch (error) {
        console.log(chalk.red(`✗ Error deleting user: ${error.message}`));
        res.status(500).json({ 
            success: false, 
            message: "Error deleting user",
            error: error.message 
        });
    }
};