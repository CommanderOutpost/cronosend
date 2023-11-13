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

module.exports = { addToRoomsDatabase, getRoomFromDatabase };