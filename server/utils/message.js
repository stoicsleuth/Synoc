//This file stores utility functions regarding messages

var generateMessage= (from,text)=> {
    return{
        from,
        text,
        createdAt: new Date().getTime()
    }
};

module.exports= {generateMessage};