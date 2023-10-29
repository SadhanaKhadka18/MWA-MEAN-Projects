const { response } = require("express");
const mongoose = require("mongoose");
const { uptime } = require("process");
const Game = mongoose.model(process.env.GAME_MODEL);
const callbackify = require("util").callbackify;

const gameFindByIdSelectPublisherExecWithCallback = callbackify(function (gameId) {
    return Game.findById(gameId).select("publisher").exec();

})
const gameSave = callbackify(function (game) {
    return game.save();
})


const _addPublisher = function (req, res, game) {
    // console.log(game);
    game.publisher = { name: "", country: "" };
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country;
    gameSave(game, function (err, updatedGame) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedGame.publisher
        }
        res.status(response.status).json(response.message);
    })

}
const _deletePublisher = function (req, res, game) {
    if (game) {
        game.publisher = { "name": "noName" };
        gameSave(game, function (err, updatedGame) {
            const response = {
                status: 204,
                message: []
            }
            if (err) {
                response.status = 500;
                response.message = err;
            } else {
                response.status = 201;
                response.message - uptime.publisher;
            }
            res.status(response.status).json(response.message);
        });

    }
}


const publisherGet = function (req, res) {
    console.log("Get One Publisher Controller");
    const gameId = req.params.gameId;
    gameFindByIdSelectPublisherExecWithCallback(gameId, function (err, game) {
        const response = { status: 200, message: game };
        if (err) {
            response.status = 500;
            response.message = { err };
        } else if (!game.publisher) {
            response.status = 404;
            response.message = { "message": "publisher not found" };
        } else {
            response.status = 201;
            response.message = game.publisher
        }
        res.status(response.status).json(response.message);
    });

}

const publisherAdd = function (req, res) {
    console.log("Game publisher add one request");
    const gameId = req.params.gameId;
    gameFindByIdSelectPublisherExecWithCallback(gameId, function (err, game) {
        const response = { status: 200, message: game };

        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            console.log("error finding game");
            response.status = 404;
            response.message = { "message": "game Id not found" + gameId };
        }
        if (game) {
            _addPublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}
const publisherDelete = function (req, res) {
    console.log("publisher delete one request");
    const gameId = req.params.gameId;
    gameFindByIdSelectPublisherExecWithCallback(gameId, function (err, game) {
        const response = { status: 200, message: game };

        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            console.log("error finding game");
            response.status = 404;
            response.message = { "message": "game Id not found" + gameId };
        }
        if (game) {
            _deletePublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }
    });

}
const publisherUpdate = function (req, res) {

}
module.exports = {
    publisherGet,
    publisherAdd,
    publisherUpdate,
    publisherDelete
}