const usernames = [];

const addToUsernames = (username) => {
    // Check if the username is already in the array
    if (usernames.includes(username)) {
        const error = new Error('Username already exists');
        error.status = 409;
        throw error;
    } else {
        usernames.push(username);
    }
};

module.exports = { addToUsernames }