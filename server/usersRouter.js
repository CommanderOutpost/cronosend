const express = require('express');
const { addToUsers } = require('../database/usernames');
const usersRouter = express.Router()

usersRouter.post('/', (req, res, next) => {
    const user = req.body.user
    if (user) {
        try {
            addToUsers(user)
        } catch (error) {
            return next(error);
        }
        res.json({ message: 'User added' });
    } else {
        const error = new Error('User does not exist in request body');
        error.status = 400;
        next(error);
    }
})

module.exports = usersRouter;