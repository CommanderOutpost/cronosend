const rooms = [];

const addToRoomsDatabase = (room) => {
    const roomExists = rooms.some(existingRoom => {
        return existingRoom.roomName === room.roomName
    });

    if (roomExists) {
        const error = new Error('Room already exists');
        error.status = 409;
        throw error;
    } else {
        rooms.push(room);
    }
    // console.log(rooms);
};

const getRoomFromDatabase = (roomName) => {
    let roomFound = null;

    for (let i = 0; i < rooms.length; i++) {
        const element = rooms[i];
        if (element.roomName === roomName) {
            roomFound = element;
        }
    }

    if (!roomFound) {
        const error = new Error('No room found');
        error.status = 404;
        throw error;
    }

    // console.log(roomFound);

    return roomFound;
}

const updateRoomInDatabase = (action, requestBody) => {
    const roomName = requestBody.roomJoined;
    const username = requestBody.username;

    if (action === 'join') {
        for (let i = 0; i < rooms.length; i++) {
            const element = rooms[i];
            if (element.roomName === roomName) {
                if (Number(element.maxUsers) === Number(element.currentUsersCount)) {
                    const error = new Error('Room limit reached');
                    error.status = 409;
                    throw error;
                } else {
                    element.currentUsersCount = Number(element.currentUsersCount) + 1
                    element.currentUsers.push(username);
                    return element;
                }
            }
        }
    }

    const error = new Error('No room found');
    error.status = 404;
    throw error;
}

module.exports = { addToRoomsDatabase, getRoomFromDatabase, updateRoomInDatabase, rooms };