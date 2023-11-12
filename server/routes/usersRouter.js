const express = require('express');
const { addToUsersDatabase, userExists } = require('../../database/usersDatabase');
const usersRouter = express.Router();

usersRouter.post('/', (req, res, next) => {
    const user = req.body.user;
    if (user) {
        try {
            addToUsersDatabase(user);
        } catch (error) {
            return next(error);
        }
        res.json({ message: 'User added' });
    } else {
        const error = new Error('User does not exist in request body');
        error.status = 400;
        next(error);
    }
});

module.exports = usersRouter;
