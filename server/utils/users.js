
class Users {
    // create a new Users class that contains an array of users
    constructor () {
        this.users=[];
    }
    addUser(id, name, room) {
        var user = {id: id, name: name, room: room};
        this.users.push(user);
        return user;
    }
    getUserList(room){
        var filteredArray = [];
        filteredArray= this.users.filter((elem) => {
            if ( elem.room === room ){
                return elem;
            }
        });
        return filteredArray.map((each) => {
            return each.name;
        }); 
    }

    removeUser(id) {
        var user = this.users.filter( (item) => item.id === id)[0];
        if (user) {
            this.users =  this.users.filter( (item) =>{
                return item.id !== id;
            });
        }
        return user;
    
     }

    getUser(id) {
        // return this.users.filter( (item) =>{
        //     return item.id === id;
        // })[0];

        // can be simpleidieds as 
        return this.users.filter( (item) => item.id === id)[0];

    }

}

module.exports = {Users};