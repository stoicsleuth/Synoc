const path = require('path');
const http= require('http');
const express= require('express');
const socketIO= require('socket.io');
const {generateMessage, generateLocationMessage}=require('./utils/message');
const {isString}=require('./utils/validate');
const {Users}=require('./utils/users');

const publicPath = path.join(__dirname,'../public');


var app = express();
var server= http.createServer(app);
var io= socketIO(server);
var users= new Users; //initializing User class

var port = process.env.PORT || 1234;//configuring port for Heroku or local development

app.use(express.static(publicPath));


io.on('connection', (socket)=>{
    console.log('New User!');

    socket.on('join', (params,callback)=>{
            if(!isString(params.name) || !isString(params.room))
            {
                return callback('Name and room required!');
            }
            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);
            console.log(users);
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));

            socket.emit('newMessage', generateMessage('Admin',`Welcome to ${params.room}`));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));


            
    });






    socket.on('disconnect', ()=>{
        console.log("User got disconnected");
        var user= users.removeUser(socket.id);
        if(user){    
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    })
    //Emit custom events
    
    socket.on('createMessage',  (message, callback)=>{
        var user= users.getUser(socket.id);
        if(user && isString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text, user.color));
        }
        
        callback();
    });
    socket.on('createLocationMessage', (coords)=>{
        var user= users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name}`, coords.latitude, coords.longitude));
        }
        
    });
});//This basically fires up the content of the callback whenever an user gets connected to the server



server.listen(port, ()=>{
    console.log(`Server is up and runing on ${port}`);
});
