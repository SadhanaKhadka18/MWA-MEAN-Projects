const { log } = require("console");
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);
const callbackify = require("util").callbackify;

const gameFindByIdSelectReviewsExec = callbackify(function (gameId) {
    return Game.findById(gameId).select("reviews").exec();
})


const getAll = function (req, res) {
    console.log("Get Reviews Controller");
    const gameId = req.params.gameId;
    gameFindByIdSelectReviewsExec(gameId, function (err, game) {
        console.log("Found Reviews", game.reviews, " for game ", game);
        res.status(200).json(game.reviews);
    })
}

const getOne = function (req, res) {
    console.log("Get one reviews Review Controller");
    const gameId = req.params.gameId;
    const reviewId=req.params.reviewId;
    gameFindByIdSelectReviewsExec(gameId, function (err, game) {
        console.log("Found Reviews", game.review.id(reviewId), " for game ", game);
        res.status(200).json(game.review.id(reviewId));
    })
}


module.exports = { getAll,
getOne }