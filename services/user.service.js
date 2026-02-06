import { User } from "../models/user.model.js";

export const createNewUser = async (name, email, password, role, isActive) => {
    try {
        // Create a new user document
        const newUser = new User({
            name: name,
            email: email,
            password: password,
            role: role || 'user',  // Default to 'user' if not provided
            isActive: isActive !== undefined ? isActive : true  // Use provided value or default to true
        });
        
        // Save to database
        const savedUser = await newUser.save();
        
        // Return the created user (password excluded by default)
        return savedUser;
    } catch (error) {
        throw error;
    }
};

export const findUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw error;
    }
};

export const findAllUsers = async () => {
    try {
        return await User.find().sort().limit(20).skip(1);
    } catch (error) {
        throw error;
    }
};

export const findActiveUsers = async () => {
    try {
        return await User.find({ isActive: true });
    } catch (error) {
        throw error;
    }
};

export const updateUserById = async (id, updatedFields) => {
    try {
        // Find and update the user, return the updated document
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updatedFields,
            { 
                new: true,  // Return the updated document
                runValidators: true  // Run schema validators
            }
        );
        
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

export const    deleteUserById = async (id) => {
    try {
        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(id);
        
        return deletedUser;
    } catch (error) {
        throw error;
    }
};

export const updatePasswordByEmail = async(email, password) => {
    try {
        // Find user by email and update password
        const updatedUser = await User.findOneAndUpdate(
            { email: email }, 
            { $set: { password: password } },  
            { 
                new: true,  // Return the updated document
                runValidators: true  // Run schema validators
            }
        );
        
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

export const updateNameByEmail = async(email, name) => {
    try {
        // Find user by email and update name
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { $set: { name: name } },
            {
                new: true,  // Return the updated document
                runValidators: true  // Run schema validators
            }
        );
        
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

export const deletebyEmail = async (email) => {
    try {
        // Find and delete user by email
        const deletedUser = await User.findOneAndDelete(
            { email: email }
        );
        
        return deletedUser;
    } catch (error) {
        throw error;
    }
};