const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controller")

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne);

router.route("/games/:gameId")
    .get(gamesController.getOne)
    .delete(gamesController.deleteOne);
   


module.exports = router;