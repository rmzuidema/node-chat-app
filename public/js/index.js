var socket = io();

        socket.on('connect', function() {
            console.log('Connected to server');

            // socket.emit('createEmail', {
            //     to: 'someEmail@one.com',
            //     subject: 'test email',
            //     text: 'My tests for socket.io',
            //     createdAt: 12768
            // });

        });

        socket.on('disconnect', function() {
            console.log('Disconnected from server');
        });

        // socket.on('newEmail', function(email) {
        //     console.log('New email on server ', email);
        // });

        socket.on('newMessage', function(message) {
            // using moustache templates
            var now = moment(message.createdAt).format('h:mm a');
            var template = jQuery('#message-template').html();
            //console.log('Template ', template);
            var html = Mustache.render(template, {
                text: message.text,
                from: message.from,
                createdAt: now
            });

            jQuery('#messages').append(html);

            // Normal without moustache templates
            // console.log('New message on server ', message);
            // var now = moment(message.createdAt).format('h:mm a');
            // var li = jQuery('<li></li>');
            // li.text(`${message.from}: ${now} ${message.text} `);
            // jQuery('#messages').append(li);
        });

//         socket.on('newLocationMessage', function(message) {
//             console.log('New message on server ', message);
//  //          var url = `${message.from}: <a href=\"${message.url}\">See Map</a>`;
//             jQuery('#location-map').attr("href", message.url);
//         });

        socket.on('newLocationMessage', function(message) {
            //console.log('New message on server ', message);
            var now = moment(message.createdAt).format('h:mm a');
            // using moustache templates
            var template = jQuery('#location-message-template').html();
            //console.log('Template ', template);
            var html = Mustache.render(template, {
                from: message.from,
                url: message.url,
                createdAt: now
            });

            jQuery('#messages').append(html);

             // Normal without moustache templates
            // var li = jQuery('<li></li>');
            // var a = jQuery('<a target="_blank">Current Location</a>');
            // li.text(`${message.from}: ${now} `);
            // a.attr("href", message.url);
            // li.append(a);
            //jQuery('#messages').append(li);
        });



        // socket.emit('createMessage', {
        //     from: 'User',
        //     text: 'My tests for socket.io'
        // }, function(data) {
        //     console.log('Got from server ', data);
        // });

        jQuery('#message-form').on('submit', function (e) {
            e.preventDefault();
            var messageInput = jQuery('[name=message]'); 
            socket.emit('createMessage', {
                from: 'User',
                text: messageInput.val()
            }, function(data) {
                messageInput.val('');
            });
        });

        var locationButton = jQuery('#send-location');
        locationButton.on('click', function() {
            if (!navigator.geolocation) {
                return alert ('Not supported by browser');
            }

            locationButton.text('Sending..').prop("disabled", true);

            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
               
                socket.emit('createGeolocationMessage', {
                   latitude: position.coords.latitude,
                   longitude: position.coords.longitude
                }, function(data) { // this function is called by the server in the callback()
                    locationButton.text('Send Location').prop("disabled", false);
                });
                
            }, function() {
                alert('Must allow geoposition');
            });
        });