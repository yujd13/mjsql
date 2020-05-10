

var imageMap = function(){
    var map = new Map();
    insertGroupTile("C", map, 10);
    insertGroupTile("B", map, 10);
    insertGroupTile("M", map, 10);
    insertGroupTile("F", map, 5);
    insertGroupTile("G", map, 5);


    setSingleTile("N", map);
    setSingleTile("S", map);
    setSingleTile("E", map);
    setSingleTile("W", map);

    setSingleTile("X", map);
    setSingleTile("Y", map);
    setSingleTile("Z", map);





    function setSingleTile(key, map){
        map.set(key, "/images/" + key + ".jpg")
    }

    function insertGroupTile(key, map, max){
        for(let i =1; i <max; i++){
            var tile = key
            tile += i.toString()
            map.set(tile, "/images/" + tile + ".jpg")
        }
    }

    return map;

};

exports.imageMap =imageMap;