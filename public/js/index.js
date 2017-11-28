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
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

//no longer need to emit messages this way
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: "Hey there"
// }, function (data){
//     console.log('Got it!', data);
// });

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}:   `); //set persons name and colon
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    //fetching the user location:
    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    });
});
