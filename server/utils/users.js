//Storing users

[{
    id: '/slslsls',
    name: 'Andrew',
    room: 'Okay',
}]

//addUser(id, name, room)
//removeuser(id)
//getUser(id)
//getUserLisr(room)

class Users {
    constructor (){
        this.users=[];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id)
    {
        let removed= {};
        this.users= this.users.filter((user)=>{
            if(user.id===id)
            {
                removed=user;
                return false;
            }
            return true;
        });
        return removed;
    }
    getUser(id){
        return this.users.filter((user)=>user.id===id)[0];
    }
    getUserList(room)
    {
        var users= this.users.filter((user)=>{
            return user.room ===room
        });
        var namesArray = users.map((user)=>{
            return user.name
        });
        console.log(namesArray);
        return namesArray;
    }


}

module.exports = {Users}; 