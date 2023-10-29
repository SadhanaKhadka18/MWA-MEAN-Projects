const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games.controller")
const publisherController = require("../controllers/publisher.controllers")
const reviewController = require("../controllers/review.controllers")

router.route("/games")
    .get(gameController.getAll);

router.route("/games/:gameID")
    .get(gameController.getOne);

router.route("/games/:gameId/publisher")
    .get(publisherController.getOne);

router.route("/games/:gameId/reviews")
    .get(reviewController.getAll)

router.route("/games/:gameId/reviews/:reviewId")
    .get(reviewController.getOne)

module.exports = router;