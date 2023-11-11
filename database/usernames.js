const users = [];

const addToUsers = (user) => {
    // Check if the user is already in the array
    if (users.includes(user)) {
        const error = new Error('User already exists');
        error.status = 409;
        throw error;
    } else {
        users.push(user);
    }
};

module.exports = { addToUsers }