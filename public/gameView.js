var instance = axios.create({ baseURL: "http://localhost:3000" })

const socket = new WebSocket('ws://localhost:3000');
var game;
var user;
var userPostion;
var action = {};

// Connection opened



socket.addEventListener('open', function (event) {

});

// Listen for messages
socket.addEventListener('message', function (event) {
    var msg = JSON.parse(event.data)
    console.log(msg)
    if (msg.action === "setUserId") {
        console.log(msg.playerCount)
        userPostion = msg.playerCount
    }
    // console.log('Message from server ', event.data);
    // if(event.action === "setUserId"){
    //     va
    // }
    // console.log(game)
    render()

});

var tileWidth = 30
var tileHeight = 40

var c;

var render = function () {
    instance.get('/game').then(function (response) {
        var m = response.data;
        c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        var angle = 90
        c.width = 510;
        c.height = 510;

        // ctx.translate(c.width/2, c.height/2);
        // ctx.rotate(angle* Math.PI/180)
        // ctx.translate(-c.width/2, -c.height/2);


        var hand = []
        var fHand = []
        var dHand = []


        if (userPostion === 0) {
            hand = m.nHand
            fHand = m.nfHand
            dHand = m.dHand
        } else if (userPostion === 1) {
            hand = m.eHand
            fHand = m.efHand
            dHand = m.eHand

        }


        var b = mahjong3
        var g
        if(g === undefined){
            g = new b(hand, fHand, dHand, m.deck, tileHeight, tileWidth, ctx, c)
        }else{
            g.hand = hand
            g.fHand = fHand
            g.dHand = dHand
        }

        game = g;



    })

}

document.addEventListener("click", function (e) {
    if (action.user !== undefined) {

        var y = e.clientY
        var x = e.clientX
        var tileDelta
        try {
            tileDelta= c.height - tileHeight
            
        } catch (error) {
            
        }
        var index = Math.floor((e.clientX) / tileWidth);

        console.log(y  + " " + tileDelta)
        if (y > tileDelta) {
            console.log("Send Tile")
            socket.send(JSON.stringify({ user: action.user, action: "draw", tile:index }))

        }




    }
})





// var listner = (c)=>{
//     c.addEventListener("click", function (e) {
// var y = e.clientY
// var x = e.clientX
// var tileDelta = c.height - tileHeight
// var index = Math.floor((e.clientX) / tileWidth);

//         // g.deck.pop()
//         // g.drawHand(g.nHand)
// if (y > tileDelta) {
//     console.log(g.hand[index])
// }

//         // g.hand.pop()
//         // ctx.rotate(rotate * Math.PI / 180);
//         // ctx.translate(100,0)
//         g.redraw();

//     });
// }
