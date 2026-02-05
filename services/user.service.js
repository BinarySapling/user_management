import { users } from "../data/users.js";

export const createNewUser = (name, email) => {
    // Create a new user object
    const newUser = {
        id: Date.now().toString(),  // Generate a unique ID using timestamp
        name: name,
        email: email
    };
    
    // Add to users array
    users.push(newUser);
    
    // Return the created user
    return newUser;
};

export const findUserById = (id) => {
    return users.find(user => user.id === id);
};

export const findAllUsers = () => {
    return users;
};

export const updateUserById = (id, updatedFields) => {
    const user = users.find(user => user.id === id);
    if (!user) return null;
    
    // Update fields except id
    for (let field in updatedFields) {
        if (field !== 'id') {
            user[field] = updatedFields[field];
        }
    }
    
    return user;
};

export const deleteUserById = (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    return users.splice(userIndex, 1)[0];
};