const expect = require('expect');
var {Users} = require('./users');

describe('Create a user', () => {

    var users;

    beforeEach(() => {
        users = new Users();

        users.users=[ 
        {
            id: '1',
            name: 'bob',
            room: 'node'
        },
        {
            id: '2',
            name: 'bob2',
            room: 'node'
        },
        {
            id: '3',
            name: 'bob3',
            room: 'java'
        } ];

    });
    
        it('should add an user', ()=> {
  
            expect(users.addUser('4', 'bobz','myroom')).toInclude({id:'4',name:'bobz', room: 'myroom'});
            expect(users.users.length).toBe(4);
        });

        it ('should return an array', () =>{
            expect(users.getUserList('node').length).toBe(2);
            expect(users.getUserList('java')[0]).toBe('bob3');
        });

        it ('should remove a item', () =>{
           var user = users.removeUser('3');
           expect(users.users.length).toBe(2);
           expect(users.users[0].id).toBe('1');
           expect(user.id).toBe('3');
        });

        it ('should not remove a item', () =>{
            users.removeUser('4');
            expect(users.users.length).toBe(3);
            expect(users.users[0].id).toBe('1');
         });
 
       it ('should return an item', () =>{
            expect(users.getUser('3').id).toBe('3');
        });

        it ('should not return an item', () =>{
            expect(users.getUser('4')).toBe(undefined);
        });


    });
    