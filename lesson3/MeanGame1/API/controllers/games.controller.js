const { log } = require("console");
const { response } = require("express");
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);
const callbackify = require("util").callbackify;

const gameFindExecWithCallback = callbackify(function () {
    return Game.find().exec();
})
const gameFindSkipLimitExecWithCallback = callbackify(function (offset, count) {
    return Game.find().skip(offset).limit(count).exec();
})
const gameFindByIdWithCallback = callbackify(function (gameId) {
    return Game.findById(gameId).exec();
})
const gameCreatewithCallback = callbackify(function (gamename) {
    return Game.create(gamename);
})
const gameFindByIdAndDeleteExecwithCallback = callbackify(function (gameId) {
    return Game.findByIdAndDelete(gameId).exec();
})
const gameFindByIdAndUpdategameIDSetNewGameExecWithCallback = callbackify(function (gameId, newGame) {
    return Game.findByIdAndUpdate(gameId, { $set: newGame },{new:true}).exec();
})
const gameFindByIdAndUpdategameIDNewGameExecWithCallback=callbackify(function (gameId, newGame) {
    return Game.findByIdAndUpdate(gameId, newGame).exec();
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
    gameFindSkipLimitExecWithCallback(offset, count, function (err, games) {
        console.log("Found Games", games.length);
        res.status(200).json(games);

    });
}
const getOne = function (req, res) {
    const gameID = req.params.gameID;
    gameFindByIdWithCallback(gameID, function (err, game) {
        res.status(200).json(game);
    });

}
const addOne = function (req, res) {
    console.log("GAme add one request");
    console.log(req.body);
    const newGame = {
        title: req.body.title, year: req.body.year, rate: req.body.rate, price: req.body.price,
        minPlayers: req.body.minPlayers, maxPlayers: req.body.maxPlayers, minAge: req.body.minAge,
        designers: [req.body.designers]
    };
    gameCreatewithCallback(newGame, function (err, game) {
        const response = { status: 201, message: game };
        if (err) {
            console.log("Error creating game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })

}
const deleteOne = function (req, res) {
    const gameID = req.params.gameID;
    gameFindByIdAndDeleteExecwithCallback(gameID, function (err, deletedgame) {
        console.log(deletedgame);
        const response = { status: 204, message: deletedgame };
        if (err) {
            console.log("error finding the game");
            response.status = 500;
            response.message = err;

        } else if (!deletedgame) {
            console.log("Game id not found");
            response.status = 404;
            response.message = { "message": "game id not found" };
        }else{
            response.status = 200;
            response.message = { "deleted Game": deletedgame};
      
        }
        console.log("resonse after deleted", response);
        res.status(response.status).json(response.message);

    });


}
const partialUpdate = function (req, res) {
    const gameID = req.params.gameID;
    const newGame = req.body;
    gameFindByIdAndUpdategameIDSetNewGameExecWithCallback(gameID, newGame, function (err, game) {
        res.status(200).json(game);
    });

}
const fullUpdate = function (req, res) {
    const gameID = req.params.gameID;
    const newGame = req.body;
    gameFindByIdAndUpdategameIDNewGameExecWithCallback(gameID,newGame, function (err, game) {
        console.log(game);
        res.status(200).json(game);
    });

}
module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    partialUpdate,
    fullUpdate
}