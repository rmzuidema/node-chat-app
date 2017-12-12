const express = require('express');
const path = require('path');
const http = require('http');

var socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');

//console.log(__dirname+ '/../public');
//console.log(publicPath);

var app = express();
app.use('/', express.static(publicPath));
// var server = http.createServer((req, res) => {

// });

// can be used as:
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=> {
    //console.log('New user connected');

    // socket.emit('newEmail', {
    //     from: 'm@one.com',
    //     subject: 'Hello there',
    //     text: 'Where heave you been?',
    //     createAt: 545646
    // });

    socket.on('createMessage', (message) => {
        // use io so it emits to all users
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail ', newEmail);
    // });   
    
    socket.on('disconnect', () => {
        console.log('Disconnected from client');
    });
});



const port = process.env.PORT || 3000;

// called with server instead of app
server.listen(port, () => {
    console.log(`Server started in port ${port}`);
});

