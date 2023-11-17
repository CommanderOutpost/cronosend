// Import the rooms array from the roomsDatabase module
const { rooms } = require("./roomsDatabase");

// Array to store users
const users = [];

// Function to add a user to the users array
const addToUsersDatabase = (user) => {
    // Loop through the rooms array to check if the user already exists in a room
    for (let i = 0; i < rooms.length; i++) {
        const element = rooms[i];
        console.log(element.currentUsers);

        // Check if the user is already in the current room
        if (element.currentUsers.includes(user.username) && element.roomName === user.roomJoined) {
            // If the user already exists in the room, throw a 409 Conflict error
            const error = new Error('User already exists in room');
            error.status = 409;
            throw error;
        } else {
            // If the user is not in the current room, add the user to the users array and break the loop
            users.push(user);
            break;
        }
    }
};

// Export the addToUsersDatabase function
module.exports = { addToUsersDatabase };
