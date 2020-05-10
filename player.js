var player = class player{
    constructor(hand, fHand, dHand){
        this.hand = hand;
        this.fHand =fHand;
        this.dHand =dHand;
    }

    setId(id){
        this.id = id;
    }
}
exports.player = player;