// Select the form element in the DOM
const form = document.querySelector('form');

// Retrieve user information from local storage
const user = JSON.parse(localStorage.getItem('user'));

// Create an empty room object
const room = {};

// Add a submit event listener to the form, calling the handleCreateForm function
form.addEventListener('submit', handleCreateForm);

// Function to handle form submission for creating a room
async function handleCreateForm(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Extract form data using FormData
    const formData = new FormData(form);

    // Set user type and room owned in the user object
    user['type'] = 'creator';
    user['roomOwned'] = formData.get('room-name');

    // Populate the room object with form data and user information
    room['roomName'] = formData.get('room-name');
    room['maxUsers'] = formData.get('max-users');
    room['timer'] = formData.get('timer');
    room['roomOwner'] = user.username;
    room['currentUsersCount'] = 1;
    room['currentUsers'] = [user.username];
    room['messages'] = [];

    // Send user and room data to the server
    const userToServer = await sendUserToServer(user);
    const roomToServer = await sendRoomToServer(room);

    // Check the server response and redirect to the room page or log an error
    if (!(roomToServer instanceof Error)) {
        // Store room name in local storage and redirect to the room page
        localStorage.setItem('roomName', room.roomName);
        window.location.href = '/room';
    } else {
        // Log the error if room creation fails
        console.log(roomToServer);
    }
}

// Function to send room data to the server
async function sendRoomToServer(newRoom) {
    try {
        // Make a POST request to the server with room data
        const response = await fetch('api/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ room: newRoom })
        });

        // Check if the server response is successful and return the JSON data
        if (response.ok) {
            return await response.json();
        }

        // Throw an error if the response is not successful
        throw new Error('Response failed!');
    } catch (error) {
        // Return the error if there is an issue with the request
        return error;
    }
}
