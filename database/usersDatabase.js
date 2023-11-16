const { rooms } = require("./roomsDatabase");

const users = [];

const addToUsersDatabase = (user) => {

    for (let i = 0; i < rooms.length; i++) {
        const element = rooms[i];
        console.log(element.currentUsers);
        if (element.currentUsers.includes(user.username) && element.roomName === user.roomJoined) {
            const error = new Error('User already exists in room');
            error.status = 409;
            throw error;
        } else {
            users.push(user);
            break;
        }
    }
};


module.exports = { addToUsersDatabase };