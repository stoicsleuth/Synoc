const path = require('path');
const express= require('express');


const publicPath = path.join(__dirname,'../public');


var app = express();
var port = process.env.PORT || 1234;//configuring port for Heroku or local development

app.use(express.static(publicPath));

app.listen(port, ()=>{
    console.log(`Server is up and runing on ${port}`);
});
