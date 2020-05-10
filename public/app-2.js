$(function () {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  c.width = 1500;
  c.height = 1000;


  // document.onmousemove = handleMouseMove;
  // function handleMouseMove(event) {
  //     var eventDoc, doc, body;

  //     event = event || window.event; // IE-ism

  //     // If pageX/Y aren't available and clientX/Y are,
  //     // calculate pageX/Y - logic taken from jQuery.
  //     // (This is to support old IE)
  //     if (event.pageX == null && event.clientX != null) {
  //         eventDoc = (event.target && event.target.ownerDocument) || document;
  //         doc = eventDoc.documentElement;
  //         body = eventDoc.body;

  //         event.pageX = event.clientX +
  //           (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
  //           (doc && doc.clientLeft || body && body.clientLeft || 0);
  //         event.pageY = event.clientY +
  //           (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
  //           (doc && doc.clientTop  || body && body.clientTop  || 0 );
  //     }

  //     // Use event.pageX / event.pageY here
  //     // console.log(event.pageX + " " + event.pageY)
  //     // console.log(event.cl)
  // }

  //var tileWidth = 60
  //var tileHeight = 80
  var tileWidth = 30
  var tileHeight = 40

  var mah = new mahjong.Mahjong(ctx, c, tileWidth, tileHeight)
  // c.onclick = function(e){
  //   // console.log(e)
  //   mah.redraw()

  // };

  c.addEventListener("click", function (e) {
    var index = Math.floor((e.x - 500) / tileWidth);

    var turn = mah.turnMap.get(mah.turn)
    console.log(turn)
    // if (turn === "N") {
      mah.nDHand.push(mah.nHand[index])
      mah.nHand.splice(index, 1);
      mah.nHand.push(mah.deck.pop())
      mah.flowerStage(mah.nHand, mah.nFHand);
    // } else if (turn === "W") {
    //   mah.wDHand.push(mah.wHand[index])
    //   mah.wHand.splice(index, 1);
    //   mah.wHand.push(mah.deck.pop())
    // } else if (turn === "E") {
    //   mah.eDHand.push(mah.eHand[index])
    //   mah.eHand.splice(index, 1);
    //   mah.eHand.push(mah.deck.pop())
    // } else if (turn === "S") {
    //   mah.sDHand.push(mah.sHand[index])
    //   mah.sHand.splice(index, 1);
    //   mah.sHand.push(mah.deck.pop())
    // }

    mah.nextTurn()
    mah.redraw()

  });


})

