var socket= io();
var timer, timer2=null;
//Implementing autoscrolling

function scrollToBottom(){
    var messages=jQuery("#messages");
    var newMessage=messages.children('li:last-child');
    //Heights
    var clientHeight= messages.prop('clientHeight');
    var scrollTop= messages.prop('scrollTop');
    var scrollHeight= messages.prop('scrollHeight');
    var newMessageHeight= newMessage.innerHeight();
    var lastMessageHeight= newMessage.prev().innerHeight();

    if(clientHeight+scrollTop+(newMessageHeight*3)>=scrollHeight){
        messages.scrollTop(scrollHeight);
        
    }
    if(clientHeight+scrollTop+200<scrollHeight){
        
        if (document.querySelector('.chatNotify').classList.contains('display__none')) {
            document.querySelector('.chatNotify').classList.toggle('display__none');
            timer=setTimeout(()=>{
                document.querySelector('.chatNotify').classList.toggle('display__none');
                window.clearTimeout(timer);
            }, 4000);
            
        }
        
    }

}


socket.on('connect',()=>{
    //console.log(io.sockets.adapter.rooms);
    var params = jQuery.deparam(window.location.search);
    // socket.emit('createMessage', {
    //     from: 'tara',
    //     text: "Hey dude"
    // }, ()=>{
    //     console.log("Gotcha!");
    // });
    socket.emit('join', params, (err)=>{
        if(err){
            alert(err);
            window.location.href='/';
        }
        else{
            console.log('Nope');
        }
    });
});

socket.on('disconnect', ()=>{
    console.log("Connection terminated");
});

//update user list
socket.on('updateUserList', (users)=>{
    var ol = jQuery('<ol></ol>');
    users.forEach((user)=>{
        ol.append(jQuery('<li></li>').text(user));
        console.log(user);

    });
    jQuery('#users').html(ol);
});




socket.on('newMessage', (message)=>{
    var formattedTime= moment(message.createdAt).format('h:mm a');
    var template= jQuery('#message-template').html();
    var html= Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    jQuery('#messages li:last-child div:last-child').css('background-color',message.color);
    if(message.from=='Admin')
    {
        jQuery('#messages li:last-child ').addClass("admin-style");
    }
    scrollToBottom();
    //var formattedTime= moment(message.createdAt).format('h:mm a');
    // console.log("Got a new message!", message);
    // var li= jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message)=>{
    var formattedTime= moment(message.createdAt).format('h:mm a');
    var template= jQuery('#location-template').html();
    var html= Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
        // var li= jQuery('<li></li>');
        // var a= jQuery('<a target="_blank">&nbspMy current Location</a>');
        // li.text(`${message.from}:  ${formattedTime}`);
        // a.attr('href',message.url);
        // li.append(a);
    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', (e)=>{
    e.preventDefault();
    socket.emit('createMessage', {
        
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

//deparam function
(function($){
    $.deparam = $.deparam || function(uri){
      if(uri === undefined){
        uri = window.location.search;
      }
      var queryString = {};
      uri.replace(
        new RegExp(
          "([^?=&]+)(=([^&#]*))?", "g"),
          function($0, $1, $2, $3) {
              queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
          }
        );
        return queryString;
      };
  })(jQuery);