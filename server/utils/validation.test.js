const expect = require('expect');

var {isRealString} = require('./validation');

describe('Validate a String', () => {

    it('should validate a string', ()=> {
        var validStr = 'BOB';
        expect(isRealString(validStr)).toBeTruthy();
    });

    it('should not validate a string', ()=> {
        var validStr = '';
        expect(isRealString(validStr)).toBeFalsy();
    });

    it('should not validate a number', ()=> {
        var validStr = 33;
        expect(isRealString(validStr)).toBeFalsy();
    });

    it('should not validate a object', ()=> {
        var validStr = { "name": "home"};
        expect(isRealString(validStr)).toBeFalsy();
    });
 

});