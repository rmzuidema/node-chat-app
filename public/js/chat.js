var socket = io();

function scrollToBottom() {
    // selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.prop('scrollHeight');
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        //console.log('Should scroll');
        messages.scrollTop(scrollHeight);
    }

}
socket.on('connect', function() {
    console.log('Connected to server');
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(error) {
        if (error) {
            alert('Name and room are required');
            window.location.href='/';
        } else {
            console.log('Welcome');

        }

    });

});

    socket.on('disconnect', function() {
        console.log('Disconnected from server');
    });

    // socket.on('newEmail', function(email) {
    //     console.log('New email on server ', email);
    // });

    socket.on('newMessage', function(message) {
        console.log('Message: ', message);
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
        scrollToBottom();

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
            scrollToBottom();
             // Normal without moustache templates
            // var li = jQuery('<li></li>');
            // var a = jQuery('<a target="_blank">Current Location</a>');
            // li.text(`${message.from}: ${now} `);
            // a.attr("href", message.url);
            // li.append(a);
            //jQuery('#messages').append(li);
        });


        socket.on('UpdateUserList', function(users) {
            console.log('Users list', users);
            var ol = jQuery('<ol></ol>');
            users.forEach( function(name) {
                ol.append(jQuery('<li></li>').text(name));
            });
            jQuery('#users').html(ol);    
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
                //console.log(position);
               
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