const express = require('express')
const mysql = require('mysql')
const game = require('./mahjong-2.js')
const bodyParse = require('body-parser');
var session = require('express-session'); 
var path = require('path');

const app = express()
var expressWs = require('express-ws')(app)

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mahjong'
})


var  engine =  game.mahjong2;
engine = new engine.Mahjong()

var userMap = new Map();
var playerCount = 0;


const port = 3000

app.use(express.static('public'))
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({
    extended: true
}))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    // console.log('middleware');
    req.testing = 'testing';
    return next();
  });

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
      var fake = JSON.parse(msg)
      if(fake.action === 'addUser'){
        if(playerCount < 4){
            console.log("addUser()")
            userMap.set(msg.user, playerCount)
            var data = {}
            data.action = "setUserId"
            data.playerCount = playerCount;
            ws.send(JSON.stringify(data))
        }
        playerCount++;
      }else if(fake.action ==='draw'){
        console.log("draw()")       
         engine.drawTile(userMap.get(fake.user), fake.tile)
        ws.send(JSON.stringify(engine))

      }

    });

  });

app.get('/game', function(req, res){
    res.send(engine)
})

app.post('/addPlayer', function(req, res){
    var name = req.body.name;
    console.log(name)
    noPlayers.push(name);
    res.send(req)

    
})


app.get('/', function (request, response) {
    // console.log(request)
    response.sendFile(path.join(__dirname + '/public/gameView.html'));
})

app.post('/getDeck', function(request, response){
    console.log(request.body);
    var sql = `SELECT deck FROM mahjong.deck where game = ?;`
    sql = mysql.format(sql, request.body.game)
    // console.log(sql)
    con.query(sql, function(error, results, fields){
        response.send(results)
    });
    
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))