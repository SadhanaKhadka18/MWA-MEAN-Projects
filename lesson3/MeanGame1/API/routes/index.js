const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games.controller")

router.route("/games")
    .get(gameController.getAll)
    .post(gameController.addOne);

router.route("/games/:gameID")
    .get(gameController.getOne)
    .delete(gameController.deleteOne)
    .put(gameController.fullUpdate)
    .patch(gameController.partialUpdate);

module.exports = router;