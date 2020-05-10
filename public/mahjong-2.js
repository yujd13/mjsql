
var instance = axios.create({ baseURL: "http://localhost:3000" })



var mahjong2 = (function () {
    class Mahjong {
        constructor() {
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
            this.imgMap = imageMap();
            this.deck = this.populate()

            this.giveHand();
            this.flowerStage(this.nHand, this.nFHand);
            this.flowerStage(this.sHand, this.sFHand);
            this.flowerStage(this.eHand, this.eFHand);
            this.flowerStage(this.wHand, this.wFHand);

            this.getStartingPositions()

            this.toDataBase()



        }

        drawTile(){

            this.deck.pop();

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
            
            this.nHand = sortHand(this.nHand)
            this.eHand = sortHand(this.eHand)
            this.sHand = sortHand(this.sHand)
            this.wnHand = sortHand(this.wHand)
            
            let d = [];
            let t = [];
            t.push(this.nHand)
            t.push(this.nFHand)
            
            let t2 = [];
            t2.push(this.eHand)
            t2.push(this.eFHand)

            let t3 = [];
            t3.push(this.sHand)
            t3.push(this.sFHand)


            let t4 = [];
            t4.push(this.wHand)
            t4.push(this.wFHand)

            d.push(t)
            d.push(t2)
            d.push(t3)
            d.push(t4)

            var dec = this.deck;

            instance.get('/gameNo').then(function (response) {
                var gameCount = response.data[0].gameCount + 1
                for (let i = 0; i < d.length; i++) {
                    var a = d[i][0]
                    var b = d[i][1]
                    instance.post('/test',
                        {
                            Hand: JSON.stringify(a),
                            Fhand: JSON.stringify(b),
                            order: i,
                            game: gameCount
                        }).then(function (response) {
                            console.log(response)
                        })
                }
                instance.post('/deck', {
                    game: gameCount,
                    deck: JSON.stringify(dec)
                }).then(function (response) {
                    console.log(response)
                })
            })
            
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
