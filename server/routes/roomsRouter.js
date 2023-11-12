const express = require('express');
const { addToRoomsDatabase } = require('../../database/roomsDatabase');
const roomsRouter = express.Router()

roomsRouter.post('/', (req, res, next) => {
    const room = req.body.room
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
    }
});

module.exports = roomsRouter;