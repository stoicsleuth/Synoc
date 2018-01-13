
var socket= io();



socket.on('getRooms', (rooms)=>{
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

setTimeout(()=>{
    if(document.querySelector('.rooms').options.length==0){
    console.log('lo');
    jQuery('.roomParent').fadeOut('slow',()=>{});
}}, 1000);