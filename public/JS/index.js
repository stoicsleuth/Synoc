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

jQuery('#message-form').on('submit', (e)=>{
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'tara',
        text: jQuery('[name=message]').val()
    }, ()=>{

    });
})