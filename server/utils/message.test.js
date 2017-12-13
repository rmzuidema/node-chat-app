const expect = require('expect');

var {generateMessage} = require('./message');

describe('Generate a message', ()=> {

    it('Should have the same message', () => {
        var from = 'Bob';
        var text = 'My important message';
        var message = generateMessage(from, text );
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeOf message.createdAt).toBe('number');
        expect(message.createdAt).toBeTruthy();
        

    });

});