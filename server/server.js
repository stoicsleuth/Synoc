const path = require('path');
const http= require('http');
const express= require('express');
const socketIO= require('socket.io');



const publicPath = path.join(__dirname,'../public');


var app = express();
var server= http.createServer(app);
var io= socketIO(server);

var port = process.env.PORT || 1234;//configuring port for Heroku or local development

app.use(express.static(publicPath));


io.on('connection', (socket)=>{
    console.log('New User!');
    socket.on('disconnect', ()=>{
        console.log("User got disconnected");
    })
});//This basically fires up the content of the callback whenever an user gets connected to the server


server.listen(port, ()=>{
    console.log(`Server is up and runing on ${port}`);
});
