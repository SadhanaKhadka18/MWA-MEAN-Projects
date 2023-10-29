const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

router.route("/")
    .post(userController.addOne);
router.route("/username")
    .post(userController.getOne);

module.exports = router;