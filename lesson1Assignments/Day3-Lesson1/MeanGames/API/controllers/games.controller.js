const gameData = require("../data/games.json");
gamesGetAll = function (req, res) {
    // console.log(req.query);
    let offset=0;
    let count=5;
    if(req.query&&req.query.offset){
        offset=parseInt(req.query.offset,10);
    }
    if(req.query&&req.query.count){
        count=parseInt(req.query.count,10);
    }
    const pageGames=gameData.slice(offset,offset+count);
    res.status(200).json(pageGames);

}
gamesGetOne = function (req, res) {
    const gameId = req.params.gameId;
    const theGame = gameData[gameId];
    console.log("Get game with gameId", gameId);
    res.status(200).json(theGame); 
}

const addOne=function(req,res){
    console.log("POST new game");
    console.log(req.body);
    res.status(200).json(req.body);
}
module.exports = { gamesGetAll, gamesGetOne ,addOne}