const express = require('express');
const { createServer } = require('node:http');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const server = createServer(app);
const io = require('./server/socket');

module.exports = app;

const PORT = process.env.PORT || 4001;

app.use('/public', express.static('public'));

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
    io.on('connection', (socket) => {
        console.log('a user connected');
    });
    res.sendFile('pages/room.html', { root: __dirname });
});

// Middleware for handling CORS requests from index.html
app.use(cors());


// Middleware for parsing request bodies here:
app.use(bodyParser.json());


// Mounting existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);


// This conditional is here for testing purposes:
if (!module.parent) {
    // Add your code to start the server listening at PORT below:
    server.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`);
    })
}