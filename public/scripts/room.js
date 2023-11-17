// Select the DOM elements needed for displaying room details
const roomNameElement = document.querySelector('#room-name');
const userCountNominator = document.querySelector('#users-count-nominator');
const userCountDenominator = document.querySelector('#users-count-denominator');
const usersDropdown = document.querySelector('#dropdown');

// Retrieve room name from local storage
const roomName = localStorage.getItem('roomName');

// Variable to store the current room details
let roomJson = null;

// Function to fetch room details from the server
const getRoomDetails = async () => {
    try {
        // Make a GET request to the server to fetch room details
        const response = await fetch(`api/rooms?roomname=${roomName}`);

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

// Function to update the UI with room details
const setRoomDetails = async () => {
    // Call the getRoomDetails function to fetch the latest room details
    roomJson = await getRoomDetails();

    // Update UI elements with the fetched room details
    roomNameElement.innerHTML = roomJson.roomName;
    userCountNominator.innerHTML = roomJson.currentUsersCount;
    userCountDenominator.innerHTML = roomJson.maxUsers;

    // Update the users dropdown with new users (if not already present)
    for (let i = 0; i < roomJson.currentUsers.length; i++) {
        const element = roomJson.currentUsers[i];

        // Check if the user is not already in the dropdown before adding
        if (!usersDropdown.querySelector(`option[value="${element}"]`)) {
            const dropdownUser = document.createElement('option');
            dropdownUser.value = element;
            dropdownUser.innerHTML = element;
            usersDropdown.appendChild(dropdownUser);
        }
    }
}

// Call setRoomDetails initially to set up the UI
setRoomDetails();

// Use setInterval to periodically update the room details
setInterval(setRoomDetails, 2000);
