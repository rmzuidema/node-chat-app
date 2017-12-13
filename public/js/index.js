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
            var li = jQuery('<li></li>');
            li.text(`${message.from}: ${message.text}`);
            jQuery('#messages').append(li);
        });

        socket.emit('createMessage', {
            from: 'someEmail@one.com',
            text: 'My tests for socket.io'
        }, function(data) {
            console.log('Got from server ', data);
        });

        jQuery('#message-form').on('submit', function (e) {
            e.preventDefault();
            socket.emit('createMessage', {
                from: 'someEmail@one.com',
                text: jQuery('[name=message]').val()
            }, function(data) {
                console.log('Got from server ', data);
            });
        });
