// Import necessary modules
const express = require('express');

// Import functions from the usersDatabase module
const { addToUsersDatabase, userExists } = require('../../database/usersDatabase');

// Create an instance of an Express Router
const usersRouter = express.Router();

// Route to handle POST requests for adding a user
usersRouter.post('/', (req, res, next) => {
    // Extract the user object from the request body
    const user = req.body.user;

    // Check if the user object exists in the request body
    if (user) {
        try {
            // Add the user to the users database
            addToUsersDatabase(user);
        } catch (error) {
            // If an error occurs during database operation, pass it to the error handling middleware
            return next(error);
        }

        // Send a JSON response indicating that the user has been added
        res.json({ message: 'User added' });
    } else {
        // If the user object is not present in the request body, create a 400 Bad Request error
        const error = new Error('User does not exist in the request body');
        error.status = 400;
        next(error);
    }
});

// Export the configured usersRouter
module.exports = usersRouter;
