// Initialize Socket.io connection
const socket = io();

// DOM elements
const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const messages = document.getElementById('messages');

// Retrieve user information from local storage
const user = JSON.parse(localStorage.getItem('user'));

// Function to fetch all messages for the current room from the server
const getAllMessages = async () => {
    try {
        const response = await fetch(`api/rooms/messages?roomname=${roomName}`);
        if (response.ok) {
            const responseJson = await response.json();
            return responseJson;
        }

        throw new Error('Request failed!');
    } catch (error) {
        return error;
    }
}

let typingTimeout;
let typingMessage; // Store the typing message element

input.addEventListener('input', () => {
    // Emit typing event when the user starts typing
    socket.emit('typing', user.username);

    // Clear any previous typing timeout
    clearTimeout(typingTimeout);

    // Set a new timeout to remove the "typing" message
    typingTimeout = setTimeout(() => {
        socket.emit('stoppedTyping', user.username);
    }, 1000);
});

socket.on('typing', (username) => {
    // Display or update the "typing" message
    if (username !== user.username) {
        if (!typingMessage) {
            // Create a new message if none exists
            typingMessage = document.createElement('li');
            messages.appendChild(typingMessage);
        }

        typingMessage.innerHTML = `${username} is typing...`;

        // You can also update a timestamp or add other logic here
    }
});

socket.on('stoppedTyping', (username) => {
    // Remove the "typing" message when the user stops typing
    if (typingMessage && typingMessage.innerHTML.startsWith(`${username} is typing...`)) {
        typingMessage.remove();
        typingMessage = null; // Reset the typingMessage variable
    }
});

// Function to render all messages on the page
const renderMessages = async () => {
    try {
        // Get current messages from the server
        const currentMessages = await getAllMessages();

        // Loop through messages and add each to the page
        for (let i = 0; i < currentMessages.messages.length; i++) {
            const element = currentMessages.messages[i];
            addMessageToPage(element);
        }
    } catch (error) {
        console.log(error);
    }
}

// Call renderMessages to display existing messages on page load
renderMessages();

// Function to add a message to the page
function addMessageToPage(msg) {
    const item = document.createElement('li');

    // Check if the message sender is the current user
    if (user.username === msg.sender) {
        item.textContent = `You: ${msg.message}`;
    } else {
        item.textContent = `${msg.sender}: ${msg.message}`;
    }

    // Append the message to the messages container
    messages.appendChild(item);

    // Set a timeout to remove the message after a certain time (room timer)
    setTimeout(() => {
        messages.removeChild(item);
    }, roomJson.timer * 1000);

    // Scroll to the bottom of the messages container
    window.scrollTo(0, document.body.scrollHeight);
}


// Emit a 'join' event to the server when the user joins the room
socket.emit('join', roomName);

// Event listener for the form submission (sending chat messages)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = new Date();

    // Check if the input value is not empty
    if (input.value) {
        // Emit a 'chat message' event to the server with the message details
        socket.emit('chat message', { message: input.value, roomname: roomName, time: date, sender: user.username });
        input.value = ''; // Clear the input field after sending the message
    }
});

// Socket.io event listener for incoming chat messages
socket.on('chat message', (msg) => {
    // Add the received message to the page
    addMessageToPage(msg);
});
