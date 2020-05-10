// const socket = new WebSocket('ws://localhost:3000');
// var user;
// var action = {};
// // Connection opened



// socket.addEventListener('open', function (event) {

// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log(event)
//     console.log('Message from server ', event.data);
    
// });

function submit(){
    action.action = "addUser"
    user = document.getElementById("name")
    action.user = user.value;
    socket.send(JSON.stringify(action));
    user.value = "";
    alert("you have joined")
    render()
}

// document.onclick = function(e){
//     if(action.user !== undefined){
//         socket.send(JSON.stringify({user: action.user, action:"draw"}))

//     }
// }