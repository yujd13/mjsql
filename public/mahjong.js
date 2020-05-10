// This code is sponsored by http://coderpro.com
// by http://youtube.com/techlead
var TEST = "POO";

var mahjong = (function () {


    class Mahjong {
        constructor(ctx, canvas, tileWidth, tileHeight) {
            this.ctx = ctx;
            this.nHand = [];
            this.nFHand = [];
            this.nDHand = [];

            this.sHand = [];
            this.sFHand = [];
            this.sDHand = [];


            this.eHand = [];
            this.eFHand = [];
            this.eDHand = [];

            this.wHand = [];
            this.wFHand = [];
            this.wDHand = [];

            this.turnMap = this.setTurn()
            this.turn = 0;
            this.tileWidth = tileWidth
            this.tileHeight = tileHeight


            this.imgMap = imageMap();
            this.deck = this.populate()
            this.giveHand();

            this.flowerStage(this.nHand, this.nFHand);
            this.flowerStage(this.sHand, this.sFHand);
            this.flowerStage(this.eHand, this.eFHand);
            this.flowerStage(this.wHand, this.wFHand);

            this.draw();



        }

        nextTurn() {
            this.turn += 1;
            this.turn = this.turn % 4;

        }



        giveHand() {
            let j = 0;
            for (let i = 0; i < (16 * 4) + 1; i++) {
                var tile = this.deck.pop();
                var d = j % 4;
                if (d === 0) {
                    this.nHand.push(tile)
                } else if (d === 1) {
                    this.eHand.push(tile)
                } else if (d === 2) {
                    this.sHand.push(tile)
                } else if (d === 3) {
                    this.wHand.push(tile)
                }

                j++;
            }
        }

        populate() {
            var im = this.imgMap;
            let keys = Array.from(im.keys())
            let deck = [];
            for (let i = 0; i < 27; i++) {
                var tile = keys[i]
                for (let j = 0; j < 4; j++) {
                    deck.push(tile)
                }
            }
            for (let i = 27; i < 35; i++) {
                var tile = keys[i]
                deck.push(tile)
            }
            for (let i = 35; i < 42; i++) {
                var tile = keys[i]
                for (let j = 0; j < 4; j++) {
                    deck.push(tile)
                }

            }
            console.log(JSON.stringify(deck))
            // var resp = shuffleSeed.shuffle(deck,"Kappa");
            TEST = JSON.stringify(deck);
            return this.shuffle(deck)
            // return resp;
        }
        shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        draw() {
            var ctx = this.ctx;

            this.nHand = sortHand(this.nHand)
            this.eHand = sortHand(this.eHand)
            this.sHand = sortHand(this.sHand)
            this.wnHand = sortHand(this.wHand)

            ctx.font = "30px Arial";
            this.displayHandRotated(this.wHand, 20, 150, 1.5708)
            this.displayHandRotated(this.eHand, 1500-this.tileWidth, 150, -1.5708)
            this.displayHandRotatedHorizontal(this.sHand, 500, 0, 1.5708*2)


            // ctx.fillText("Player Turn " + this.turnMap.get(this.turn), 500, 880);
            this.displayAllPiles(this.nHand, this.nFHand, this.nDHand, 490, 800)
            this.displayHandHorizontal(this.deck, 500, 200 - this.tileHeight, 1000, 500);


        }

        displayHandRotated(hand, x, y, rotate) {
            console.log("display()")
            console.log(console.log(hand))

            var im = this.imgMap;
            for (let i = 0; i < hand.length; i++) {
                var tile = hand[i]
                if (y > 500) {
                }
                this.displayRotatedImage(im.get(tile), x, y, rotate)
                y += this.tileHeight-8;

            }
        }

        displayHandRotatedHorizontal(hand, x, y, rotate) {
            console.log("display()")
            console.log(console.log(hand))

            var im = this.imgMap;
            for (let i = 0; i < hand.length; i++) {
                var tile = hand[i]
                if (x > 1500) {
                    x = 0
                    y += this.tileHeight
                }
                this.displayImage(im.get(tile), x, y, this.tileWidth, this.tileHeight)
                x += this.tileWidth;
            }
        }

        displayRotatedImage(filePath, x, y, rotate) {
            var ctx = this.ctx;
            var img = new Image();
            img.src = filePath;
            var width = this.tileWidth;
            var height =this.tileHeight;
            var r = rotate
            console.log(r)
            img.onload = function (e) {
                ctx.translate(x, y);
                ctx.rotate(r);
                ctx.drawImage(img, -width / 2, -height / 2, width, height);
                ctx.rotate(-r);
                ctx.translate(-x, -y);

            }
        }

        displayAllPiles(hand, fHand, dHand, x,y) {
            var tileHeight = this.tileHeight
            this.displayHandHorizontal(hand, x, y - tileHeight, 1500,x)
            this.displayHandHorizontal(fHand, x, y - (tileHeight * 2), 1500, x)
            this.displayHandHorizontal(dHand, x, y - (tileHeight * 3), 1500, x)
            this.ctx.fillText("Player Hand : N", x+10, y - (tileHeight * 4), 1500, x);
        }



        redraw() {
            var ctx = this.ctx;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.draw()
        }

        flowerStage(hand, fHand) {
            let i = 1;
            while (this.containsFlower(hand)) {
                console.log("Removing Flowers " + i);
                hand = this.removeFlowers(hand, fHand)
                i++;
            }

        }

        containsFlower(hand) {
            if(hand != undefined){
                for (let i = 0; i < hand.length; i++) {
                    var tiles = hand[i]
                    var type = tiles.substring(0, 1);
                    if (type === "F" || type === "G") {
                        return true;
                    }
                }
            }
            return false;

        }

        setTurn() {
            var map = new Map()
            map.set(0, "N")
            map.set(1, "E")
            map.set(2, "S")
            map.set(3, "W")
            return map;
        }

        removeFlowers(hand, fhand) {
            for (let i = 0; i < hand.length; i++) {
                var tiles = hand[i]
                var type = tiles.substring(0, 1);
                if (type === "F" || type === "G") {
                    hand[i] = this.deck.pop();
                    fhand.push(tiles);
                }
            }

            return hand;
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


    }



    return {
        Mahjong: Mahjong,
    }

})();
