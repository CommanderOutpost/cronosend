const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const messages = document.getElementById('messages');

const user = JSON.parse(localStorage.getItem('user'));

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

const renderMessages = async () => {
    try {
        const currentMessages = await getAllMessages();
        for (let i = 0; i < currentMessages.messages.length; i++) {
            const element = currentMessages.messages[i];
            addMessageToPage(element);
        }
    } catch (error) {
        console.log(error);
    }
}

renderMessages();

function addMessageToPage(msg) {
    const item = document.createElement('li');
    console.log()
    if (user.username === msg.sender) {
        item.textContent = `You: ${msg.message}`;
    } else {
        item.textContent = `${msg.sender}: ${msg.message}`;
    }

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

socket.emit('join', roomName);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = new Date();
    if (input.value) {
        socket.emit('chat message', { message: input.value, roomname: roomName, time: date, sender: user.username });
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    addMessageToPage(msg);
});