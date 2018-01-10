//Storing users

[{
    id: '/slslsls',
    name: 'Andrew',
    room: 'Okay',
    color:'#hfhdhd'
}]

//addUser(id, name, room)
//removeuser(id)
//getUser(id)
//getUserLisr(room)

var colors= ['#9b59b6','#34495e','#e74c3c','#f1c40f','#16a085','039be5','d81b60'];
var i=0;
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class Users {
    constructor (){
        this.users=[];
        shuffleArray(colors);
    }
    addUser(id, name, room){
        var color=colors[i++];
        var user = {id, name, room,color};
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