var mahjong3 = (function () {
    class Mahjong {
        constructor(hand, fHand, dHand, deck, tileHeight, tileWidth, ctx, c) {
            this.hand = hand;
            this.fHand = fHand;
            this.dHand = dHand;
            this.deck = deck;
            this.tileHeight = tileHeight;
            this.tileWidth = tileWidth;
            this.ctx = ctx;
            this.c = c;
            this.imgMap = imageMap();
            this.draw()


        }


        getStartingPositions() {
            let startingPostion = []
            for (let i = 0; i < 4; i++) {
                startingPostion.push(i);
            }
            this.shuffle(startingPostion);
            return startingPostion;
        }


        setTurn() {
            var map = new Map()
            map.set(2, "N")
            map.set(1, "E")
            map.set(0, "S")
            map.set(3, "W")
            return map;
        }

        drawHand(hand,discardHand, index){
            hand.push(hand[index])
            hand.splice(index, 1);
            hand.push(this.deck.pop())
            hand.flowerStage(hand, discardHand);

        }

        displayAllPiles(hand, fHand, dHand, x,y) {
            var tileHeight = this.tileHeight
            this.displayHandHorizontal(hand, x, y - tileHeight, 1500,x)
            if(fHand != undefined){
                this.displayHandHorizontal(fHand, x, y - (tileHeight * 2), 1500, x)
            }
            if(dHand != undefined){
                this.displayHandHorizontal(dHand, x, y - (tileHeight * 3), 1500, x)
            }
            this.ctx.fillText("Player Hand : N", x+10, y - (tileHeight * 4), 1500, x);
        }

        displayHandHorizontal(hand, x, y, wrap, offsetx) {
            var im = this.imgMap;
            for (let i = 0; i < hand.length; i++) {
                var tile = hand[i]
                if (x > wrap) {
                    x = offsetx
                    y += this.tileHeight
                }
                this.displayImage(im.get(tile), x, y, this.tileWidth, this.tileHeight)
                x += this.tileWidth;
            }
        }

        displayImage(filePath, x, y, w, h) {
            var ctx = this.ctx;
            var img = new Image();
            img.src = filePath;
            img.onload = function (e) {
                ctx.drawImage(img, x, y, w, h);
            }
        }

        displayImageRotate(filePath, x, y, w, h, angle) {
            var ctx = this.ctx;
            var img = new Image();
            img.src = filePath;
            var angle = angle
            var w = w;
            var h = h;
            var x = x;
            var y = y;
            var c = this.c

            img.onload = function (e) {
                var tx = x+(w/2)
                var ty = y+(h/2)
                ctx.save();
                ctx.translate(tx, ty);
                ctx.rotate(angle * Math.PI/180)
                ctx.translate(-tx, -ty);
                ctx.drawImage(img, x,y,w, h);
                ctx.restore();

            }
        }

        draw() {
            // ctx.font = "30px Arial";
            // this.displayHandRotated(this.wHand, 20, 150, 1.5708)
            // this.displayHandRotated(this.eHand, 1500-this.tileWidth, 150, -1.5708)
            // this.displayHandRotatedHorizontal(this.sHand, 500, 0, 1.5708*2)
            // console.log(this.hand)
            // ctx.fillText("Player Turn " + this.turnMap.get(this.turn), 500, 880);
            this.displayAllPiles(this.hand, this.fHand, this.dHand, 0,  this.c.height)
            // this.splitBlocks()
            // this.displayBlocks(["BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT"], 90 + this.trans(-45, this.tileWidth/2)+3
            // ,400 + this.trans(-45, this.tileWidth/2) +3                 ,    this.tileWidth/2, this.tileHeight/2,  -45)

            // this.displayBlocks(["BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT","BT"], 90,400                   ,    this.tileWidth/2, this.tileHeight/2,  -45)
            // this.displayImageRotate(this.imgMap.get("C1"), 50,0,this.tileWidth, this.tileHeight,0)

            // this.displayImageRotate(this.imgMap.get("C1"), 50,50,this.tileWidth, this.tileHeight,45)
              this.displayHandHorizontal(this.deck, 0, 200 - this.tileHeight, 510, 0);
            // this.displayHandHorizontal(this.deck, 500, 200 - this.tileHeight, 1000, 500);
        }

        splitBlocks(){
            var copyDeck = this.deck;
            let noblocks = []
            var w = this.tileWidth
            var h = this.tileHeight
            this.displayBlocks(copyDeck, -10,450,w/2,h/2,-15)
            this.displayBlocks(copyDeck, 450,450,w/2,h/2,-110)
            this.displayBlocks(copyDeck, 300,100,w/2,h/2,-200)
            // this.displayBlocks(copyDeck, 0,450,w/2,h/2,-45*4)


        }

        trans(angle, w){
            return Math.cos(angle*Math.PI/180)*w
        }
        displayBlocks(block, x, y, w,h, angle){
            var startingPostion = x;
            var startingY = y;
            var toggle = 1;
            var hypox =w
            var hypoy =h
            // console.log(Math.cos(angle*Math.PI/180)*hypo + " , " + Math.sin(angle*Math.PI/180)*hypo)
                for(let i = 1; i <= 18*2; i++){
                    var tile = block.pop();
                    // console.log(i)
                    // if(i % 2 == 0){
                        startingPostion += Math.cos(angle*Math.PI/180)*hypox;
                        // y = startingY
                    // }
                    y+=Math.sin(angle*Math.PI/180)*hypox;
                    // if(toggle){
                    //     y = y + (this.tileHeight*toggle)
                    //     if(toggle === 1){
                    //         toggle = 1
                    //     }else{
                    //         toggle = -1
                    //     }
                    // }
                    if(tile !== undefined){
                        this.displayImageRotate(this.imgMap.get(tile), startingPostion,y, w, h,  angle);
                    }
                }
            
        }

        
        redraw() {
            var ctx = this.ctx;
            ctx.clearRect(0, 0, this.c.width, this.c.height);
            this.draw()
        }

    }


    return Mahjong;

})();

// module.exports = {mahjong3:mahjong3};