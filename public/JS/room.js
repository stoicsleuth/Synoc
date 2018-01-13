
var socket= io();



socket.on('getRooms', (rooms)=>{
    console.log(rooms);
    rooms.forEach((room)=>{
        console.log(room);
        roomElem = jQuery('.rooms');
        roomElem.append(jQuery('<option></option>').text(room));
    });
});



$(".roomName").on("change keyup paste", function(){
    tmpval = $(this).val();
    if(tmpval !== '') {
        jQuery('.roomParent').fadeOut('slow',()=>{});
    } else{
        jQuery('.roomParent').fadeIn('slow',()=>{});
    }
})