const config = require('./config.js')
const p = require('./player.js')

const util = require('./sortHand.js')

var mahjong2 = (function () {
    class Mahjong {
        constructor() {
            this.players = [];

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
            this.imgMap = config.imageMap();
            this.deck = this.populate()

            this.giveHand();
            this.flowerStage(this.nHand, this.nFHand);
            this.flowerStage(this.sHand, this.sFHand);
            this.flowerStage(this.eHand, this.eFHand);
            this.flowerStage(this.wHand, this.wFHand);

            this.getStartingPositions()

            this.toDataBase()



        }

        drawTile(playerId, index){
            if(playerId === 0){

                this.nDHand.push(this.nHand[index])
                this.nHand.splice(index, 1);
                this.nHand.push(this.deck.pop())
                this.flowerStage(this.nHand, this.nFHand);


            }

        }


        getStartingPositions() {
            let startingPostion = []
            for (let i = 0; i < 4; i++) {
                startingPostion.push(i);
            }
            this.shuffle(startingPostion);
            return startingPostion;
        }

        toDataBase() {
            
            this.nHand = util.sortHand(this.nHand)
            this.eHand = util.sortHand(this.eHand)
            this.sHand = util.sortHand(this.sHand)
            this.wnHand = util.sortHand(this.wHand)

            var player1 = new p.player(this.nHand, this.nFHand, this.nDHand)
            var player2 = new p.player(this.eHand, this.eFHand, this.eDHand)
            var player3 = new p.player(this.sHand, this.sFHand, this.sDHand)
            var player4 = new p.player(this.wHand, this.wFHand, this.wDHand)

            let d = [];


            d.push(player1)
            d.push(player2)
            d.push(player3)
            d.push(player4)

            this.players = d;
            var dec = this.deck;

            
        }

        

        giveHand() {
                let j = 0;
                for(let i = 0; i< (16 * 4) + 1; i++) {
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
            // var resp = shuffleSeed.shuffle(deck,"Kappa");
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

        flowerStage(hand, fHand) {
            let i = 1;
            while (this.containsFlower(hand)) {
                hand = this.removeFlowers(hand, fHand)
                i++;
            }

        }

        containsFlower(hand) {
            if (hand != undefined) {
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
            map.set(2, "N")
            map.set(1, "E")
            map.set(0, "S")
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

    }



    return {
        Mahjong: Mahjong,
    }

})();

exports.mahjong2 = mahjong2;