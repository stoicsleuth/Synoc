var expect = require('expect');
var {generateMessage} = require('./message');

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