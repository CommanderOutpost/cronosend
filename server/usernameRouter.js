const express = require('express');
const { addToUsernames } = require('../database/usernames');
const usernameRouter = express.Router()

usernameRouter.post('/', (req, res, next) => {
    const username = req.body.username
    if (username) {
        try {
            addToUsernames(username)
        } catch (error) {
            return next(error);
        }
        res.json({ message: 'Username added' });
    } else {
        const error = new Error('Username does not exist in request body');
        error.status = 400;
        next(error);
    }
})

module.exports = usernameRouter;