// Import necessary modules
const express = require('express');

// Import functions from the roomsDatabase module
const { addToRoomsDatabase, getRoomFromDatabase, updateRoomInDatabase, deleteRoomInDatabase } = require('../../database/roomsDatabase');

// Create an instance of an Express Router
const roomsRouter = express.Router();

// Route to handle POST requests for adding a room
roomsRouter.post('/', (req, res, next) => {
    // Extract the room object from the request body
    const room = req.body.room;

    // Check if the room object exists in the request body
    if (room) {
        try {
            // Add the room to the rooms database
            addToRoomsDatabase(room);
        } catch (error) {
            // If an error occurs during database operation, pass it to the error handling middleware
            return next(error);
        }

        // Send the room object in the response
        res.send(room);
    } else {
        // If the room object is not present in the request body, create a 400 Bad Request error
        const error = new Error('Room does not exist in the request body');
        error.status = 400;
        next(error);
    }
});

// Route to handle GET requests for fetching room details
roomsRouter.get('/', (req, res, next) => {
    // Extract the room name from the query parameters
    const roomName = req.query.roomname;

    // Check if the room name is specified in the query parameters
    if (roomName) {
        try {
            // Get the room details from the rooms database
            const room = getRoomFromDatabase(roomName);
            res.send(room);
        } catch (error) {
            // If an error occurs during database operation, pass it to the error handling middleware
            return next(error);
        }
    } else {
        const error = new Error('Roomname not specified');
        error.status = 400;
        next(error);
    }
});

// Route to handle GET requests for fetching room messages
roomsRouter.get('/messages', (req, res, next) => {
    // Extract the room name from the query parameters
    const roomName = req.query.roomname;

    // Check if the room name is specified in the query parameters
    if (roomName) {
        try {
            // Get the room details from the rooms database and send only the messages
            const room = getRoomFromDatabase(roomName);
            res.send({ messages: room.messages });
        } catch (error) {
            // If an error occurs during database operation, pass it to the error handling middleware
            return next(error);
        }
    }
});

// Route to handle PUT requests for updating room details
roomsRouter.put('/', (req, res, next) => {
    // Extract the action from the query parameters
    const action = req.query.action;

    // Check if the action is specified in the query parameters
    if (action) {
        try {
            // Update the room in the rooms database based on the specified action
            const updatedRoom = updateRoomInDatabase(action, req.body);
            res.send(updatedRoom);
        } catch (error) {
            // If an error occurs during database operation, pass it to the error handling middleware
            return next(error);
        }
    } else {
        // If no action is specified in the query parameters, create a 400 Bad Request error
        const error = new Error('No action specified');
        error.status = 400;
        next(error);
    }
});

roomsRouter.delete('/', (req, res, next) => {
    const roomName = req.query.roomname;
    if (roomName) {
        const deleteRoom = deleteRoomInDatabase(roomName);
        res.sendStatus(204);
    } else {
        const error = new Error('Roomname not specified');
        error.status = 400;
        next(error);
    }
})

// Export the configured roomsRouter
module.exports = roomsRouter;
