const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controller")
router.route("/games")
    .get(gamesController.gamesGetAll)
    .post(gamesController.addOne);
router.route("/games/:gameId")
    .get(gamesController.gamesGetOne);


module.exports = router;