var socket= io();

socket.on('connect',()=>{
    console.log("Connected to server");
    // socket.emit('createMessage', {
    //     from: 'tara',
    //     text: "Hey dude"
    // }, ()=>{
    //     console.log("Gotcha!");
    // });
});

socket.on('disconnect', ()=>{
    console.log("Connection terminated");
});

socket.on('newMessage', (message)=>{
    console.log("Got a new message!", message);
    var li= jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message)=>{
    var li= jQuery('<li></li>');
    var a= jQuery('<a target="_blank">My current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e)=>{
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'tara',
        text: jQuery('[name=message]').val()
    }, ()=>{
        jQuery('[name=message]').val('');
    });
});

//Geolocation

var locationButton = jQuery('#send-location');
locationButton.on('click', ()=>{
    if(!navigator.geolocation){
        return alert("Please allow location access!");
    }
    locationButton.attr('disabled', 'disabled').text('Sending');
    navigator.geolocation.getCurrentPosition( (position)=>{
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    }, ()=>{
        alert("Unable to fetch location!");
        locationButton.removeAttr('disabled').text('Send Location');
    });
});