const express = require('express');
const { addToRoomsDatabase, getRoomFromDatabase } = require('../../database/roomsDatabase');
const roomsRouter = express.Router()

roomsRouter.post('/', (req, res, next) => {
    const room = req.body.room;
    if (room) {
        try {
            addToRoomsDatabase(room);
        } catch (error) {
            return next(error);
        }
        res.json({ message: 'Room added' });
    } else {
        const error = new Error('Room does not exist in request body');
        error.status = 400;
        next(error);
    }
});

roomsRouter.get('/', (req, res, next) => {
    const roomName = req.query.roomname;
    if (roomName) {
        try {
            const room = getRoomFromDatabase(roomName);
            res.send(room);
        } catch (error) {
            return next(error);
        }
    }
});

module.exports = roomsRouter;