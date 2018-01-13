
var socket= io();



socket.on('getRooms', (rooms)=>{
    console.log(rooms);
    rooms.forEach((room)=>{
        console.log(room);
        roomElem = jQuery('.rooms');
        roomElem.append(jQuery('<p></p>').text(room));
    });
});