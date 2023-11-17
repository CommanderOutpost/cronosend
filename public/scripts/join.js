// Select the form element in the DOM
const form = document.querySelector('form');

// Retrieve user information from local storage
const user = JSON.parse(localStorage.getItem('user'));

// Add a submit event listener to the form, calling the handleJoinForm function
form.addEventListener('submit', handleJoinForm);

// Function to handle form submission for joining a room
async function handleJoinForm(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Extract form data using FormData
    const formData = new FormData(form);

    // Set user type and room joined in the user object
    user['type'] = 'joiner';
    user['roomJoined'] = formData.get('room-name');
    user['timeJoined'] = new Date();
    console.log(user);

    // Send user data to the server
    const userToServer = await sendUserToServer(user);

    // Check the server response and update the room or log an error
    if (!(userToServer instanceof Error)) {
        // Update the room on the server
        const updatedRoom = await updateRoom('join', user);

        // Check the server response and redirect to the room page or log an error
        if (!(updatedRoom instanceof Error)) {
            // Store room name in local storage and redirect to the room page
            localStorage.setItem('roomName', updatedRoom.roomName);
            window.location.href = '/room';
        } else {
            // Log the error if room update fails
            console.log(updatedRoom);
        }
    } else {
        // Log the error if sending user data fails
        console.log(userToServer);
    }
}

// Function to update room data on the server
async function updateRoom(action, user) {
    try {
        // Make a PUT request to the server with action and user data
        const response = await fetch(`api/rooms?action=${action}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user.username, roomJoined: user.roomJoined })
        });

        // Check if the server response is successful and return the JSON data
        if (response.ok) {
            const responseJson = await response.json();
            return responseJson;
        }

        // Throw an error if the response is not successful
        throw new Error('Request failed!');
    } catch (error) {
        // Return the error if there is an issue with the request
        return error;
    }
}
