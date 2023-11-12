const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const apiRouter = express.Router();

const usersRouter = require('./routes/usersRouter');
const roomsRouter = require('./routes/roomsRouter');

apiRouter.use(morgan('dev'));
apiRouter.use('/users', usersRouter);
apiRouter.use('/rooms', roomsRouter);

apiRouter.use(errorhandler(), (err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
    }
    return res.status(err.status).send(err.message);
});

module.exports = apiRouter;