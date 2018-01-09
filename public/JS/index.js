var socket= io();

socket.on('connect',()=>{
    console.log("Connected to server");
    // socket.emit('createMessage', {
    //     from: 'tara'
    // });
});

socket.on('disconnect', ()=>{
    console.log("Connection terminated");
});

socket.on('newMessage', (message)=>{
    console.log("Got a new message!", message);
});