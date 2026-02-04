import { users } from "../data/users.js";

// Get a single user by ID
export const getUser = (req, res) => {
    // Get the user ID from the URL parameters
    const userId = req.params.id;
    
    // Search for the user in the users array
    const foundUser = users.find(user => user.id === userId);
    
    // Check if user was found
    if (!foundUser) {
        return res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }
    
    // Send back the found user
    res.status(200).json({ 
        success: true, 
        user: foundUser 
    });
};

// Update user (full update - requires all fields)
export const updateUser = (req, res) => {
    // Get the user ID from URL
    const userId = req.params.id;
    
    // Get the new data from request body
    const { name, email } = req.body;
    
    // Find the user in the array
    const foundUser = users.find(user => user.id === userId);

    // Check if user exists
    if (!foundUser) {
        return res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }

    // Update the user fields if provided
    if (name) {
        foundUser.name = name;
    }
    if (email) {
        foundUser.email = email;
    }

    // Send back success response
    res.status(200).json({ 
        success: true, 
        message: "User updated successfully", 
        user: foundUser 
    });
};

// Patch user (partial update - can update any field)
export const patchUser = (req, res) => {
    // Get user ID from URL
    const userId = req.params.id;
    
    // Get all the fields to update from request body
    const updatedFields = req.body;
    
    // Find the user
    const foundUser = users.find(user => user.id === userId);

    // Check if user exists
    if (!foundUser) {
        return res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }

    // Update all the fields that were sent (except ID)
    for (let field in updatedFields) {
        if (field !== 'id') {
            foundUser[field] = updatedFields[field];
        }
    }

    // Send success response
    res.status(200).json({ 
        success: true, 
        message: "User patched successfully", 
        user: foundUser 
    });
};

// Delete a user
export const deleteUser = (req, res) => {
    // Get user ID from URL
    const userId = req.params.id;
    
    // Find the position of the user in the array
    const userPosition = users.findIndex(user => user.id === userId);

    // Check if user was found (-1 means not found)
    if (userPosition === -1) {
        return res.status(404).json({ 
            success: false, 
            message: "User not found" 
        });
    }

    // Remove the user from the array and save it
    const removedUser = users.splice(userPosition, 1)[0];
    
    // Send success response
    res.status(200).json({ 
        success: true, 
        message: "User deleted successfully", 
        user: removedUser 
    });
};

// Create a new user
export const createUser = (req, res) => {
    // Get name and email from request body
    const { name, email } = req.body;

    // Check if both name and email are provided
    if (!name || !email) {
        return res.status(400).json({ 
            success: false, 
            message: "Name and email are required" 
        });
    }

    // Create a new user object
    const newUser = {
        id: Date.now().toString(),  // Generate a unique ID using timestamp
        name: name,
        email: email
    };

    // Add the new user to the users array
    users.push(newUser);
    
    // Send success response with the created user
    res.status(201).json({ 
        success: true, 
        message: "User created successfully", 
        user: newUser 
    });
};


