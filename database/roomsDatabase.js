// Array to store rooms
const rooms = [];

// Function to add a room to the rooms array
const addToRoomsDatabase = (room) => {
    // Check if a room with the same name already exists
    const roomExists = rooms.some(existingRoom => {
        return existingRoom.roomName === room.roomName;
    });

    // If the room already exists, throw a 409 Conflict error
    if (roomExists) {
        const error = new Error('Room already exists');
        error.status = 409;
        throw error;
    } else {
        // If the room does not exist, add it to the rooms array
        rooms.push(room);
    }
    // Log the updated rooms array (for debugging purposes)
    // console.log(rooms);
};

// Function to get a room from the rooms array based on roomName
const getRoomFromDatabase = (roomName) => {
    // Initialize roomFound to null
    let roomFound = null;

    // Loop through the rooms array to find the specified room
    for (let i = 0; i < rooms.length; i++) {
        const element = rooms[i];
        if (element.roomName === roomName) {
            roomFound = element;
        }
    }

    // If no room is found, throw a 404 Not Found error
    if (!roomFound) {
        const error = new Error('No room found');
        error.status = 404;
        throw error;
    }

    // Log the found room (for debugging purposes)
    // console.log(roomFound);

    return roomFound;
};

// Function to update a room in the rooms array based on action and requestBody
const updateRoomInDatabase = (action, requestBody) => {
    // Extract roomName and username from the requestBody
    const roomName = requestBody.roomJoined;
    const username = requestBody.username;

    // If the action is 'join', update the room in the array
    if (action === 'join') {
        for (let i = 0; i < rooms.length; i++) {
            const element = rooms[i];
            if (element.roomName === roomName) {
                // Check if the room is full (maxUsers reached)
                if (Number(element.maxUsers) === Number(element.currentUsersCount)) {
                    // If room is full, throw a 409 Conflict error
                    const error = new Error('Room limit reached');
                    error.status = 409;
                    throw error;
                } else {
                    // If room is not full, update currentUsersCount and currentUsers array
                    element.currentUsersCount = Number(element.currentUsersCount) + 1;
                    element.currentUsers.push(username);
                    return element;
                }
            }
        }
    }

    // If no room is found, throw a 404 Not Found error
    const error = new Error('No room found');
    error.status = 404;
    throw error;
};

// Export the functions and the rooms array
module.exports = { addToRoomsDatabase, getRoomFromDatabase, updateRoomInDatabase, rooms };
