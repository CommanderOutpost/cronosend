const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const messages = document.getElementById('messages');

console.log(roomName);
socket.emit('join', roomName);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = new Date();
    if (input.value) {
        socket.emit('chat message', { message: input.value, roomname: roomName, time: date });
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg.message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});