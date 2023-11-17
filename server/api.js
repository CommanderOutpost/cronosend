// Import necessary modules
const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');

// Create an instance of an Express Router
const apiRouter = express.Router();

// Import routers for specific routes
const usersRouter = require('./routes/usersRouter');
const roomsRouter = require('./routes/roomsRouter');

// Middleware for logging requests using Morgan
apiRouter.use(morgan('dev'));

// Use the usersRouter for requests to the '/users' endpoint
apiRouter.use('/users', usersRouter);

// Use the roomsRouter for requests to the '/rooms' endpoint
apiRouter.use('/rooms', roomsRouter);

// Error handling middleware
apiRouter.use(errorhandler(), (err, req, res, next) => {
    // If the error status is not set, default to 500 (Internal Server Error)
    if (!err.status) {
        err.status = 500;
    }

    // Send the appropriate HTTP status code and the error message in the response
    return res.status(err.status).send(err.message);
});

// Export the configured apiRouter
module.exports = apiRouter;
