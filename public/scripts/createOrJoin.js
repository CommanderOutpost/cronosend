// Select the DOM elements needed for interaction
const userUsername = document.querySelector('#user-username'); // Get the element displaying the user's username
const createButton = document.querySelector('#create'); // Get the 'Create' button
const joinButton = document.querySelector('#join'); // Get the 'Join' button

// Retrieve user information from local storage
const user = JSON.parse(localStorage.getItem('user')); // Parse the user information stored in local storage

// Set the user's username in the UI
userUsername.innerHTML = user['username'];

// Event listener for the 'Create' button click
createButton.addEventListener('click', () => {
    // Redirect the user to the 'create' page when the 'Create' button is clicked
    window.location.href = 'create';
});

// Event listener for the 'Join' button click
joinButton.addEventListener('click', () => {
    // Redirect the user to the 'join' page when the 'Join' button is clicked
    window.location.href = 'join';
});
