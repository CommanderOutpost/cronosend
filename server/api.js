const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const apiRouter = express.Router();

const usernameRouter = require('./usernameRouter');

apiRouter.use(morgan('dev'));
apiRouter.use('/username', usernameRouter);

apiRouter.use(errorhandler(), (err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
    }
    return res.status(err.status).send(err.message);
});

module.exports = apiRouter;