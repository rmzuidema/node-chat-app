var socket = io();

        socket.on('connect', function() {
            console.log('Connected to server');

            socket.emit('createEmail', {
                to: 'someEmail@one.com',
                subject: 'test email',
                text: 'My tests for socket.io',
                createdAt: 12768
            });

        });

        socket.on('disconnect', function() {
            console.log('Disconnected from server');
        });

        socket.on('newEmail', function(email) {
            console.log('New email on server ', email);
        });

        socket.on('newMessage', function(message) {
            console.log('New message on server ', message);
        });
