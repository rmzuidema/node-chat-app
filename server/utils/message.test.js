const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('Generate a message', ()=> {

    it('Should have the same message', () => {
        var from = 'Bob';
        var text = 'My important message';
        var message = generateMessage(from, text );
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        //expect(typeOf message.createdAt).toBe('number');
        expect(message.createdAt).toBeTruthy();
        

    });

});

describe('Generate a Location message', ()=> {
    
        it('Should generate a correct location message', () => {
            var from = 'Bob';
            var latitude = '100';
            var longitude = '100';
            var resultUrl = 'https://www.google.com/maps?q=100,100';
            var message = generateLocationMessage(from, latitude, longitude );
            expect(message.from).toBe(from);
            expect(message.url).toBe(resultUrl);
          //  expect(typeOf message.createdAt).toBe('number');
            expect(message.createdAt).toBeTruthy();
            
    
        });
    
    });