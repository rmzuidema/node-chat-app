const express = require('express');
const path = require('path');
const http = require('http');

var socketIO = require('socket.io');
var {generateMessage, generateLocationMessage} = require('./utils/message');

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

    // Greet the user that joined
    socket.emit('newMessage', generateMessage("Admin","Welcome to the chat"));
    
    // Sends the message to everyone except the user that created the message   
    socket.broadcast.emit('newMessage', generateMessage("Admin","New user has joined the chat"));
   
    socket.on('createMessage', (message, callback) => {
        console.log('Received msg ', message);
        callback('Ack');
        //use io so it emits to all users
        io.emit('newMessage',  generateMessage(message.from, message.text));
    });

    socket.on('createGeolocationMessage', (coords, callback) => {
            //use io so it emits to all users
            // trim the data
            var latitude  = `${coords.latitude}`.trim();
            var longitude = `${coords.longitude}`.trim();
            console.log(generateLocationMessage('Admin', latitude , longitude));
            
            io.emit('newLocationMessage', generateLocationMessage('Admin', latitude , longitude));
            // this is used in the client js to re-enable the send button
            callback();
   });    

    socket.on('disconnect', () => {
        io.emit('newMessage',  generateMessage('User', '... has left the chat'));
    });
});



const port = process.env.PORT || 3000;

// called with server instead of app
server.listen(port, () => {
    console.log(`Server started in port ${port}`);
});

