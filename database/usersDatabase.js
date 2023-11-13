const users = [];

const addToUsersDatabase = (user) => {
    const userExists = users.some(existingUser => {
        return existingUser.username === user.username
    });

    if (userExists) {
        const error = new Error('User already exists');
        error.status = 409;
        throw error;
    } else {
        users.push(user);
    }
    console.log(users);
};


module.exports = { addToUsersDatabase };