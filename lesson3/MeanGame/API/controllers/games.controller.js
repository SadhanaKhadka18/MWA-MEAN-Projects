const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);
const callbackify=require("util").callbackify;

const  gameFindExecWithCallback=callbackify(function(){
    return  Game.find().exec();
})
const  gameFindSkipLimitExecWithCallback=callbackify(function(offset,count){
    return  Game.find().skip(offset).limit(count).exec();
})
const gameFindByIdWithCallback=callbackify(function(gameId){
    return  Game.findById(gameId).exec();
})

const getAll = function (req, res) {
    console.log("here");
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    gameFindSkipLimitExecWithCallback(offset,count,function (err, games) {
        console.log("Found Games",games.length);
        res.status(200).json(games);

    });
}
const getOne=function(req,res){
    const gameID=req.params.gameID;
    gameFindByIdWithCallback(gameID,function(err,game){
        res.status(200).json(game);
    });

}

module.exports = { getAll ,
getOne}