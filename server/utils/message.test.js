var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate corect message object', ()=>{
        var from= 'Jen';
        var text='I o u';
        var message= generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    }); 
});


describe('generateLocationMessage', ()=>{
    it('Should go to correct URL',()=>{
        var from = 'Tara';
        var longitude = 2;
        var latitude=1;
        var url="https://www.google.com/maps/?1,2";
        var locationMessage=generateLocationMessage(from,latitude, longitude);
        expect(locationMessage.createdAt).toBeA('number');
        expect(locationMessage).toInclude({from, url});

    });
});