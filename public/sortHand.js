// var testHand = ["C3", "C1", "C2", "B2", "Z", "E", "G2", "G1", "C1", "C7", "C5", "C2", "F1", "F9", "F2", "B1", "M1", "M3", "Y", "S", "N", "B6", "M2", "W", "W", "N", "Y"];


var sortHand = function (hand) {
    let sortedHand = []
    sortByLength(hand)
    let m = sortHand(hand)
    for (const [key, value] of m.entries()) {
        if (key === "C") {
            sortedHand.push(AddBackLetter(key, value.sort()));
        } else if (key === "B") {
            sortedHand.push(AddBackLetter(key, value.sort()));
        } else if (key === "M") {
            sortedHand.push(AddBackLetter(key, value.sort()));
        } else if (key === "F") {
            sortedHand.push(AddBackLetter(key, value.sort()));
        }  else if (key === "G") {
            sortedHand.push(AddBackLetter(key, value.sort()));
        } 
        else {
            sortedHand.push(value.sort())
        }
    }
    function sortHand(hand) {
        var map = new Map();
        hand.forEach((x) => {
            if (x.length > 1) {
                var key = x.substring(0, 1);
                var value = x.substring(1, x.length);
                var list = map.get(key);
                putInMap(key, value, list, map);
            } else {
                var list = map.get("A");
                var value = x;
                putInMap("A", value, list, map);
            }

        })
        return map;
    }
    
function sortByLength (array) {
    array.sort(function(a, b){
       return b.length - a.length;
    });
}

    function AddBackLetter(key, list) {
        for (let i = 0; i < list.length; i++) {
            var t = key
            t += list[i].toString();
            list[i] = t;
        }
        return list;
    }

    function putInMap(key, value, list, map) {
        if (list === undefined) {
            list = []
            list.push(value);
            map.set(key, list);
        } else {
            list.push(value);
            map.set(key, list);
        }
    }
    return sortedHand.flat();
}

// console.log(sortHand(testHand))










