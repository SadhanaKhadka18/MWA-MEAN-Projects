const express = require("express");
const router = express.Router();
const gameController = require("../controllers/games.controller");
const publisherController=require("../controllers/publisher.controllers");

router.route("/games")
    .get(gameController.getAll)
    .post(gameController.addOne);

router.route("/games/:gameID")
    .get(gameController.getOne)
    .delete(gameController.deleteOne)
    .put(gameController.fullUpdateOne)
    .patch(gameController.partialUpdateOne);

router.route("/games/:gameId/publisher")
    .get(publisherController.publisherGet)
    .post(publisherController.publisherAdd)
    .delete(publisherController.publisherDelete)
    .put(publisherController.publisherUpdate);
    // .patch(publisherController.partialUpdate);


module.exports = router;