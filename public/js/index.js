/* jshint esversion :6 */
var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail' , {
    //     to: 'jen@example.com',
    //     text: 'Hey, This is Andrew.'
    // });

    // socket.emit('newMessage', {
    //     to: 'marshall@example.com',
    //     text: 'I am so into Robin',
    //     createAt: 123
    // });
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});
//
// socket.on('newEmail', function (email) {
//     console.log('New email', email);
// });

socket.on('newMessage',  function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        //rendering properties:
        text: message.text, //data always changes when we call message
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

//no longer need to emit messages this way
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: "Hey there"
// }, function (data){
//     console.log('Got it!', data);
// });

socket.on('newLocationMessage', function (message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            //rendering properties:
            from: message.from,
            url: message.url,
            createdAt: formattedTime
        });
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    //
    // li.text(`${message.from}${formattedTime}:   `); //set persons name and colon
    // a.attr('href', message.url);
    // li.append(a);
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery ('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');   //clears the message input box
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    //disabling the send location button while sending info:
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    //fetching the user location:
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});
