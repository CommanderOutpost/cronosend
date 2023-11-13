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
    console.log(rooms);
};

module.exports = { addToRoomsDatabase };