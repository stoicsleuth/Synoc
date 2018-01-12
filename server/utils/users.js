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
var i;
var colors= ['#9b59b6','#34495e','#e74c3c','#f1c40f','#16a085','#039be5','#Sd81b60'];

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
        i=0;
    }
    addUser(id, name, room){
        
        ++i;
        i=i%7;
        var color=colors[i];
        console.log('added',i);
        var user = {id, name, room,color};
        this.users.push(user);
        return user;
    }
    removeUser(id, bool)
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

        // if(bool==false)
        // {
        //     i--;
        // }
        console.log('removed',i);
        return removed;
        
    }
    isUser(name){
        return this.users.filter((user)=>user.name==name).length>0
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