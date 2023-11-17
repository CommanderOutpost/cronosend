// Import necessary modules
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an instance of Express and a server using createServer
const app = express();
const server = createServer(app);

// Create an instance of Socket.io attached to the server
const io = new Server(server);

// Export the app instance for external use
module.exports = app;

// Set the port number for the server, defaulting to 4001
const PORT = process.env.PORT || 4001;

// Serve static files from the 'public' directory under the '/public' path
app.use('/public', express.static('public'));

// Define routes to serve HTML pages
app.get('/', (req, res, next) => {
    res.sendFile('pages/username.html', { root: __dirname });
});

app.get('/createorjoin', (req, res, next) => {
    res.sendFile('pages/createorjoin.html', { root: __dirname });
});

app.get('/create', (req, res, next) => {
    res.sendFile('pages/create.html', { root: __dirname });
});

app.get('/join', (req, res, next) => {
    res.sendFile('pages/join.html', { root: __dirname });
});

app.get('/room', (req, res, next) => {
    res.sendFile('pages/room.html', { root: __dirname });
});

// Socket.io event handling for connections, joins, and chat messages
io.on('connection', (socket) => {
    socket.on('join', (roomname) => {
        socket.join(roomname);
    });

    socket.on('typing', (username) => {
        io.emit('typing', username);
    })

    socket.on('stoppedTyping', (username) => {
        io.emit('stoppedTyping', username);
    })

    socket.on('chat message', (msg) => {
        const roomname = msg.roomname;
        io.to(roomname).emit('chat message', msg);
        const room = getRoomFromDatabase(roomname);
        room.messages.push(msg);
        setTimeout(() => {
            room.messages.shift();
        }, room.timer * 1000);
    });
});

// Middleware for handling CORS requests from index.html
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Mounting existing apiRouter at the '/api' path
const apiRouter = require('./server/api');
const { getRoomFromDatabase } = require('./database/roomsDatabase');
app.use('/api', apiRouter);

// Start the server listening at the specified PORT
if (!module.parent) {
    server.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    });
}
