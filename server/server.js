const express = require('express');
const path = require('path');
const http = require('http');

var socketIO = require('socket.io');
var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');
const {Users}=require('./utils/users');

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
var users = new Users();

io.on('connection', (socket)=> {
    //console.log('New user connected');

    // socket.emit('newEmail', {
    //     from: 'm@one.com',
    //     subject: 'Hello there',
    //     text: 'Where heave you been?',
    //     createAt: 545646
    // });

    // Moving this to be inside the join
    // Greet the user that joined
    // socket.emit('newMessage', generateMessage("Admin","Welcome to the chat"));
    
    // // Sends the message to everyone except the user that created the message   
    // socket.broadcast.emit('newMessage', generateMessage("Admin","New user has joined the chat"));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room required');
        } else {
            socket.join(params.room);
            // remove the user from any other rooms
            users.removeUser(socket.id);
            // Add the user that joined
            users.addUser(socket.id, params.name, params.room);
            // send the list to the client
            io.to(params.room).emit('UpdateUserList', users.getUserList(params.room));

        // Greet the user that joined -- only to the one user
         socket.emit('newMessage', generateMessage("Admin","Welcome to the chat"));
    
        // Sends the message to everyone except the user that created the message   
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin",`${params.name} has joined the chat`));
            callback();
        }


    });
   
    socket.on('createMessage', (message, callback) => {
        //console.log('Received msg ', message);
        callback('Ack');
        var user = users.getUser(socket.id);
        //use io so it emits to all users
        io.to(user.room).emit('newMessage',  generateMessage(user.name, message.text));
    });

    socket.on('createGeolocationMessage', (coords, callback) => {
            //use io so it emits to all users
            // trim the data
            var latitude  = `${coords.latitude}`.trim();
            var longitude = `${coords.longitude}`.trim();
            //console.log(generateLocationMessage('Admin', latitude , longitude));
            var user = users.getUser(socket.id);
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, latitude , longitude));
            // this is used in the client js to re-enable the send button
            callback();
   });    

    socket.on('disconnect', () => {
        // user is leaving the room - must update the list
        var user = users.removeUser(socket.id);
        io.to(user.room).emit('UpdateUserList', users.getUserList(user.room));

        io.to(user.room).emit('newMessage',  generateMessage('Admin', `${user.name} has left the chat`));
    });
});



const port = process.env.PORT || 3000;

// called with server instead of app
server.listen(port, () => {
    console.log(`Server started in port ${port}`);
});

