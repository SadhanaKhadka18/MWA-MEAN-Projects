const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);
const callbackify = require("util").callbackify;

const gameFindByIdSelectPublisherExecWithCallback = callbackify(function (gameId) {
    return Game.findById(gameId).select("publisher").exec()

}

)


const getOne = function (req, res) {
    console.log("Get One Publisher Controller");
    const gameId = req.params.gameId;
    gameFindByIdSelectPublisherExecWithCallback(gameId, function (err, game) {
        console.log("FounDPublisher", game.publisher, " for Game ", game);
        res.status(200).json(game.publisher);
    });

}
module.exports = { getOne }