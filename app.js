// This code is sponsored by http://coderpro.com
// by http://youtube.com/techlead

$(function () {

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB5hyiRFgp-T2dUJtMIbjo0byDEp0uyoS0",
    authDomain: "mymaze-68cc1.firebaseapp.com",
    databaseURL: "https://mymaze-68cc1.firebaseio.com",
    projectId: "mymaze-68cc1",
    storageBucket: "mymaze-68cc1.appspot.com",
    messagingSenderId: "957669408395",
    appId: "1:957669408395:web:7561a5794154f43a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var DB = firebase.firestore();
  var BOARDREF = DB.collection(DBNAME).doc(GAMENAME).collection('board').doc('board');
  var PLAYERSREF;
  var PLAYERSUNSUBSCRIBE = null;
  var UID = Math.round(Math.random() * 1000000);
  var PLAYERDIVS = {};
  var POS = [0, 0];
  var GRIDSIZE;
  var MAZE = new Maze.Maze();
  var CURRENTSEED;
  var SIZE = 16;
  var BOARD_SIZE = 600;

  function monitorBoard() {
    BOARDREF.onSnapshot(function (doc) {
      if (doc.data() == undefined) {
        startNewGame();
        return;
      }
      clearMaze();
      CURRENTSEED = doc.data().seed;
      monitorPlayers();
      MAZE.generate(CURRENTSEED, SIZE);
      MAZE.draw($("#canvas"));
    });
  }

  function drawPlayers(players) {
    for (var uid in players) {
      if (!uid.match(/^\d+$/)) continue;

      if (uid == UID) {
        updatePlayerLocation(UID, POS, false);
      } else {
        updatePlayerLocation(uid, players[uid], false);
      }
    }
  }

  function updatePlayerLocation(uid, coord, write = true) {
    if (!PLAYERDIVS[uid]) {
      // create player
      var div = $("<div id=player" + uid + " class=player style='background-color:" + getRandomColor(uid) + "'></div>");
      $("#players").append(div);
      PLAYERDIVS[uid] = div;
    }

    var circleSize = 10;
    var nudge = GRIDSIZE * 0.25; // offset the player a bit randomly
    var offsetx = nudge - 2 * srand(uid) * nudge - circleSize / 2 + GRIDSIZE / 2;
    var offsety = nudge - 2 * srand(uid + 1) * nudge - circleSize / 2 + GRIDSIZE / 2;
    var left = coord[0] * GRIDSIZE + offsetx;
    var top = coord[1] * GRIDSIZE + offsety;
    var css = { left: left, top: top, width: circleSize, height: circleSize };
    PLAYERDIVS[uid].css(css);
    if (write && uid == UID) {
      DB.runTransaction(function (transaction) {
        return transaction.get(PLAYERSREF).then(function (doc) {
          // add self to players.
          var players = doc.data();
          if (!players) players = {};
          players[UID] = POS;
          transaction.set(PLAYERSREF, players);
        });
      }).then(function () {
        console.log("Transaction successfully committed!");
      }).catch(function (error) {
        console.log("Transaction failed: ", error);
      });
    }
  }

  function monitorPlayers() {
    if (PLAYERSUNSUBSCRIBE) { PLAYERSUNSUBSCRIBE(); PLAYERSUNSUBSCRIBE = null; }
    PLAYERSREF = DB.collection(DBNAME).doc(GAMENAME).collection('players').doc('players' + CURRENTSEED);
    PLAYERSUNSUBSCRIBE = PLAYERSREF.onSnapshot(function (doc) {
      drawPlayers(doc.data());
    });

    updatePlayerLocation(UID, POS);
  }

  function clearMaze() {
    $("#players").empty();
    var star = $("<div class=player>&#x2605;</div>");
    star.css({left: BOARD_SIZE - GRIDSIZE/2 - 5, top: BOARD_SIZE - GRIDSIZE/2 - 5, border:0});
    $("#players").append(star);
    PLAYERDIVS = {};
    POS = [0, 0];
  }

  function startNewGame() {
    BOARDREF.get().then(function (doc) {
      clearMaze();

      var seed = 0;
      if (doc.data()) {
        seed = doc.data().seed;
      }
      seed++;
      BOARDREF.set({ 'seed': seed });
    });
  }

  window.goRight = function () {
    if (!MAZE.hasWall(POS, Maze.RIGHT)) {
      POS[0]++;
      updateMyPosition();
    }
  }
  window.goDown = function () {
    if (!MAZE.hasWall(POS, Maze.BOTTOM)) {
      POS[1]++;
      updateMyPosition();
    }
  }
  window.goLeft = function () {
    if (!MAZE.hasWall(POS, Maze.LEFT)) {
      POS[0]--;
      updateMyPosition();
    }
  }
  window.goUp = function () {
    if (!MAZE.hasWall(POS, Maze.TOP)) {
      POS[1]--;
      updateMyPosition();
    }
  }

  function updateMyPosition() {
    updatePlayerLocation(UID, POS);
    if (POS[0] == SIZE - 1 && POS[1] == SIZE - 1) {
      setTimeout(function(){
        alert("You won!");
        startNewGame();
      }, 100);
    }
  }

  function srand(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function getRandomColor(seed) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(srand(seed) * 16)];
      ++seed;
    }
    return color;
  }

  // Register key listeners
  $(document).keydown(function (e) {
    switch (e.keyCode) {
      case 37: //left
        goLeft();
        break;
      case 38: //up
        goUp();
        break;
      case 39: //right
        goRight();
        break;
      case 40: //down
        goDown();
        break;
      default:
        return;
    }
    // Disable document scrolling.
    e.preventDefault();
  });

  var canvas = $("#canvas");
  canvas.attr('width', BOARD_SIZE);
  canvas.attr('height', BOARD_SIZE);
  var c = canvas.get(0).getContext("2d");
  GRIDSIZE = canvas.width() / SIZE;
  monitorBoard();
});

